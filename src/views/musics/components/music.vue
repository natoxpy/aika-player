<script setup lang="ts">
import MusicTemplate from './templates/music.vue'
import PlayIcon from '@/components/icons/shadcn/play.vue'
import PauseIcon from '@/components/icons/shadcn/pause.vue'
import MoreHorizontalIcon from '@/components/icons/shadcn/moreHorizontal.vue'
import Options from './options.vue'
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
                class="p-4 flex flex-col justify-between w-full h-full opacity-0 hover:opacity-100 bg-opacity-40 bg-base transition-all stroke-text"
                :class="{ 'opacity-100': active }"
            >
                <div class="flex justify-end">
                    <Options />
                </div>
                <div>
                    <button
                        class="p-1 rounded-primary bg-surface0 bg-opacity-70 hover:bg-opacity-80 hover:bg-surface1 transition-all hover:stroke-lavender"
                        v-on:click="(_) => $emit('pause')"
                        v-if="playing"
                    >
                        <PauseIcon :size="32" color="defaultColor" />
                    </button>
                    <button
                        class="p-1 rounded-primary bg-surface0 bg-opacity-70 hover:bg-opacity-80 hover:bg-surface1 transition-all hover:stroke-lavender"
                        v-on:click="(_) => $emit('play')"
                        v-else
                    >
                        <PlayIcon :size="32" color="defaultColor" />
                    </button>
                </div>
            </div>
        </template>
        <template #title>
            <span class="text-text">
                <slot name="title" />
            </span>
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
