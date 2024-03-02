<script setup lang="ts">
import { Artist } from '@/stores/imports/soundcloud/artists.ts'
import { ImageSource, SoundcloudStores } from '../stores/imports/soundcloud/index'
import { watch } from 'vue'

const artists = SoundcloudStores.useArtists()

artists.addArtist('awa', new Artist('awa', new ImageSource('1')))
artists.addArtist('awa', new Artist('awa1', new ImageSource('1')))
artists.addArtist('awa', new Artist('awa2', new ImageSource('1')))

watch([artists.for('awa').unwrap()], () => {
    console.log('awa ', artists.for('awa').unwrap().size)
})

watch([artists.for('gura').unwrap()], () => {
    console.log('gura', artists.for('gura').unwrap().size)
})

function GuraAdd() {
    artists.addArtist('gura', new Artist(crypto.randomUUID(), new ImageSource('1')))
}
</script>
<template>
    <div class="text-white flex flex-col">
        <span v-for="artist in artists.for('awa').unwrap()">{{ artist.username }}</span>
        <button
            @click="
                () => {
                    artists.addArtist('awa', new Artist('added', new ImageSource('1')))
                }
            "
        >
            Add
        </button>
        <button @click="GuraAdd">Add gura</button>
    </div>
</template>
