<script setup lang="ts">
import MicIcon from '@/components/icons/shadcn/mic.vue'
import StarIcon from '@/components/icons/shadcn/star.vue'

type Props = { name: string; avatar: string; artist_type?: 'artist' | 'featured-artist' }
defineProps<Props>()
</script>
<template>
  <div
    class="flex items-center border-b border-baccent pr-2 h-11 hover:bg-bextra cursor-pointer"
    v-on:click="() => console.log('set artist')"
    v-on:dbclick="() => console.log('set featured artist')"
  >
    <div class="w-8 h-8 flex justify-center items-center stroke-fsecondary">
      <span v-if="artist_type == 'artist'">
        <MicIcon :size="20" color="defaultColor" />
      </span>
      <span v-if="artist_type == 'featured-artist'">
        <StarIcon :size="32" color="defaultColor" />
      </span>
    </div>
    <div class="mr-2">
      <img class="h-7 aspect-square rounded-full" :src="avatar" />
    </div>
    <span class="text-fprimary">{{ name }}</span>
  </div>
</template>
