<script setup lang="ts">
// INFO:
// This should also Render if player.cursor.some == true
import PlayingTemplate from './templates/playing.vue'
import { useMusicRegistry } from '@/modules/musicRegistry'
import { usePlayerManager } from '@/modules/player'
import { onMounted, ref, watch } from 'vue'

const playerManager = usePlayerManager()
const musicRegistry = useMusicRegistry()
const player = playerManager.player

type Props = { onNextupMenu: () => void; open: boolean }
defineProps<Props>()
const title = ref()
const cover = ref('http://[::1]:8000/cdn/0b892f58-584d-45a0-9a34-818159b32565')

function update() {
    const cursor = player.getCursor()
    if (cursor.none) return console.warn('cursor not found! This should not render')
    const music = musicRegistry.get(cursor.val)

    if (music.none) return console.error('cursor music not found! something went wrong')

    title.value = music.val.title
    cover.value = music.val.cover
}

watch([player], () => {
    update()
})

onMounted(() => update())
</script>
<template>
    <PlayingTemplate :cover="cover" :open="open" :on-nextup-menu="onNextupMenu">
        <template #title> {{ title }} </template>
        <template #artists> Artists </template>
    </PlayingTemplate>
</template>
