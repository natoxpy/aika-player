<script setup lang="ts">
import BodyTemplate from './templates/body.vue'
import MusicImport from './components/musicImport.vue'
import MusicImportLoading from './components/musicImportLoading.vue'
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'
import { getAlbumDefaultCover } from '@/stores/api/crud/albums';
const soundcloudStore = useSoundcloudImport();

</script>
<template>
  <BodyTemplate>
    <template #imports>
      <MusicImport :title="item" :cover="soundcloudStore.covers.get(id) as string" artist="No Artist"
        :featured_artists="[]" album="No Album" :id="id" v-for="[id, item] in soundcloudStore.musics.entries()" />

      <MusicImportLoading :id="id" v-for="[id] in soundcloudStore.importing.entries()" />

    </template>
  </BodyTemplate>
</template>
