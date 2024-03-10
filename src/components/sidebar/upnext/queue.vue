<script setup lang="ts">
import QueueTemplate from './templates/queue.vue'
import QueueItem from './queueItem.vue'
import { useMusicRegistry } from '@/modules/musicRegistry'
import { usePlayerManager } from '@/modules/player'

const playerManager = usePlayerManager()
const musicRegistry = useMusicRegistry()
const player = playerManager.player

type Props = { open: boolean }
defineProps<Props>()
</script>

<template>
    <QueueTemplate :open="open">
        <template #items>
            <QueueItem
                v-for="music in player.getMusicList()"
                :key="music"
                :music-id="music"
                :cover="musicRegistry.get(music).unwrap().cover"
            >
                <template #title> {{ musicRegistry.get(music).unwrap().title }} </template>
            </QueueItem>
        </template>
    </QueueTemplate>
</template>
