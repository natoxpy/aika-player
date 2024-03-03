<script setup lang="ts">
import ArtistItem from './artistItem.vue'
import { ref, watch } from 'vue'
import { useDebouncedWithValue } from '../debounce'
import { useSoundcloudImport, type ArtistsMeta } from '@/stores/imports/soundcloud.ts'
import PlusIcon from '@/components/icons/shadcn/plus.vue'

const soundcloudStore = useSoundcloudImport();

const props = defineProps<{ id: string }>()

const artists = ref<ArtistsMeta[]>([]);

soundcloudStore.getArtistsForSelector(props.id).then(data => (artists.value = data as ArtistsMeta[]))

const [artistInput, artistSearchInput] = useDebouncedWithValue('', 0)

watch([soundcloudStore.artists], () => {
  soundcloudStore.getArtistsForSelector(props.id, artistSearchInput.value).then(data => (artists.value = data as ArtistsMeta[]))
})

watch([artistSearchInput], () => {
  const artistSearchValue = artistSearchInput.value;
  soundcloudStore.getArtistsForSelector(props.id, artistSearchValue).then(data => (artists.value = data as ArtistsMeta[]))
})

async function saveArtist() {
  const name = artistSearchInput.value;

  if (name === undefined) return

  let newArtistId = soundcloudStore.addNewArtist(name)
  soundcloudStore.addArtist(props.id, newArtistId, false)

  soundcloudStore.getArtistsForSelector(props.id).then(data => (artists.value = data as ArtistsMeta[]))
  artistInput.value = ''
}

const idForFocus = `artist-menu-item-${props.id}`
</script>
<template>
  <div :id="idForFocus"
    class="flex flex-col absolute bg-bprimary border border-baccent left-0 top-7 z-50 w-60 text-white rounded-primary">

    <div class="flex gap-1 items-center border-b border-baccent">
      <input v-model="artistInput" class="w-full pl-4 py-2 bg-transparent outline-none" placeholder="Artist name" />
      <div class="mr-1">
        <slot name="search-right-icon" />
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex justify-center items-center"
        v-if="artists.findIndex(item => item.name === artistInput) == -1 && artists.length == 0">
        <span class="text-fsecondary italic">No artists</span>
      </div>
      <ArtistItem :name="artist.name" :avatar="artist.avatar_url" :newly="artist.existedInDB == false"
        :artist_type="artist.featured == undefined ? undefined : artist.featured == true ? 'featured-artist' : 'artist'"
        :id="artist.id" :music_id="id" v-for="artist in artists.values()" />

      <div :class="{
        'hidden': !(artists.findIndex(item => item.name === artistInput) === -1 && (artistInput ?? '').trim() !== '')
      }" class="flex justify-center p-2 hover:bg-bextra" v-on:click="saveArtist" role="button">
        <PlusIcon :size="24" />
        <span>Add {{ artistInput }}</span>
      </div>

    </div>
  </div>
</template>
