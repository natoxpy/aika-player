<script setup lang="ts">
import Author from './artist.vue'
import Music from './music.vue'
import { ref, onMounted } from 'vue'
import { getCover, getAudio, getMusicAudio } from '@/stores/api/index.ts'

type Props = {
  id: string
  name: string
}

const props = defineProps<Props>()

const cover = ref()
const audio = ref()

onMounted(async () => {
  cover.value = await getCover(props.id)
  audio.value = (await getMusicAudio(props.id))?.file_id
})
</script>

<template>
  <Music :cover="cover" :audio="audio">
    <template #title> {{ name }} </template>
    <template #author>
      <Author> Mili </Author>
    </template>
  </Music>
</template>
