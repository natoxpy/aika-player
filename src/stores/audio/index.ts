import { ref, computed, watchEffect, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const audioStore = defineStore('audio', () => {
    const audio = ref<HTMLAudioElement>(new Audio())
    const src = ref<string>('')
    const paused = ref<boolean>(false)
    const currentTime = ref<number>(0)
    const duration = ref<number>(0)
    const volume = ref<number>(1)

    // const a = audio.value.canPlayType("application/vnd.apple.mpegurl");

    setInterval(() => {
        duration.value = audio.value.duration ?? 0
        paused.value = audio.value.paused ?? false
        currentTime.value = audio.value.currentTime ?? 0
        volume.value = audio.value.volume ?? 1
    }, 100)

    // setter methods
    const setCurrentTime = (n: number) => {
        if (!audio.value) return console.log(0, 0)
        audio.value.currentTime = n
    }
    const setSrc = (s: string) => {
        src.value = s
        audio.value.src = s
    }
    const setVolume = (v: number) => {
        volume.value = v
        audio.value.volume = v
    }

    // methods

    const play = () => audio.value.play()
    const pause = () => audio.value.pause()

    return {
        audio,
        // attribute
        src,
        paused,
        currentTime,
        duration,
        volume,

        // setter methods
        setCurrentTime,
        setSrc,
        setVolume,

        // methods
        play,
        pause
    }
})
