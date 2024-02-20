<script setup lang="ts">
import { getArtists, type Artist } from '@/stores/api/crud/artists';
import ArtistItem from './artistItem.vue'
import { ref } from 'vue'
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'
const soundcloudStore = useSoundcloudImport();

defineProps<{ idx: number }>()

const artists = ref<Artist[]>();
getArtists().then(data => artists.value = data)
</script>
<template>
  <div id="artist-menu-item"
    class="flex flex-col absolute bg-bprimary border border-baccent left-0 top-7 z-50 w-60 text-white rounded-primary">
    <div class="border-b border-baccent">
      <input class="w-full px-4 py-2 bg-transparent outline-none" placeholder="Artist name" />
    </div>
    <div class="flex flex-col">
      <div class="flex justify-center items-center" v-if="artists?.length == 0">
        <span class="text-fsecondary italic">No artists</span>
      </div>
      <ArtistItem :name="artist.name" :idx="artist.id" :music_idx="idx" v-for="artist in artists" />
      <!--

      <ArtistItem name="Mili" artist_type="artist" :idx="idx"
        avatar="https://images.squarespace-cdn.com/content/v1/52143a7ae4b0f9bd8308dc73/1562163883783-GMM973J7GIXPAV6TCEQK/Mili+logo_no+back_SQ.png" />
      <ArtistItem name="KIHOW" artist_type="featured-artist" :idx="idx"
        avatar="https://i.scdn.co/image/ab6761610000e5eb079ca21f19c58d2846465eab" />
      <ArtistItem name="Mori Calliope" :idx="idx"
        avatar="https://yt3.googleusercontent.com/8B_T08sx8R7XVi5Mwx_l9sjQm5FGWGspeujSvVDvd80Zyr-3VvVTRGVLOnBrqNRxZp6ZeXAV=s176-c-k-c0x00ffffff-no-rj" />
      -->
    </div>
  </div>
</template>
