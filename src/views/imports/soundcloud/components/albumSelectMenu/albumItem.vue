<script setup lang="ts">
import CheckIcon from '@/components/icons/shadcn/check.vue'

type Props = { name: string; cover: string; selected?: boolean }
defineProps<Props>()
</script>
<template>
  <div class="flex items-center border-b border-baccent pr-3 h-11 hover:bg-bextra cursor-pointer"
    v-on:click="() => console.log('set album')">
    <div class="min-w-8 h-8 flex justify-center items-center stroke-fsecondary">
      <span v-if="selected == true">
        <CheckIcon :size="20" color="defaultColor" />
      </span>
    </div>
    <div class="mr-2 h-7 w-7">
      <img class="aspect-square rounded-full" :src="cover" />
    </div>
    <span class="text-fprimary whitespace-nowrap overflow-hidden text-ellipsis">{{ name }}</span>
  </div>
</template>
