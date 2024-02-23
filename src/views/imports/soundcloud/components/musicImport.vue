<script setup lang="ts">
import musicImportTemplate from './templates/musicImport.vue'
import Artist from './artist.vue'
import CoverDropzone from './coverDropzone.vue'

import { ref, watch } from 'vue';
import { useSoundcloudImport, type ArtistsMeta, type AlbumsMeta } from '@/stores/imports/soundcloud.ts'
const soundcloudStore = useSoundcloudImport();

type Props = {
  title: string
  artist: string
  cover: string
  featured_artists: string[]
  uploadState: 'uploading' | 'uploaded' | null,
  album: string
  id: string
}

const props = defineProps<Props>()

const artists = ref<ArtistsMeta[]>([]);
const artistsFeat = ref<ArtistsMeta[]>([]);
const albums = ref<AlbumsMeta[]>([]);

watch([soundcloudStore.artists], () => {
  soundcloudStore.getArtists(props.id).then(data => (artists.value = data[0], artistsFeat.value = data[1]))
})

watch([soundcloudStore.albums], () => {
  soundcloudStore.getAlbums(props.id).then(data => albums.value = data)
})
</script>
<template>
  <musicImportTemplate :title="title" :no-featured="artistsFeat.length == 0" :id="id" :upload-state="uploadState">
    <template #cover>
      <div class="w-full h-full bg-cover bg-center" :style="{
        backgroundImage: `url(${cover})`
      }" />
    </template>
    <template #over-cover>
      <CoverDropzone :id="id" />
    </template>
    <template #artists>
      <span v-if="artists?.length == 0" class="italic text-fsecondary">No Artists</span>
      <Artist :name="item.name" v-for="item in artists" />
    </template>
    <template #featured-artists>
      <Artist :name="feat_artist.name" v-for="feat_artist in artistsFeat" />
    </template>
    <template #album>
      <span v-if="albums?.length == 0" class="italic text-fsecondary">No album</span>
      <Artist :name="album.name" v-for="album in albums" />
      <!--
      <Album :name="album" />
      -->
    </template>
  </musicImportTemplate>
</template>
