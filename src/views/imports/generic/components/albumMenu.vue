<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useMappedAlbumList } from '@/stores/imports/albums'
import * as Database from '@/stores/imports/database'
import AlbumItem from './albumItem.vue'

const props = defineProps<{ opened: boolean; close: () => void; id: string }>()
const albumList = useMappedAlbumList()
const albums = ref<Database.Album[]>(Array.from(albumList.search(props.id, '')))
const mappedAlbums = albumList.for(props.id)
const albumSearchQuery = ref('')
const dbAlbumList = Database.useAlbumList()

//
// watch([albumList], () => {
//     console.log('awa1')
//     albums.value = Array.from(albumList.search(props.id, albumSearchQuery.value))
// })
//

watch([albumSearchQuery, dbAlbumList, mappedAlbums, albumList.array], () => {
    albums.value = Array.from(albumList.search(props.id, albumSearchQuery.value))
})

function addAlbum() {
    albumList.add(props.id, albumSearchQuery.value)
    albumSearchQuery.value = ''
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
        const listingDivRelatedElement = document.getElementById(`${props.id}-album-listing`)
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
        id="album-menu-item"
        class="flex flex-col absolute bg-bprimary border border-baccent left-0 top-0 z-50 min-w-60 max-w-96 text-white rounded-primary"
        :class="{ hidden: props.opened != true }"
    >
        <div class="flex gap-1 items-center border-b border-baccent">
            <input
                v-model="albumSearchQuery"
                class="w-full pl-4 py-2 bg-transparent outline-none"
                placeholder="Album name"
            />
            <div class="mr-1">
                <slot name="search-right-icon" />
            </div>
        </div>
        <div class="flex flex-col">
            <div class="flex justify-center items-center" v-if="albums.length == 0">
                <span class="text-fsecondary italic">No albums</span>
            </div>
            <AlbumItem
                :id="album.id"
                :name="album.name"
                :music-id="id"
                :cover="album.cover.image.url"
                :selected="albumList.hasById(id, album.id)"
                v-for="album of albums"
            />

            <div
                :class="{
                    hidden: !(
                        albums.findIndex((item) => item.name === albumSearchQuery) === -1 &&
                        (albumSearchQuery ?? '').trim() !== ''
                    )
                }"
                class="flex justify-center p-2 hover:bg-bextra border-t border-baccent"
                role="button"
                @click="addAlbum"
            >
                <PlusIcon :size="24" />
                <span>Add {{ albumSearchQuery }}</span>
            </div>
        </div>
    </div>
</template>
