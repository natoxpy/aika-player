<script setup lang="ts">
import { ref } from 'vue'
import DropBodyTemplate from './templates/bodyDropzone.vue'
import { useDragOver } from '@/stores/isDragOver'
import { useMusicList } from '@/stores/imports/musics'

const musicList = useMusicList()
const appDragOver = useDragOver()

const dragOverCounter = ref(0)
const dragIsOver = ref(false)
const receivedInvalid = ref(false)
const invalidTimeout = ref()

function recover() {
    if (invalidTimeout.value == undefined) return

    clearTimeout(invalidTimeout.value)

    invalidTimeout.value = undefined
    receivedInvalid.value = false
    appDragOver.unlock()
    appDragOver.unOver()
}

function showError() {
    receivedInvalid.value = true
    clearTimeout(invalidTimeout.value)

    invalidTimeout.value = setTimeout(() => {
        if (invalidTimeout.value == undefined) return

        receivedInvalid.value = false
        appDragOver.unlock()
        appDragOver.unOver()
        invalidTimeout.value = undefined
    }, 3000)
}

async function drop(e: DragEvent) {
    dragOverCounter.value = 0
    dragIsOver.value = false

    let items = e.dataTransfer?.items
    if (!items) return console.error('no items')

    let arr = Array.from(items)
    const urlMimes = ['text/plain', 'text/x-moz-url-data', 'text/uri-list']
    const allowURL = ['youtube.com', 'soundcloud.com', 'spotify.com']

    arr = arr.filter((item) => urlMimes.includes(item.type))

    let promises = arr.map(
        (item) =>
            new Promise((res) =>
                item.getAsString((e) => {
                    return res(e)
                })
            )
    ) as Array<Promise<string>>

    for (const promise of promises) {
        const msg = await promise
        try {
            const url = new URL(msg)
            let item = allowURL
                .map((item) => (url.host.endsWith(item) ? 1 : (0 as number)))
                .reduce((a, b) => a + b)

            if (item == 0) throw new Error()

            musicList.addFromLink(url)
            appDragOver.unlock()
            appDragOver.unOver()
        } catch {
            showError()
        }

        break
    }
}

function dragover(e: DragEvent) {
    e.preventDefault()
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
}

function dragleave(e: DragEvent) {
    e.preventDefault()

    dragOverCounter.value--
    if (dragOverCounter.value != 0) return

    // appDragOver.unlock()
    // appDragOver.cleanTarget()
    dragIsOver.value = false
}

function dragenter(e: DragEvent) {
    e.preventDefault()

    dragOverCounter.value++

    if (dragOverCounter.value != 1) return

    recover()

    appDragOver.setKinds(appDragOver.kinds)
    appDragOver.setIsOver(true)
    appDragOver.lock()

    dragIsOver.value = true
}
/*
:visible="
            musicList.size == 0 && musicList.loadingTotal == 0
                ? true
                : appDragOver.isOver == true && appDragOver.hasKind('string')
        "
 */
</script>
<template>
    <DropBodyTemplate
        :visible="true"
        :hover-state="
            dragIsOver == true ? 'valid' : receivedInvalid == true ? 'invalid' : undefined
        "
        @drop="(e) => (e.preventDefault(), drop(e))"
        @dragover="dragover"
        @dragenter="dragenter"
        @dragleave="dragleave"
    />
</template>
