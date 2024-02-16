<script setup lang="ts">
import { UpnextStore } from '@/stores/upnext.ts'
import GridVerticalIcon from '../../../icons/shadcn/gridVertical.vue'
import MoreVerticalIcon from '../../../icons/shadcn/moreVertical.vue'
import PlayIcon from '@/components/icons/shadcn/play.vue'

// import PauseIcon from '@/components/icons/shadcn/pause.vue'

const upnextStore = UpnextStore()

type Props = { cover: string; has_over?: boolean }
defineProps<Props>()
</script>
<template>
  <div
    class="w-full flex py-2 pr-2 gap-1 relative rounded-primary hover:bg-bextra group transition-all"
    :class="{
      'min-hl-[132px] h-92 border-l bg-bextra': has_over,
      'min-h-[66px]': !has_over
    }"
    v-bind="$attrs"
  >
    <div
      class="w-[12px] ml-1 flex flex-col justify-center opacity-0 group-hover:opacity-100 items-center"
    >
      <span class="hover:stroke-fprimary stroke-fsecondary cursor-move transition-all">
        <GridVerticalIcon :size="24" color="defaultColor" />
      </span>
    </div>
    <div
      class="min-w-[50px] max-h-[50px] mr-2 bg-cover bg-center rounded-primary"
      :style="{ backgroundImage: `url(${cover})` }"
    >
      <div
        class="h-[50px] w-[50px] flex justify-center items-center group/a hover:bg-[hsl(0,0%,0%,0.3)] transition-all cursor-pointer"
      >
        <button class="group-hover/a:opacity-100 opacity-0 stroke-fprimary">
          <PlayIcon :size="24" :strokeWidth="3" color="defaultColor" />
        </button>
      </div>
    </div>
    <div class="grow">
      <div
        class="w-[165px] group-hover:w-[190px] text-fprimary overflow-hidden text-ellipsis whitespace-nowrap transition-all"
      >
        <slot name="title" />
      </div>
      <div class="text-sm flex gap-1 text-fsecondary">
        <div>Mili</div>
        <span>-</span>
        <div>Album</div>
      </div>
    </div>
    <div class="w-[40px] flex justify-start items-center">
      <span class="hidden group-hover:flex justify-end w-full">
        <span class="hover:stroke-fprimary stroke-fsecondary transition-all cursor-pointer">
          <MoreVerticalIcon :size="24" color="defaultColor" />
        </span>
      </span>
      <span class="text-fprimary group-hover:hidden">1:30</span>
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
