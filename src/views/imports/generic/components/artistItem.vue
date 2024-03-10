<script setup lang="ts">
import MicIcon from '@/components/icons/shadcn/mic.vue'
import StarIcon from '@/components/icons/shadcn/star.vue'
import { useMappedArtistList } from '@/stores/imports/artists'

const artistList = useMappedArtistList()

type Props = {
    name: string
    avatar: string
    artistType?: 'artist' | 'featured-artist'
    musicId: string
    id: string
}

const props = defineProps<Props>()

function selectArtist() {
    if (props.artistType !== undefined) return artistList.deselectArtist(props.musicId, props.id)

    artistList.selectArtist(props.musicId, props.id)
}

function toggleArtistType(e: MouseEvent) {
    if (props.artistType === undefined) return
    e.stopPropagation()
    let artist = artistList.getById(props.musicId, props.id)
    if (artist.none) return

    artist.val.featured = !artist.val.featured
}
</script>
<template>
    <div
        role="button"
        class="flex items-center h-11 hover:bg-crust hover:bg-opacity-70 cursor-pointer transition-colors"
        @click="selectArtist"
    >
        <div
            class="flex items-center h-full stroke-overlay1 hover:stroke-lavender transition-all"
            @click="toggleArtistType"
        >
            <div class="w-8 h-8 flex justify-center items-center">
                <span v-if="artistType == 'artist'">
                    <MicIcon :size="20" color="defaultColor" />
                </span>

                <span v-if="artistType == 'featured-artist'">
                    <StarIcon :size="32" color="defaultColor" />
                </span>
            </div>
        </div>
        <div class="flex items-center pr-2 overflow-hidden">
            <div class="mr-2 grow">
                <img class="h-7 min-w-7 rounded-full" :src="avatar" />
            </div>
            <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                <span class="text-text">{{ name }}</span>
            </div>
        </div>
    </div>
</template>
