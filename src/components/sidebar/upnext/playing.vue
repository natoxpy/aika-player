<script setup lang="ts">
// INFO:
// This should also Render if player.cursor.some == true
import PlayingTemplate from './templates/playing.vue'
import { useMusicRegistry } from '@/modules/musicRegistry'
import { usePlayerManager } from '@/modules/player'
import { onMounted, ref, watch } from 'vue'
import { useArtistRegistry } from '@/modules/artistRegistry'

type Props = { onNextupMenu: () => void; open: boolean }
defineProps<Props>()

const playerManager = usePlayerManager()
const musicRegistry = useMusicRegistry()
const player = playerManager.player
const artistRegistry = useArtistRegistry()

const title = ref()
const artists = ref<Array<string>>([])
const artistFeatured = ref<Array<string>>([])
const cover = ref('http://[::1]:8000/cdn/0b892f58-584d-45a0-9a34-818159b32565')

function update() {
    const cursor = player.getCursor()
    if (cursor.none) return console.warn('cursor not found! This should not render')
    const music = musicRegistry.get(cursor.val)

    if (music.none) return console.error('cursor music not found! something went wrong')

    title.value = music.val.title
    cover.value = music.val.cover
    updateArtists(Array.from(music.val.artists), Array.from(music.val.featuredArtists))
}

function updateArtists(artistList: Array<string>, featuredArtistList: Array<string>) {
    artists.value = []
    artistFeatured.value = []

    for (const artistId of artistList) {
        const artist = artistRegistry.get(artistId)
        artists.value.push(artist.unwrap().name)
    }

    for (const featuredArtistId of featuredArtistList) {
        const artist = artistRegistry.get(featuredArtistId)
        artistFeatured.value.push(artist.unwrap().name)
    }
}

watch([player], () => {
    update()
})

onMounted(() => update())
</script>
<template>
    <PlayingTemplate :cover="cover" :open="open" :on-nextup-menu="onNextupMenu">
        <template #title> {{ title }} </template>
        <template #artists>
            <span class="whitespace-nowrap overflow-hidden text-allipsis" v-for="artist in artists">
                {{ artist }}
            </span>
        </template>
    </PlayingTemplate>
</template>
