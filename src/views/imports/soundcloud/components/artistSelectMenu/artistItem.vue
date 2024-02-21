<script setup lang="ts">
import MicIcon from '@/components/icons/shadcn/mic.vue'
import StarIcon from '@/components/icons/shadcn/star.vue'
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'
const soundcloudStore = useSoundcloudImport();

type Props = { name: string; avatar: string; artist_type?: 'artist' | 'featured-artist', music_id: string, id: string }
const props = defineProps<Props>()

function addArtist() {
  if (props.artist_type == 'artist') return addFeaturedArtist()
  let hasArtist = soundcloudStore.hasArtist(props.music_id, props.id)

  console.log(hasArtist)
  if (hasArtist) return soundcloudStore.removeArtist(props.music_id, props.id)

  soundcloudStore.addArtist(props.music_id, props.id)
}

function addFeaturedArtist() {
  if (props.artist_type == 'featured-artist') {
    return
  }

  soundcloudStore.setArtist(props.music_id, props.id, true)
}

</script>
<template>
  <div role="button" class="flex items-center border-b border-baccent pr-2 h-11 hover:bg-bextra cursor-pointer"
    v-on:click="addArtist" v-on:dbclick="addFeaturedArtist">
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
