<script setup lang="ts">
import { UpnextStore } from '@/stores/upnext.ts'
import QueueItemTemplate from './templates/queueItem.vue'
import { useMusicRegistry } from '@/modules/musicRegistry'
import { usePlayerManager } from '@/modules/player'

const playerManager = usePlayerManager()
const musicRegistry = useMusicRegistry()

type Props = { cover: string; musicId: string }
defineProps<Props>()

const upnextStore = UpnextStore()

function dragstart(event: DragEvent) {
    upnextStore.setHolding(event.currentTarget)
}

function dragover(event: DragEvent) {
    event.preventDefault()
    // upnextStore.setHoldingOver(null)

    // let current: any = event.currentTarget
    // if (!current) return

    // if (upnextStore.holding == upnextStore.holdingOver) {
    //   upnextStore.setHoldingOver(null)
    //   return
    // }
    // upnextStore.setHoldingOver(event.currentTarget)

    // let holding_id = upnextStore.holding.id
    // let current_id = current.id

    // console.log(holding_id, current_id)
}

function drop(e: DragEvent) {
    let current: any = e.currentTarget
    if (!current) return

    // let holding_id = upnextStore.holding.id
    // let current_id = current.id

    // upnextStore.reinsertAt(Number(holding_id), Number(current_id))

    // upnextStore.setHoldingOver(null)
    // upnextStore.setHolding(null)
}
</script>

<template>
    <QueueItemTemplate
        :cover="cover"
        :has_over="false"
        :selected="playerManager.player.getCursor().unwrap() == musicId"
        :music-id="musicId"
        v-on:dragstart="dragstart"
        v-on:dragover="dragover"
        v-on:drop="drop"
        draggable="true"
    >
        <template #title>
            <slot name="title" />
        </template>
    </QueueItemTemplate>
    <!--
    <QueueItemTemplate
        :cover="cover"
        :has_over="(upnextStore.holdingOver ?? { id: null }).id == idx"
        v-on:dragstart="dragstart"
        v-on:dragover="dragover"
        v-on:drop="drop"
        draggable="true"
    >
        <template #title>
            <slot name="title" />
        </template>
    </QueueItemTemplate>
    -->
</template>
