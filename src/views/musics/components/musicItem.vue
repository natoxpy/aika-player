<script setup lang="ts">
import { useAudioProvider } from '@/modules/audio'
import Author from './artist.vue'
import Music from './music.vue'
import { useMusicRegistry } from '@/modules/musicRegistry'
import { usePlayerManager } from '@/modules/player'

const audioProvider = useAudioProvider()
const playerManager = usePlayerManager()
const musicRegistry = useMusicRegistry()
const player = playerManager.player

type Props = {
    musicId: string
    contextId: string
    title: string
    audio: string
    cover: string
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
        <template #author>
            <Author> Mili </Author>
        </template>
    </Music>
</template>
