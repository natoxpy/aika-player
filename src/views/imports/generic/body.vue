<script setup lang="ts">
import Music from './components/music.vue'
import MusicTemplate from './templates/components/music.vue'
import BodyTemplate from './templates/body.vue'
import { useMusicList } from '@/stores/imports/musics'
const musicList = useMusicList()
</script>
<template>
    <BodyTemplate>
        <template #musics>
            <Music
                :key="music.id"
                :id="music.id"
                :title="music.title"
                v-for="music in musicList.musics"
            />
            <MusicTemplate
                :key="idx"
                state="loading"
                :id="`${idx}`"
                v-for="idx in musicList.loadingTotal"
            >
                <template #title> Loading... </template>
            </MusicTemplate>
        </template>
    </BodyTemplate>
</template>
