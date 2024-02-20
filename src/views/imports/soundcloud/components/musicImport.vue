<script setup lang="ts">
import musicImportTemplate from './templates/musicImport.vue'
import Artist from './artist.vue'
import Album from './album.vue'

import { ref } from 'vue';
import type { Artist as ArtistType } from '@/stores/api/crud/artists';
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'
const soundcloudStore = useSoundcloudImport();

type Props = {
  title: string
  artist: string
  cover: string
  featured_artists: string[]
  album: string
  idx: number
}

const props = defineProps<Props>()

const artists = ref<ArtistType[]>();
soundcloudStore.artists.then(data => artists.value = data[props.idx] as ArtistType[])

</script>
<template>
  <musicImportTemplate :title="title" :no-featured="featured_artists.length == 0" :idx="idx">
    <template #cover>
      <div class="w-full h-full bg-cover bg-center" :style="{
        backgroundImage: `url(${cover})`
      }" />
    </template>
    <template #artists>
      <span v-if="artists?.length == 0" class="italic text-fsecondary">No Artists</span>
      <Artist :name="item.name" v-for="item in artists" />
    </template>
    <template #featured-artists>
      <Artist :name="feat_artist" v-for="feat_artist in featured_artists" />
      <!--
      <Artist name="Lucca DL" />
      <Artist name="SIRI" />
      <Artist name="Zensery" />
      <Artist name="K.KEED" />
      <Artist name="KAZUO" />
      <Artist name="Killa" />
      <Artist name="Bens" />
    -->
    </template>
    <template #album>
      <span v-if="artists?.length == 0" class="italic text-fsecondary">No album</span>
      <!--
      <Album :name="album" />
      -->
    </template>
  </musicImportTemplate>
</template>
