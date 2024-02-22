<script setup lang="ts">
import AlbumItem from './albumItem.vue'
import { ref, watch } from 'vue'
import { useDebouncedWithValue } from '../debounce'
import { useSoundcloudImport, type AlbumsMeta } from '@/stores/imports/soundcloud.ts'
import PlusIcon from '@/components/icons/shadcn/plus.vue'

const soundcloudStore = useSoundcloudImport();

const props = defineProps<{ id: string }>()

const albums = ref<AlbumsMeta[]>([]);

soundcloudStore.getAlbumsForSelector(props.id).then(data => (albums.value = data as AlbumsMeta[]))

const [albumInput, albumSearchInput] = useDebouncedWithValue('', 0)

watch([soundcloudStore.albums], () => {
  soundcloudStore.getAlbumsForSelector(props.id, albumSearchInput.value).then(data => (albums.value = data as AlbumsMeta[]))
})

watch([albumSearchInput], () => {
  const albumSearchValue = albumSearchInput.value;
  soundcloudStore.getAlbumsForSelector(props.id, albumSearchValue).then(data => (albums.value = data as AlbumsMeta[]))
})

async function saveAlbum() {
  const name = albumSearchInput.value;
  if (name === undefined) return

  soundcloudStore.addNewAlbums(name)
  soundcloudStore.getAlbumsForSelector(props.id).then(data => (albums.value = data as AlbumsMeta[]))
}


</script>
<template>
  <div id="album-menu-item"
    class="flex flex-col absolute bg-bprimary border border-baccent left-0 top-7 z-50 min-w-60 max-w-96 text-white rounded-primary">
    <div class="flex gap-1 items-center border-b border-baccent">

      <input v-model="albumInput" class="w-full pl-4 py-2 bg-transparent outline-none" placeholder="Album name" />
      <div class="mr-1">
        <slot name="search-right-icon" />
      </div>

    </div>
    <div class="flex flex-col">
      <AlbumItem :music_id="id" :id="album.id" :name="album.name" :selected="album.selected === true"
        :newly="album.existedInDB == false" :cover="album.cover_url" v-for="album in albums.values()" />
      <!--
      <AlbumItem name="Miracle Milk" selected
        cover="https://m.media-amazon.com/images/I/71JhHRU9i2L._UF1000,1000_QL80_.jpg" />
      <AlbumItem name="Library of Ruina (Original Soundtrack)"
        cover="https://dl.vgmdownloads.com/soundtracks/library-of-ruina-official-soundtrack/ss_6e1d395af66c7a83eb90d7332d1dfed19c921cd8.jpg" />
      <AlbumItem name="To Kill a Living Book: for Library Of Ruina" cover="https://f4.bcbits.com/img/a0335315256_65" />
      -->

      <div v-if="albums.findIndex(item => item.name === albumInput) == -1 && (albumInput ?? '').trim() !== ''"
        class=" flex justify-center p-2 hover:bg-bextra" v-on:click="saveAlbum()">
        <PlusIcon :size="24" />
        <span>Add {{ albumInput }}</span>
      </div>

    </div>
  </div>
</template>
