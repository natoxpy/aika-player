<script setup lang="ts">
import BodyTemplate from './templates/body.vue'
import MusicImport from './components/musicImport.vue'
import MusicImportLoading from './components/musicImportLoading.vue'
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'
const soundcloudStore = useSoundcloudImport();

</script>
<template>
  <BodyTemplate>
    <template #imports>
      <div class="border border-bextra flex items-center justify-center w-full h-80"
        v-if="soundcloudStore.musics.size == 0 && soundcloudStore.importing.size == 0">
        <span class="text-fsecondary text-2xl">No musics</span>
      </div>
      <MusicImport :title="item" :cover="soundcloudStore.covers.get(id) as string" artist="No Artist"
        :featured_artists="[]" album="No Album" :id="id" v-for="[id, item] in soundcloudStore.musics.entries()" />
      <MusicImportLoading :id="id" v-for="[id] in soundcloudStore.importing.entries()" />
    </template>
  </BodyTemplate>
</template>
