<script setup lang="ts">
import CheckIcon from '@/components/icons/shadcn/check.vue'

type Props = { name: string; avatar: string; selected?: boolean }
defineProps<Props>()
</script>
<template>
  <div
    class="flex items-center border-b border-baccent pr-3 h-11 hover:bg-bextra cursor-pointer"
    v-on:click="() => console.log('set artist')"
    v-on:dbclick="() => console.log('set featured artist')"
  >
    <div class="min-w-8 h-8 flex justify-center items-center stroke-fsecondary">
      <span v-if="selected == true">
        <CheckIcon :size="20" color="defaultColor" />
      </span>
    </div>
    <div class="mr-2 h-7 w-7">
      <img class="aspect-square rounded-full" :src="avatar" />
    </div>
    <span class="text-fprimary whitespace-nowrap overflow-hidden text-ellipsis">{{ name }}</span>
  </div>
</template>
