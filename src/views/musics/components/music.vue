<script setup lang="ts">
import MusicTemplate from './templates/music.vue'
import PlayIcon from '@/components/icons/shadcn/play.vue'
import PauseIcon from '@/components/icons/shadcn/pause.vue'
import MoreHorizontalIcon from '@/components/icons/shadcn/moreHorizontal.vue'
import { ref } from 'vue'

const pause = ref(false)

interface Props {
    cover: string
    audio?: string
}

import { audioStore } from '@/stores/audio/index.ts'
let audioManager = audioStore()

const props = withDefaults(defineProps<Props>(), { cover: 'no image', audio: undefined })

function play() {
    if (props.audio === undefined) console.log('this music does not have an audio file')
    console.log(props.audio)

    audioManager.setSrc(props.audio)
}
</script>
<template>
    <MusicTemplate>
        <template #cover>
            <div
                class="w-full h-full bg-cover bg-center"
                :style="{ backgroundImage: `url('${cover}')` }"
            />
        </template>
        <template #over-cover>
            <div
                class="p-4 flex flex-col justify-between w-full h-full opacity-0 hover:opacity-100 hover:bg-[hsla(0,0%,30%,0.3)] transition-all"
                :class="{ 'opacity-100 bg-[hsla(0,0%,30%,0.3)]': pause }"
            >
                <div class="flex justify-end">
                    <button
                        class="px-1 py-0 rounded-primary bg-[hsl(240,4%,16%,0.6)] hover:bg-[hsl(240,4%,16%,0.8)] transition-all"
                    >
                        <MoreHorizontalIcon :size="32" />
                    </button>
                </div>
                <div>
                    <button
                        class="p-1 rounded-primary bg-[hsl(240,4%,16%,0.6)] hover:bg-[hsl(240,4%,16%,0.8)] transition-all"
                        v-on:click="play"
                    >
                        <PauseIcon v-if="pause" :size="32" />
                        <PlayIcon v-else="pause" :size="32" />
                    </button>
                </div>
            </div>
        </template>
        <template #title>
            <slot name="title" />
        </template>
        <template #author>
            <slot name="author" />
        </template>
    </MusicTemplate>
</template>
