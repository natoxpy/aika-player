<script setup lang="ts">
import PlayingTemplate from './templates/playing.vue'
type Props = { onNextupMenu: () => void; open: boolean }
defineProps<Props>()
</script>
<template>
    <PlayingTemplate
        cover="http://[::1]:8000/cdn/02b5af9f-badd-4cd5-8e9c-5068101d59a6"
        :open="open"
        :on-nextup-menu="onNextupMenu"
    >
        <template #title> From a Place of Love awa </template>
        <template #artists> Mili </template>
    </PlayingTemplate>
</template>
