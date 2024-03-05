<script setup lang="ts">
import PlayingTemplate from './templates/playing.vue'
type Props = { onNextupMenu: () => void; open: boolean }
defineProps<Props>()
</script>
<template>
    <PlayingTemplate
        cover="http://[::1]:8000/cdn/0b892f58-584d-45a0-9a34-818159b32565"
        :open="open"
        :on-nextup-menu="onNextupMenu"
    >
        <template #title> From a Place of Love awa </template>
        <template #artists> Mili </template>
    </PlayingTemplate>
</template>
