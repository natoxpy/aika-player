<script setup lang="ts">
import BodyTemplate from './templates/body.vue'
import MusicImport from './components/musicImport.vue'
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'
const soundcloudStore = useSoundcloudImport();

</script>
<template>
  <BodyTemplate>
    <template #imports>
      <MusicImport :title="item.title" :cover="item.cover_img" artist="No Artist" :featured_artists="[]" album="No Album"
        :idx="idx" v-for="[idx, item] in soundcloudStore.imports.entries()" />
      <!--
      <MusicImport title="Mortal with you" cover="https://i.scdn.co/image/ab67616d0000b27345a4a2f46281d1394645d680"
        artist="Mili" :featured_artists="[]" album="Mortal With You" />
      <MusicImport title="In Hell We Live, Lament" cover="https://i.ytimg.com/vi/XfTWgMgknpY/maxresdefault.jpg"
        artist="Mili" :featured_artists="['KIHOW']" album="In Hell We Live, Lament" artistMenu />
      <MusicImport title="From a Place of Love" cover="http://[::1]:8000/cdn/74fa2580-2d31-4364-adcc-96575171cffa"
        artist="Mili" :featured_artists="[]" album="Library of Ruina (Original Soundtrack)" />
      <MusicImport title="end of a life" cover="https://i1.sndcdn.com/artworks-vwEk6IxoP0Jhy2w7-sXpBgQ-t500x500.jpg"
        artist="Mori Calliope" :featured_artists="[]" album="Sinderella" />
      <MusicImport title="RTRT" cover="https://i1.sndcdn.com/artworks-000231472033-mngpe4-t500x500.jpg" artist="Mili"
        :featured_artists="[]" album="Miracle Milk" albumMenu />
      -->
    </template>
  </BodyTemplate>
</template>
