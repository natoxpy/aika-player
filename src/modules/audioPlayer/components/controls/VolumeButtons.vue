<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { audioStore } from '@/stores/audio'

let audioManager = audioStore()

let item = ref<HTMLDivElement>()
let prog = ref(1.0)
let mouse_down = ref(false)

onMounted(() => {
    let sitem = item.value
    if (!sitem) return

    prog.value = audioManager.volume

    const update_audio = () => {
        audioManager.setVolume(prog.value)
        mouse_down.value = false
    }

    const calculate_time_position = (e: MouseEvent) => {
        let rect = sitem?.getBoundingClientRect()
        let x = e.clientX - (rect?.left ?? 0)
        let ax = x / (rect?.width ?? 0)

        ax = Math.max(Math.min(ax, 1), 0)
        if (!mouse_down.value) return
        audioManager.setVolume(ax)
        prog.value = ax
    }

    sitem.addEventListener(
        'mousedown',
        (e) => ((mouse_down.value = true), calculate_time_position(e))
    )

    window.addEventListener('mouseup', () => (update_audio(), (mouse_down.value = false)))
    window.addEventListener('mousemove', calculate_time_position)
})
</script>

<template>
    <div class="w-full max-w-72 h-2 flex items-center gap-4 m-2 pr-4">
        <div class="w-full bg-baccent h-1 rounded-md flex relative items-center group">
            <div
                class="flex relative cursor-pointer items-center w-full h-16 select-none"
                ref="item"
            >
                <div
                    class="h-1 bg-fsecondary rounded-md relative"
                    :style="{ width: `${prog * 100}%` }"
                >
                    <div
                        class="h-1 w-1 scale-[2.5] opacity-0 group-hover:opacity-100 bg-fsecondary rounded-full absolute -right-[.25rem] transition-all -translate-x-1"
                        :style="{
                            opacity: !mouse_down ? (null as any) : 1
                        }"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
