<script setup lang="ts">
import BodyTemplate from './templates/body.vue'
import musicImport from './components/musicImport.vue'
</script>
<template>
  <BodyTemplate>
    <template #imports>
      <musicImport
        title="Mortal with you"
        cover="https://i.scdn.co/image/ab67616d0000b27345a4a2f46281d1394645d680"
        artist="Mili"
        :featured_artists="[]"
        album="Mortal With You"
      />
      <musicImport
        title="In Hell We Live, Lament"
        cover="https://i.ytimg.com/vi/XfTWgMgknpY/maxresdefault.jpg"
        artist="Mili"
        :featured_artists="['KIHOW']"
        album="In Hell We Live, Lament"
        artistMenu
      />
      <musicImport
        title="From a Place of Love"
        cover="http://[::1]:8000/cdn/74fa2580-2d31-4364-adcc-96575171cffa"
        artist="Mili"
        :featured_artists="[]"
        album="Library of Ruina (Original Soundtrack)"
      />
      <musicImport
        title="end of a life"
        cover="https://i1.sndcdn.com/artworks-vwEk6IxoP0Jhy2w7-sXpBgQ-t500x500.jpg"
        artist="Mori Calliope"
        :featured_artists="[]"
        album="Sinderella"
      />
      <musicImport
        title="RTRT"
        cover="https://i1.sndcdn.com/artworks-000231472033-mngpe4-t500x500.jpg"
        artist="Mili"
        :featured_artists="[]"
        album="Miracle Milk"
        albumMenu
      />
    </template>
  </BodyTemplate>
</template>
