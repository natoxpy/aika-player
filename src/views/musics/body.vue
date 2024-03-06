<script setup lang="ts">
import BodyTemplate from './templates/body.vue'
import MusicItem from './components/musicItem.vue'
import { onMounted, ref, watch } from 'vue'
import { useContextRegistry } from '@/modules/contextRegistry'
import { useMusicRegistry } from '@/modules/musicRegistry'

const contextRegistry = useContextRegistry()
const musicRegistry = useMusicRegistry()

const libraryContext = contextRegistry.for('library')

const musics = ref<Array<string>>(Array.from(libraryContext.musics))

watch([libraryContext], () => {
    musics.value = Array.from(libraryContext.musics)
})

onMounted(() => musicRegistry.sync())
</script>
<template>
    <BodyTemplate>
        <template #musics>
            <MusicItem
                :music-id="music"
                context-id="library"
                :title="musicRegistry.get(music).unwrap().title"
                :cover="musicRegistry.get(music).unwrap().cover"
                :audio="musicRegistry.get(music).unwrap().audio"
                v-for="music in musics"
            />
        </template>
    </BodyTemplate>
</template>
