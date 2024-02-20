<script setup lang="ts">
import MicIcon from '@/components/icons/shadcn/mic.vue'
import StarIcon from '@/components/icons/shadcn/star.vue'
import { ref } from 'vue';

type Props = { name: string; artist_type?: 'artist' | 'featured-artist', music_idx: number, idx: string }
defineProps<Props>()

const avatar = ref('https://yt3.googleusercontent.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s176-c-k-c0x00ffffff-no-rj');

function addArtist(e: MouseEvent) {
  console.log(e.type)
}

function addFeaturedArtist(e: MouseEvent) {
  console.log(e.type)
}

</script>
<template>
  <div class="flex items-center border-b border-baccent pr-2 h-11 hover:bg-bextra cursor-pointer" v-on:click="addArtist"
    v-on:dbclick="addFeaturedArtist">
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
