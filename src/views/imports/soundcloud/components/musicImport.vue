<script setup lang="ts">
import musicImportTemplate from './templates/musicImport.vue'
import Artist from './artist.vue'
import Album from './album.vue'

type Props = {
  title: string
  artist: string
  cover: string
  featured_artists: string[]
  album: string
}

defineProps<Props>()
</script>
<template>
  <musicImportTemplate :title="title" :no-featured="featured_artists.length == 0">
    <template #cover>
      <div
        class="w-full h-full bg-cover bg-center"
        :style="{
          backgroundImage: `url(${cover})`
        }"
      />
    </template>
    <template #artists>
      <Artist :name="artist" />
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
      <Album :name="album" />
    </template>
  </musicImportTemplate>
</template>
