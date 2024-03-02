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
                class="border border-baccent stroke-baccent h-[34px] min-w-[38px] w-[38px] flex items-center justify-center rounded-primary transition-all"
                :disabled="importMusic.onGoing"
                :class="{
                    'hover:stroke-fprimary': !importMusic.onGoing,
                    'opacity-30 cursor-auto': importMusic.onGoing
                }"
            >
                <SaveIcon :size="20" color="defaultColor" />
            </button>
        </template>

        <template #input>
            <input
                ref="musicUrlInput"
                class="outline-none bg-transparent border-baccent border px-3 py-1 w-full rounded-primary transition-all placeholder:text-baccent"
                placeholder="Music URL"
                :class="{
                    'opacity-30': importMusic.onGoing
                }"
                :disabled="importMusic.onGoing"
            />
        </template>
        <template #submit-btn>
            <button
                class="border-baccent border rounded-primary py-1 px-3"
                :class="{
                    'active:border-fsecondary active:bg-bextra': !importMusic.onGoing,
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
