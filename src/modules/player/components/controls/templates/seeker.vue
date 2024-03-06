<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useAudioProvider } from '@/modules/audio'
import { Err, Result, Ok } from 'ts-results'
const audioProvider = useAudioProvider()

const props = defineProps({
    initialProgress: {
        type: Number,
        default: 0
    }
})

const progress = ref(props.initialProgress)
const isMouseDown = ref(false)
const seekerCold = ref(true)
const progressElement = ref<HTMLDivElement>()
const displayProgress = ref(props.initialProgress)

watch([progress], () => {
    if (!isMouseDown.value) return
    displayProgress.value = progress.value
})

watch([audioProvider], () => {
    if (isMouseDown.value) return
    displayProgress.value = audioProvider.currentTime / audioProvider.duration
})

const emit = defineEmits<{
    (e: 'updated', prog: number): void
    (e: 'live-update', prog: number): void
}>()

function calculateProgress(e: MouseEvent): Result<number, null> {
    if (!progressElement.value) return Err(null)

    let rect = progressElement.value.getBoundingClientRect()
    let x = e.clientX - (rect?.left ?? 0)
    let ax = x / (rect?.width ?? 0)

    return Ok(Math.max(Math.min(ax, 1), 0))
}

function onSeeking(e: MouseEvent) {
    let progressResult = calculateProgress(e)

    if (!isMouseDown.value || progressResult.err) return

    progress.value = progressResult.val

    emit('live-update', progress.value)
}

const mousemove = (e: MouseEvent) => (isMouseDown.value ? onSeeking(e) : null)

function mousedown(e: MouseEvent) {
    isMouseDown.value = true
    seekerCold.value = false

    let progressResult = calculateProgress(e)
    if (!isMouseDown.value || progressResult.err) return

    progress.value = progressResult.val
    emit('live-update', progress.value)
}

function mouseup() {
    if (seekerCold.value) return

    seekerCold.value = true

    isMouseDown.value = false
    emit('updated', progress.value)
}

onMounted(() => {
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', mousemove)
    window.removeEventListener('mouseup', mouseup)
})
</script>
<template>
    <div
        class="w-full bg-baccent h-1 rounded-md flex relative items-center group select-none"
        @mousedown="mousedown"
        ref="progressElement"
    >
        <div class="flex relative cursor-pointer items-center w-full h-16" ref="item">
            <div
                class="h-1 bg-fsecondary rounded-md relative"
                :style="{ width: `${displayProgress * 100}%` }"
            >
                <div
                    class="h-1 w-1 scale-[2.5] opacity-0 group-hover:opacity-100 bg-fsecondary rounded-full absolute -right-[.25rem] transition-all -translate-x-1"
                    :style="{
                        opacity: !isMouseDown ? (null as any) : 1
                    }"
                />
            </div>
        </div>
    </div>
</template>
