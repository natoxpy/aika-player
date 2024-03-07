<script setup lang="ts">
import { useAudioProvider } from '@/modules/audio'
import Artist from './artist.vue'
import Music from './music.vue'
import { usePlayerManager } from '@/modules/player'
import { useArtistRegistry } from '@/modules/artistRegistry'

const audioProvider = useAudioProvider()
const playerManager = usePlayerManager()
const artistRegistry = useArtistRegistry()
const player = playerManager.player

type Props = {
    musicId: string
    contextId: string
    title: string
    audio: string
    cover: string
    artists: string[]
    featuredArtists: string[]
}

const props = defineProps<Props>()

function play() {
    const cursor = player.getCursor()
    if (cursor.some && cursor.val == props.musicId) {
        audioProvider.play()
    } else {
        playerManager.playFromContext(props.musicId, props.contextId)
    }
}

function pause() {
    audioProvider.pause()
}
</script>

<template>
    <Music
        :cover="cover"
        :audio="audio"
        @play="play"
        @pause="pause"
        :active="player.cursorEq(musicId)"
    >
        <template #title> {{ title }} </template>
        <template #artist-list>
            <span class="text-gray-600 italic" v-if="artists.length == 0">No artists</span>

            <Artist v-for="artist in artists">
                {{ artistRegistry.get(artist).unwrap().name }}
            </Artist>
        </template>

        <template #artist-separator>
            <div v-if="featuredArtists.length != 0" class="w-1 h-1 bg-gray-500 rounded-full" />
        </template>

        <template #artist-featured-list>
            <span class="text-gray-600 italic" v-if="artists.length == 0">No artists</span>

            <Artist v-for="artist in featuredArtists">
                {{ artistRegistry.get(artist).unwrap().name }}
            </Artist>
        </template>
    </Music>
</template>
