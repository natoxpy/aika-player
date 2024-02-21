<script setup lang="ts">
import CheckIcon from '@/components/icons/shadcn/check.vue'
import { useSoundcloudImport, type ArtistsMeta } from '@/stores/imports/soundcloud.ts'
const soundcloudStore = useSoundcloudImport();

type Props = { name: string; cover: string; selected?: boolean, id: string; music_id: string }
const props = defineProps<Props>()

function addAlbum() {
  if (props.selected) return soundcloudStore.removeAlbum(props.music_id, props.id)
  soundcloudStore.addAlbum(props.music_id, props.id)
}
</script>
<template>
  <div class="flex items-center border-b border-baccent pr-3 h-11 hover:bg-bextra cursor-pointer" v-on:click="addAlbum">
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
