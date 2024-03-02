<script setup lang="ts">
import { useDragOver } from '@/stores/isDragOver'
import { ref } from 'vue'
const dragOver = useDragOver()

const dragEnterCounter = ref(0)

function dragleave(e: DragEvent) {
    e.preventDefault()
    dragEnterCounter.value--

    if (dragEnterCounter.value != 0) return
    if (!e.dataTransfer) return console.error('awa')

    dragEnterCounter.value = 0
    dragOver.unlock()
    dragOver.unOver()
}

function dragenter(e: DragEvent) {
    e.preventDefault()
    dragEnterCounter.value++

    if (dragEnterCounter.value != 1) return
    if (!e.dataTransfer) return

    dragOver.setIsOver(true)

    const kinds = Array.from(e.dataTransfer.items).map((item) => item.kind)
    const types = Array.from(e.dataTransfer.items).map((item) => item.type)

    dragOver.setTypes(types)
    dragOver.setKinds(kinds)
}

function dragover(e: DragEvent) {
    e.preventDefault()

    if (!e.dataTransfer) return

    dragOver.setIsOver(true)
    const kinds = Array.from(e.dataTransfer.items).map((item) => item.kind)
    dragOver.setKinds(kinds)
}

function drop(e: DragEvent) {
    e.preventDefault()

    dragEnterCounter.value = 0

    // dragOver.unlock()
    // dragOver.unOver()
}
</script>
<template>
    <div @dragleave="dragleave" @dragenter="dragenter" @drop="drop" @dragover="dragover">
        <slot name="app" />
    </div>
</template>
