<script setup lang="ts">
import ArtistItem from './artistItem.vue'
import { onMounted, ref, watch } from 'vue'
import { useMappedArtistList } from '@/stores/imports/artists'
import * as Database from '@/stores/imports/database/index'
import PlusIcon from '@/components/icons/shadcn/plus.vue'
import type { Artist } from '@/stores/imports/artists'

const props = defineProps<{ opened: boolean; close: () => void; id: string }>()

const artistList = useMappedArtistList()
const mappedArtists = artistList.for(props.id)
const dbArtistList = Database.useArtistList()

const artists = ref<Artist[]>(Array.from(artistList.search(props.id, '')))
const artistSearchQuery = ref('')

function getArtistType(artistId: string) {
    const artist = artistList.getById(props.id, artistId)
    if (artist.some) {
        if (artist.val.featured) return 'featured-artist'
        return 'artist'
    }
    return undefined
}

watch([dbArtistList, mappedArtists, artistSearchQuery, artistList.array], () => {
    artists.value = Array.from(artistList.search(props.id, artistSearchQuery.value))
})

function addArtist() {
    artistList.add(props.id, artistSearchQuery.value)
    artistSearchQuery.value = ''
}

const wrapperElement = ref()

const onClickOutside = (element: HTMLDivElement, callback: any) => {
    document.addEventListener('click', (e) => {
        if (e.target && !element.contains(e.target as Node)) callback(e)
    })
}

onMounted(() => {
    if (!wrapperElement.value) return

    onClickOutside(wrapperElement.value, (e: MouseEvent) => {
        // TODO: I don't understand this solution well enough to name it properly
        // Come back to this, in summary:
        // INFO: If you click inside the element with the given ID it will return TRUE,
        // If you click outside the element with the given ID it will return false,
        // If you click inside this menu, it will return undefined.
        const listingDivRelatedElement = document.getElementById(`${props.id}-artist-listing`)

        let foundRelatedElementForTarget = listingDivRelatedElement?.contains(e.target as Node)
        if (foundRelatedElementForTarget === undefined || foundRelatedElementForTarget === true)
            return

        props.close()
    })
})
</script>
<template>
    <div
        ref="wrapperElement"
        id="idForFocus"
        class="flex flex-col absolute bg-bprimary border border-baccent left-0 top-0 z-50 w-60 text-white rounded-primary"
        :class="{ hidden: opened != true }"
    >
        <div class="flex gap-1 items-center border-b border-baccent">
            <input
                v-model="artistSearchQuery"
                type="text"
                class="w-full pl-4 py-2 bg-transparent outline-none"
                placeholder="Artist name"
            />
            <div class="mr-1">
                <slot name="search-right-icon" />
            </div>
        </div>
        <div class="flex flex-col">
            <div class="flex justify-center items-center" v-if="artists.length == 0">
                <span class="text-fsecondary italic">No artists</span>
            </div>
            <ArtistItem
                :id="artist.id"
                :name="artist.username"
                :music-id="id"
                :avatar="artist.avatar.url"
                :artist-type="getArtistType(artist.id)"
                v-for="artist of artists"
            />

            <div
                @click="addArtist"
                :class="{
                    hidden: !(
                        artists.findIndex((item) => item.username === artistSearchQuery) === -1 &&
                        (artistSearchQuery ?? '').trim() !== ''
                    )
                }"
                class="flex justify-center p-2 hover:bg-bextra"
                role="button"
            >
                <PlusIcon :size="24" />
                <span>Add {{ artistSearchQuery }}</span>
            </div>
        </div>
    </div>
</template>
