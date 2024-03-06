<script setup lang="ts">
// import PageControls from './components/controls/index.vue'
import PageControls from './modules/player/components/controls/index.vue'
import Sidebar from './components/sidebar/index.vue'
import DragWrapper from './dragWrapper.vue'
import { usePlayerManager } from '@/modules/player'

const playerManager = usePlayerManager()
const player = playerManager.player
</script>

<template>
    <DragWrapper>
        <template #app>
            <div class="flex flex-row w-screen h-screen bg-bprimary">
                <div class="min-w-[330px]">
                    <Sidebar />
                </div>
                <div class="w-full flex-shrink-1 relative">
                    <div class="absolute bottom-0 w-full h-[65px]" v-if="player.getCursor().some">
                        <PageControls />
                    </div>
                    <RouterView />
                </div>
            </div>
        </template>
    </DragWrapper>
</template>
