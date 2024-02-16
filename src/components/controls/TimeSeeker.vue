<script setup lang="ts">
import Hsl from 'hls.js'
import { ref, onMounted } from 'vue'
import { audioStore } from '@/stores/audio'

let audioManager = audioStore()

let item = ref<HTMLDivElement>()
let prog = ref(0.0)
let mouse_down = ref(false)

function FormatTime(time: number) {
  if (time == 0 || isNaN(time)) return '0:00'
  const minutes = Math.round(time / 60)
  let seconds = Math.round(time % 60)

  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

onMounted(() => {
  let sitem = item.value
  if (!sitem) return

  const update_audio = () => {
    audioManager.setCurrentTime(prog.value * audioManager.duration)
    mouse_down.value = false
  }

  const calculate_time_position = (e: MouseEvent) => {
    let rect = sitem?.getBoundingClientRect()
    let x = e.clientX - (rect?.left ?? 0)
    let ax = x / (rect?.width ?? 0)

    ax = Math.max(Math.min(ax, 1), 0)
    if (!mouse_down.value) return

    prog.value = ax
  }

  // audioManager.audio.addEventListener("error", (r) => console.log(1, r))
  // audioManager.setSrc('http://192.168.1.106:8000/cdn/mortalwithyou.mp3')

  setInterval(() => {
    if (mouse_down.value) return
    prog.value = audioManager.currentTime / audioManager.duration
  }, 100)

  sitem.addEventListener(
    'mousedown',
    (e) => ((mouse_down.value = true), calculate_time_position(e))
  )

  window.addEventListener('mouseup', () => (update_audio(), (mouse_down.value = false)))
  window.addEventListener('mousemove', calculate_time_position)
})
</script>

<template>
  <div class="w-full h-2 flex items-center gap-4 m-2">
    <div class="h-6 text-slate-300">
      <span class="text-sm">{{ FormatTime(audioManager.currentTime ?? 0) }}</span>
    </div>
    <div class="w-full bg-baccent h-1 rounded-md flex relative items-center group">
      <div class="flex relative cursor-pointer items-center w-full h-16" ref="item">
        <div class="h-1 bg-fsecondary rounded-md relative" :style="{ width: `${prog * 100}%` }">
          <div
            class="h-1 w-1 scale-[2.5] opacity-0 group-hover:opacity-100 bg-fsecondary rounded-full absolute -right-[.25rem] transition-all -translate-x-1"
            :style="{
              opacity: !mouse_down ? (null as any) : 1
            }"
          />
        </div>
      </div>
    </div>
    <div class="h-6 text-slate-300">
      <span class="text-sm">{{ FormatTime(audioManager.duration ?? 0) }}</span>
    </div>
  </div>
</template>
