<script setup lang="ts">
import PlayingTemplate from './templates/playing.vue'
type Props = { onNextupMenu: () => void; open: boolean }
defineProps<Props>()
</script>
<template>
  <PlayingTemplate
    cover="http://[::1]:8000/cdn/74fa2580-2d31-4364-adcc-96575171cffa"
    :open="open"
    :on-nextup-menu="onNextupMenu"
  >
    <template #title> From a Place of Love awa </template>
    <template #artists> Mili </template>
  </PlayingTemplate>
</template>
