<script setup lang="ts">
import CheckIcon from '@/components/icons/shadcn/check.vue'
import { useMappedAlbumList } from '@/stores/imports/albums'

const albumList = useMappedAlbumList()

type Props = {
    name: string
    cover: string
    id: string
    musicId: string
    selected: boolean
}

const props = defineProps<Props>()

function toggleSelect() {
    if (albumList.hasById(props.musicId, props.id))
        return albumList.deselectAlbum(props.musicId, props.id)

    albumList.selectAlbum(props.musicId, props.id)
}

// function addAlbum() {
//     if (props.selected) return soundcloudStore.removeAlbum(props.music_id, props.id)
//     soundcloudStore.addAlbum(props.music_id, props.id)
// }
</script>
<template>
    <div
        class="flex items-center border-b border-baccent pr-3 h-11 hover:bg-bextra cursor-pointer"
        @click="toggleSelect"
    >
        <div class="min-w-8 h-8 flex justify-center items-center stroke-fsecondary">
            <span v-if="selected">
                <CheckIcon :size="20" color="defaultColor" />
            </span>
        </div>
        <div class="mr-2 h-7 w-7">
            <img class="aspect-square rounded-full" :src="cover" />
        </div>
        <span class="text-fprimary whitespace-nowrap overflow-hidden text-ellipsis">{{
            name
        }}</span>
    </div>
</template>
