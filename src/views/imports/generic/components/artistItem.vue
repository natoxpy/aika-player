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

// function addArtist() {
//     if (props.artist_type == 'artist') return addFeaturedArtist()
//     let hasArtist = soundcloudStore.hasArtist(props.music_id, props.id)
//
//     if (hasArtist) return soundcloudStore.removeArtist(props.music_id, props.id)
//
//     // soundcloudStore.addArtist(props.music_id, props.id, undefined, props.newly === false)
// }
//
// function addFeaturedArtist() {
//     if (props.artist_type == 'featured-artist') {
//         return
//     }
//
//     soundcloudStore.setArtist(props.music_id, props.id, true)
// }
</script>
<template>
    <div
        role="button"
        class="flex items-center border-b border-baccent h-11 hover:bg-bextra cursor-pointer transition-colors"
        @click="selectArtist"
    >
        <div
            class="flex items-center h-full stroke-fsecondary hover:stroke-gray-200 transition-all"
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
        <div class="flex items-center pr-2">
            <div class="mr-2">
                <img class="h-7 aspect-square rounded-full" :src="avatar" />
            </div>
            <span class="text-fprimary">{{ name }}</span>
        </div>
    </div>
</template>
