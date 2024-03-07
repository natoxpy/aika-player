<script setup lang="ts">
import MusicTemplate from './templates/music.vue'
import PlayIcon from '@/components/icons/shadcn/play.vue'
import PauseIcon from '@/components/icons/shadcn/pause.vue'
import MoreHorizontalIcon from '@/components/icons/shadcn/moreHorizontal.vue'
import { useMusicRegistry } from '@/modules/musicRegistry'
import { usePlayerManager } from '@/modules/player'
import { useAudioProvider } from '@/modules/audio'
import { ref, watch } from 'vue'
import { audioStore } from '@/stores/audio/index.ts'

const playerManager = usePlayerManager()
const audioProvider = useAudioProvider()
const musicRegistry = useMusicRegistry()
const player = playerManager.player

type Props = {
    cover: string
    audio?: string
    active: boolean
}

const props = withDefaults(defineProps<Props>(), {
    cover: 'no image',
    audio: undefined
})

const active = ref(props.active && !audioProvider.paused ? true : props.active)
const playing = ref(props.active && !audioProvider.paused ? true : false)

watch([audioProvider], () => {
    active.value = props.active && !audioProvider.paused ? true : props.active
    playing.value = props.active && !audioProvider.paused ? true : false
})

defineEmits<{
    (e: 'play'): void
    (e: 'pause'): void
}>()
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
                :class="{ 'opacity-100 bg-[hsla(0,0%,30%,0.3)]': active }"
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
                        v-on:click="(_) => $emit('pause')"
                        v-if="playing"
                    >
                        <PauseIcon :size="32" />
                    </button>
                    <button
                        class="p-1 rounded-primary bg-[hsl(240,4%,16%,0.6)] hover:bg-[hsl(240,4%,16%,0.8)] transition-all"
                        v-on:click="(_) => $emit('play')"
                        v-else
                    >
                        <PlayIcon :size="32" />
                    </button>
                </div>
            </div>
        </template>
        <template #title>
            <slot name="title" />
        </template>

        <template #artist-list>
            <slot name="artist-list" />
        </template>

        <template #artist-separator>
            <slot name="artist-separator" />
        </template>

        <template #artist-featured-list>
            <slot name="artist-featured-list" />
        </template>
    </MusicTemplate>
</template>
