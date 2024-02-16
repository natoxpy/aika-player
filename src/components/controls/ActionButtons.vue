<script setup lang="ts">
import PlayButton from '../icons/PlayBtn.vue'
import PauseButton from '../icons/PauseBtn.vue'
import PreviousButton from '../icons/PreviousBtn.vue'
import NextButton from '../icons/NextBtn.vue'
import RepeatIcon from '../icons/RepeatIcon.vue'
import RepeatAllIcon from '../icons/RepeatAllIcon.vue'
import RepeatOneIcon from '../icons/RepeatOneIcon.vue'
import { onMounted } from 'vue'
import { audioStore } from '../../stores/audio'

let audioManager = audioStore()

function Play() {
  audioManager.play()
}

function Pause() {
  audioManager.pause()
}
</script>
<template>
  <div class="w-full ml-4 max-w-44 h-full flex items-center justify-center gap-1">
    <button class="p-2">
      <PreviousButton :size="20" />
    </button>
    <button @click="audioManager.paused ? Play() : Pause()" class="p-2">
      <PauseButton v-if="!audioManager.paused" :size="20" />
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
