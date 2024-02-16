<script setup lang="ts">
import ListVideoIcon from '../../../icons/shadcn/listVideo.vue'
import ListXIcon from '../../../icons/shadcn/listX.vue'

interface Props {
  cover: string
  onNextupMenu: () => void
  open: boolean
}

defineProps<Props>()
</script>
<template>
  <div
    class="flex bg-bprimary border-t-baccent border-t gap-3 justify-center px-3 py-2 w-full h-[65px] sticky bottom-0"
  >
    <div class="rounded-primary flex justify-end items-center h-[50px] w-full max-w-[53px] overflow-hidden">
      <img width="50px" :src="cover" />
    </div>
    <div class="w-full h-full flex flex-col justify-center">
      <div class="text-white text-base">
        <slot name="title" />
      </div>
      <div class="text-fsecondary text-sm">
        <slot name="artists" />
      </div>
    </div>
    <div class="text-white flex justify-center items-center">
      <!-- <ListVideoIcon /> -->
      <button
        class="stroke-fsecondary hover:stroke-fprimary transition cursor-pointer"
        :class="{}"
        v-on:click="onNextupMenu()"
      >
        <ListXIcon :size="24" color="defaultColor" v-if="open" />
        <ListVideoIcon :size="24" color="defaultColor" v-else />
      </button>
    </div>
  </div>
</template>
