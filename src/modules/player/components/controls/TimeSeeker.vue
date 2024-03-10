<script setup lang="ts">
import { FormatTime } from './timeUtils.ts'
import { useAudioProvider } from '@/modules/audio'
import SeekerComponent from './templates/seeker.vue'
import { watch } from 'vue'

let audioProvider = useAudioProvider()

function seeked(progress: number) {
    audioProvider.setCurrentTime(progress * audioProvider.duration)
}
</script>
<template>
    <div class="w-full h-2 flex items-center gap-4 m-2">
        <div class="h-6 text-subtext0">
            <span class="text-sm">{{ FormatTime(audioProvider.currentTime ?? 0) }}</span>
        </div>
        <SeekerComponent
            :initial-progress="audioProvider.currentTime / audioProvider.duration"
            @updated="seeked"
        />
        <div class="h-6 text-subtext0">
            <span class="text-sm">{{ FormatTime(audioProvider.duration ?? 0) }}</span>
        </div>
    </div>
</template>
