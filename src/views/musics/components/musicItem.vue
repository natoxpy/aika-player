<script setup lang="ts">
import Author from './artist.vue'
import AuthorDivider from './artistDivider.vue'
import Music from './music.vue'
import { ref, onMounted } from 'vue'
import { getCover, getAudio } from '@/stores/api/index.ts'

type Props = {
  id: string
  name: string
}

const props = defineProps<Props>()

const cover = ref()
const audio = ref()

onMounted(async () => {
  cover.value = await getCover(props.id)
  audio.value = await getAudio(props.id)
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
