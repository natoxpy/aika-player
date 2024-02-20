<script setup lang="ts">
import AlbumItem from './albumItem.vue'
</script>
<template>
  <div id="album-menu-item"
    class="flex flex-col absolute bg-bprimary border border-baccent left-0 top-7 z-50 min-w-60 max-w-96 text-white rounded-primary">
    <div class="border-b border-baccent">
      <input class="w-full px-4 py-2 bg-transparent outline-none" placeholder="Album name" />
    </div>
    <div class="flex flex-col">
      <span>TODO! not implemented</span>
      <!--
      <AlbumItem name="Miracle Milk" selected
        cover="https://m.media-amazon.com/images/I/71JhHRU9i2L._UF1000,1000_QL80_.jpg" />
      <AlbumItem name="Library of Ruina (Original Soundtrack)"
        cover="https://dl.vgmdownloads.com/soundtracks/library-of-ruina-official-soundtrack/ss_6e1d395af66c7a83eb90d7332d1dfed19c921cd8.jpg" />
      <AlbumItem name="To Kill a Living Book: for Library Of Ruina" cover="https://f4.bcbits.com/img/a0335315256_65" />
      -->
    </div>
  </div>
</template>
