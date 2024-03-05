<script setup lang="ts">
import PlayButton from '@/components/icons/PlayBtn.vue'
import PauseButton from '@/components/icons/PauseBtn.vue'
import PreviousButton from '@/components/icons/PreviousBtn.vue'
import NextButton from '@/components/icons/NextBtn.vue'
import RepeatIcon from '@/components/icons/RepeatIcon.vue'
import RepeatAllIcon from '@/components/icons/RepeatAllIcon.vue'
import RepeatOneIcon from '@/components/icons/RepeatOneIcon.vue'
import { onMounted } from 'vue'
// import { audioStore } from '../../stores/audio'

// let audioManager = audioStore()

function Play() {
    // audioManager.play()
}

function Pause() {
    // audioManager.pause()
}
</script>
<template>
    <div class="w-full ml-4 max-w-44 h-full flex items-center justify-center gap-1">
        <button class="p-2">
            <PreviousButton :size="20" />
        </button>
        <button @click="// audioManager.paused ? Play() : Pause()" class="p-2">
            <PauseButton v-if="// !audioManager.paused" :size="20" />
            <PlayButton v-else :size="20" />
        </button>
        <button class="p-2">
            <NextButton :size="20" />
        </button>
        <button class="p-2">
            <RepeatIcon :size="22" />
        </button>
    </div>
</template>
