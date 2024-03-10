<script setup lang="ts">
import { ref } from 'vue'
import HeaderTemplate from './templates/header.vue'
import SaveIcon from '@/components/icons/shadcn/save.vue'
import { None, Some, type Option } from 'ts-results'
import { useMusicList } from '@/stores/imports/musics'
import { useImportMusic } from '@/stores/imports/import'

const musicUrlInput = ref<HTMLInputElement>()
const musicList = useMusicList()
const importMusic = useImportMusic()

function getMusicUrlInput(): Option<string> {
    const input = musicUrlInput.value?.value
    if (input !== undefined && input.trim() !== '') return Some(input)
    return None
}

function save() {
    if (importMusic.onGoing) return
    importMusic.startAll()
}

function addMusic() {
    if (importMusic.onGoing) return
    const inputOpt = getMusicUrlInput()
    if (inputOpt.none) return

    const input = inputOpt.val
    try {
        const url = new URL(input)
        musicList.addFromLink(url)
    } catch {}
}
</script>
<template>
    <HeaderTemplate>
        <template #title> Music Imports </template>
        <template #subtitle> Import your favorite music from your favorite platforms </template>
        <template #save>
            <button
                @click="save"
                class="border border-surface1 stroke-overlay1 h-[34px] min-w-[38px] w-[38px] flex items-center justify-center rounded-primary transition-all"
                :disabled="importMusic.onGoing"
                :class="{
                    'active:stroke-lavender active:border-lavender': !importMusic.onGoing,
                    'opacity-30 cursor-auto': importMusic.onGoing
                }"
            >
                <SaveIcon :size="20" color="defaultColor" />
            </button>
        </template>

        <template #input>
            <input
                ref="musicUrlInput"
                class="outline-none bg-transparent border-surface1 focus:border-lavender border px-3 py-1 w-full rounded-primary transition-all placeholder:text-overlay1 placeholder:text-overlay1 text-text"
                placeholder="Music URL"
                :class="{
                    'opacity-30': importMusic.onGoing
                }"
                :disabled="importMusic.onGoing"
            />
        </template>
        <template #submit-btn>
            <button
                class="border-surface1 text-overlay1 border rounded-primary py-1 px-3"
                :class="{
                    'active:border-lavender active:text-lavender': !importMusic.onGoing,
                    'opacity-30 cursor-auto': importMusic.onGoing
                }"
                :disabled="importMusic.onGoing"
                @click="addMusic"
            >
                Import
            </button>
        </template>
    </HeaderTemplate>
</template>
