<script setup lang="ts">
import { ref } from 'vue'
import CoverDropzoneTemplate from '../templates/components/coverDropzone.vue'
import { useDragOver } from '@/stores/isDragOver'
import { useMusicList } from '@/stores/imports/musics'
import { useImageMap } from '@/stores/imports/images'
import { ImageSource } from '@/stores/imports'

const musicList = useMusicList()
const appDragOver = useDragOver()
const imageMap = useImageMap()

const props = defineProps<{ musicId: string }>()
const dragOverCounter = ref(0)
const state = ref<'invalid-cooldown' | 'draggingover' | undefined>()

/// if its undefined, than no cooldown is active
const invalidCooldownTimeout = ref()

function recover() {
    if (invalidCooldownTimeout.value === undefined) return

    state.value = undefined
    clearTimeout(invalidCooldownTimeout.value)
}

function showError() {
    clearTimeout(invalidCooldownTimeout.value)

    state.value = 'invalid-cooldown'

    invalidCooldownTimeout.value = setTimeout(() => {
        invalidCooldownTimeout.value = undefined
        state.value = undefined
    }, 4000)
}

function drop(e: DragEvent) {
    e.preventDefault()

    appDragOver.unlock()
    appDragOver.unOver()

    dragOverCounter.value = 0
    state.value = undefined

    const items = e.dataTransfer
    if (!items) return

    // Array.from(items.items).map((item) => console.log(1, item.type, item.kind))
    // Array.from(items.items).map((item) => {
    //     let type = item.type
    //     item.getAsString((str) => console.log(type, '\n', str))

    //     if (item.type.endsWith('html')) {
    //         item.getAsString((str) => console.dir(str))
    //     }
    // })

    let data = items.getData('application/x-moz-file-promise-url')
    const files = Array.from(items.files).filter((file) => file.type.startsWith('image'))
    const file = files[0]
    if (data == undefined && file == undefined) return showError()

    try {
        let music = musicList.get(props.musicId)
        if (music.none) return console.log('none music')

        if (file == undefined) {
            let url = new URL(data)

            imageMap.set(props.musicId, ImageSource.fromUrl(url))
        } else if (file != undefined) {
            file.arrayBuffer().then((arrayBuffer) => {
                imageMap.set(props.musicId, ImageSource.fromBuffer(arrayBuffer))
            })
        } else showError()
    } catch (e) {
        showError()
    }
}

function dragenter(e: DragEvent) {
    e.preventDefault()
    dragOverCounter.value++
    if (dragOverCounter.value != 1) return

    recover()

    state.value = 'draggingover'
}

function dragleave(e: DragEvent) {
    e.preventDefault()
    dragOverCounter.value--
    if (dragOverCounter.value != 0) return

    state.value = undefined
}
</script>
<template>
    <CoverDropzoneTemplate
        :state="state"
        @dragenter="dragenter"
        @dragleave="dragleave"
        @dragover="(e) => e.preventDefault()"
        @drop="drop"
    />
</template>
