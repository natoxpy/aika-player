<script setup lang="ts">
import ArtistItem from './artistItem.vue'
</script>
<template>
  <div
    class="flex flex-col absolute bg-bprimary border border-baccent left-0 top-7 z-50 w-60 text-white rounded-primary"
  >
    <div class="border-b border-baccent">
      <input class="w-full px-4 py-2 bg-transparent outline-none" placeholder="Artist name" />
    </div>
    <div class="flex flex-col">
      <ArtistItem
        name="Mili"
        artist_type="artist"
        avatar="https://images.squarespace-cdn.com/content/v1/52143a7ae4b0f9bd8308dc73/1562163883783-GMM973J7GIXPAV6TCEQK/Mili+logo_no+back_SQ.png"
      />
      <ArtistItem
        name="KIHOW"
        artist_type="featured-artist"
        avatar="https://i.scdn.co/image/ab6761610000e5eb079ca21f19c58d2846465eab"
      />
      <ArtistItem
        name="Mori Calliope"
        avatar="https://yt3.googleusercontent.com/8B_T08sx8R7XVi5Mwx_l9sjQm5FGWGspeujSvVDvd80Zyr-3VvVTRGVLOnBrqNRxZp6ZeXAV=s176-c-k-c0x00ffffff-no-rj"
      />
    </div>
  </div>
</template>
