<script setup lang="ts">
import MusicTemplate from './templates/index.vue'
import Header from './header.vue'
import AddMusicBtn from './components/addMusicBtn.vue'
import Body from './body.vue'
</script>
<template>
    <MusicTemplate>
        <template #top>
            <AddMusicBtn />
        </template>
        <template #header>
            <Header />
        </template>
        <template #body>
            <Body />
        </template>
    </MusicTemplate>
</template>
