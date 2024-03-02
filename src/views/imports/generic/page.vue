<script setup lang="ts">
import PageTemplate from './templates/page.vue'
import Header from './header.vue'
import Body from './body.vue'
import BodyDropzone from './bodyDropzone.vue'
import { useArtistList } from '@/stores/imports/database/artists'

// Loads artist in database
useArtistList()
</script>
<template>
    <PageTemplate>
        <template #header>
            <Header />
        </template>
        <template #body>
            <Body />
        </template>
        <template #dropzone>
            <BodyDropzone> </BodyDropzone>
        </template>
    </PageTemplate>
</template>
