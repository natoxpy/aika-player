<script setup lang="ts">
import GridVerticalIcon from '../../../icons/shadcn/gridVertical.vue'
import MoreVerticalIcon from '../../../icons/shadcn/moreVertical.vue'
import PlayIcon from '@/components/icons/shadcn/play.vue'
import PauseIcon from '@/components/icons/shadcn/pause.vue'
import { useAudioProvider } from '@/modules/audio'
import { usePlayerManager } from '@/modules/player'
import { ref, watch } from 'vue'

const audioProvider = useAudioProvider()
const playerManager = usePlayerManager()
const player = playerManager.player

type Props = { musicId: string; cover: string; has_over?: boolean; selected: boolean }
const props = defineProps<Props>()

const active = ref(props.selected && !audioProvider.paused ? true : props.selected)
const playing = ref(props.selected && !audioProvider.paused ? true : false)

watch([audioProvider], () => {
    active.value = props.selected && !audioProvider.paused ? true : props.selected
    playing.value = props.selected && !audioProvider.paused ? true : false
})

function playCurrent() {
    playerManager.playInContext(props.musicId)
}

function play() {
    const cursor = player.getCursor()

    if (cursor.none) return
    if (cursor.val != props.musicId) return playCurrent()

    audioProvider.play()
}

function pause() {
    const cursor = player.getCursor()
    if (cursor.none) return
    if (cursor.val != props.musicId) return

    audioProvider.pause()
}
</script>
<template>
    <div
        class="w-full flex py-2 pr-2 gap-1 relative rounded-primary hover:bg-base group transition-all group/a"
        :class="{
            'min-hl-[132px] h-92 border-l bg-base': has_over,
            'min-h-[66px]': !has_over
        }"
        v-bind="$attrs"
    >
        <div
            class="w-[12px] ml-1 flex flex-col justify-center opacity-0 group-hover:opacity-100 items-center"
        >
            <span class="cursor-move transition-all stroke-overlay1 hover:stroke-lavender">
                <GridVerticalIcon :size="24" color="defaultColor" />
            </span>
        </div>
        <div
            class="min-w-[50px] max-h-[50px] mr-2 bg-cover bg-center rounded-primary"
            :style="{ backgroundImage: `url(${cover})` }"
        >
            <div
                class="h-[50px] w-[50px] flex justify-center items-center transition-all cursor-pointer opacity-0 group-hover/a:bg-[hsl(0,0%,0%,0.3)] group-hover/a:opacity-100 stroke-overlay1 hover:stroke-lavender"
                :class="{
                    'opacity-100 bg-[hsl(0,0%,0%,0.3)]': active
                }"
            >
                <button
                    class="w-full h-full flex items-center justify-center"
                    v-if="playing"
                    @click="pause"
                >
                    <PauseIcon :size="24" :strokeWidth="3" color="defaultColor" />
                </button>

                <button class="w-full h-full flex items-center justify-center" v-else @click="play">
                    <PlayIcon :size="24" :strokeWidth="3" color="defaultColor" />
                </button>
            </div>
        </div>
        <div class="grow">
            <div
                class="w-[165px] group-hover:w-[190px] text-text overflow-hidden text-ellipsis whitespace-nowrap transition-all"
            >
                <slot name="title" />
            </div>
            <div class="text-sm flex gap-1 text-overlay0">
                <div>Mili</div>
                <span>-</span>
                <div>Album</div>
            </div>
        </div>
        <div class="w-[40px] flex justify-start items-center">
            <span class="hidden group-hover:flex justify-end w-full">
                <span class="hover:stroke-lavender stroke-overlay1 transition-all cursor-pointer">
                    <MoreVerticalIcon :size="24" color="defaultColor" />
                </span>
            </span>
            <span class="text-text group-hover:hidden">1:30</span>
        </div>
    </div>

    <!--
  <div
    class="text-white flex items-end h-0 opacity-40 overflow-hidden absolute bottom-0"
    :class="{ 'h-[0px]': has_over }"
  >
    <div
      class="w-full h-[66px] flex py-2 pr-2 gap-1 relative rounded-primary hover:bg-bextra group"
    >
      <div
        class="flex h-[66px]"
        v-html="(upnextStore.holding ?? { innerHTML: '' }).innerHTML"
      ></div>
    </div>
  </div>
  -->
</template>
