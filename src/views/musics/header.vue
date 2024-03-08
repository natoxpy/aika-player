<script setup lang="ts">
import { ref, watch } from 'vue'
import HeaderTemplate from './templates/header.vue'
import Fuse from 'fuse.js'
import { useMusicRegistry } from '@/modules/musicRegistry'
import { useArtistRegistry } from '@/modules/artistRegistry'
import { useContextRegistry } from '@/modules/contextRegistry'

const filterContent = ref('')
const musicRegistry = useMusicRegistry()
const contextRegistry = useContextRegistry()
const artistRegistry = useArtistRegistry()

watch([filterContent], () => {
    const contextOpt = contextRegistry.get('library')
    if (contextOpt.none) return
    const context = contextOpt.val

    context.enableRollbacks()
    context.rollback()

    if (filterContent.value.trim() == '') {
        context.disableRollbacks()
        return
    }

    const musics = Array.from(contextOpt.val.musics)
        .map((music) => ({
            id: music,
            ...musicRegistry.get(music).unwrap()
        }))
        .map((music) => {
            let artists = Array.from(music.artists).map(
                (artist) => artistRegistry.get(artist).unwrap().name
            )

            let featuredArtists = Array.from(music.featuredArtists).map(
                (artist) => artistRegistry.get(artist).unwrap().name
            )

            return {
                id: music.id,
                title: music.title,
                artists: artists,
                featuredArtists: featuredArtists
            }
        })

    const fuse = new Fuse(Array.from(musics), {
        shouldSort: false,
        threshold: 0.4,
        keys: ['title', 'artists', 'featuredArtists']
    })

    const result = fuse.search(filterContent.value).map((item) => item.item)

    context.clear()
    context.append(new Set(result.map((item) => item.id)))
})
</script>
<template>
    <HeaderTemplate>
        <template #title> Music Library </template>
        <template #subtitle> All the music you have available </template>
        <template #filter>
            <input
                v-model="filterContent"
                class="outline-none bg-transparent border-baccent border px-3 py-1 w-[300px] rounded-primary transition-all placeholder:text-baccent"
                placeholder="Filter"
            />
        </template>
    </HeaderTemplate>
</template>
