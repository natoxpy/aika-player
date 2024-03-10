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
</script>
<template>
    <div
        class="flex items-center hover:bg-crust hover:bg-opacity-70 pr-3 h-11 cursor-pointer"
        @click="toggleSelect"
    >
        <div class="min-w-8 h-8 flex justify-center items-center stroke-lavender">
            <span v-if="selected">
                <CheckIcon :size="20" color="defaultColor" />
            </span>
        </div>

        <div class="mr-2 h-7 w-7">
            <img class="h-7 min-w-7 aspect-square rounded-full" :src="cover" />
        </div>
        <span class="text-text whitespace-nowrap overflow-hidden text-ellipsis">{{ name }}</span>
    </div>
</template>
