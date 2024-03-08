<script setup lang="ts">
import PlayButton from '@/components/icons/PlayBtn.vue'
import PauseButton from '@/components/icons/PauseBtn.vue'
import PreviousButton from '@/components/icons/PreviousBtn.vue'
import NextButton from '@/components/icons/NextBtn.vue'
import RepeatIcon from '@/components/icons/RepeatIcon.vue'
import RepeatAllIcon from '@/components/icons/RepeatAllIcon.vue'
import RepeatOneIcon from '@/components/icons/RepeatOneIcon.vue'
import { useAudioProvider } from '@/modules/audio'
import { usePlayerManager } from '@/modules/player'

const audioProvider = useAudioProvider()
const playerManager = usePlayerManager()
const player = playerManager.player

function pause() {
    audioProvider.pause()
}

function play() {
    audioProvider.play()
}

function repeatToggle() {
    player.nextRepeatMode()
}
</script>
<template>
    <div class="w-full ml-4 max-w-44 h-full flex items-center justify-center gap-1">
        <button class="p-2">
            <PreviousButton :size="20" />
        </button>
        <button class="p-2" v-if="audioProvider.paused" @click="play">
            <PlayButton :size="20" />
        </button>
        <button class="p-2" v-else @click="pause">
            <PauseButton :size="20" />
        </button>

        <button class="p-2">
            <NextButton :size="20" />
        </button>
        <button @click="repeatToggle" class="p-2 stroke-0 fill-fprimary stroke-fprimary">
            <span v-if="player.getRepeatMode() === 'not-repeat'">
                <RepeatIcon color="defaultColor" :size="22" />
            </span>
            <span v-if="player.getRepeatMode() === 'repeat-single'">
                <RepeatOneIcon color="defaultColor" :size="22" :stroke-width="0" />
            </span>
            <span v-if="player.getRepeatMode() === 'repeat-context'">
                <RepeatAllIcon color="defaultColor" :size="22" />
            </span>
        </button>
    </div>
</template>
