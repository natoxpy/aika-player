<script setup lang="ts">
import { useRouter } from 'vue-router'
import Option from './option.vue'
import Section from './section.vue'
import Queue from './upnext/queue.vue'
import Playing from './upnext/playing.vue'
import { usePlayerManager } from '@/modules/player'

const playerManager = usePlayerManager()
const player = playerManager.player

import { ref, watch } from 'vue'
const router = useRouter()

const routeName = ref(router.currentRoute.value.name)

watch(router.currentRoute, () => {
    routeName.value = router.currentRoute.value.name
})

const open = ref(true)
const onNextupMenu = () => {
    open.value = !open.value
}
</script>

<template>
    <div class="h-full border-surface0 bg-mantle flex flex-col relative overflow-y-auto">
        <Section>
            <template #title>Discover</template>
            <template #options>
                <Option href="/" icon="circlePlay" :active="routeName == 'ListenNow'">
                    Listen Now
                </Option>
                <Option href="/browse" icon="layoutGrid" :active="routeName == 'Browse'">
                    Browse
                </Option>
            </template>
        </Section>

        <Section>
            <template #title>Library</template>
            <template #options>
                <Option href="/playlists" icon="listMusic" :active="routeName == 'Playlists'">
                    Playlists
                </Option>
                <Option href="/musics" icon="music" :active="routeName == 'Musics'">
                    Musics
                </Option>
                <Option href="/albums" icon="library" :active="routeName == 'Albums'">
                    Albums
                </Option>
                <Option href="/artists" icon="mic" :active="routeName == 'Artists'">
                    Artists
                </Option>
            </template>
        </Section>

        <Section>
            <template #title>Playlists</template>
            <template #options>
                <Option href="/" icon="library"> Recently added </Option>
                <Option href="/" icon="library"> Recently Played </Option>
                <Option href="/" icon="library"> Miracle Milk </Option>
                <Option href="/" icon="library"> Mili's best </Option>
                <Option href="/" icon="library"> Key ingredients </Option>
            </template>
        </Section>

        <div class="w-full absolute bottom-0 mt-auto" v-if="player.getCursor().some">
            <Queue :open="open" />
            <Playing :onNextupMenu="onNextupMenu" :open="open" />
        </div>
    </div>
</template>
