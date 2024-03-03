<script setup lang="ts">
import BodyTemplate from './templates/body.vue'
import MusicItem from './components/musicItem.vue'

import type { Music as MusicType } from '@/stores/api/index.ts'
import { getMusics } from '@/stores/api/index.ts'
import { onMounted, ref } from 'vue'

const musics = ref<Array<MusicType>>([])

onMounted(async () => {
    musics.value = await getMusics()
})
</script>

<template>
    <BodyTemplate>
        <template #musics>
            <MusicItem v-for="music in musics" :id="music.id" :name="music.name" />
        </template>
    </BodyTemplate>
</template>
