<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ musicId: string }>()

import { useImageMap } from '@/stores/imports/images'
const imageMap = useImageMap()
const coverImage = imageMap.get(props.musicId)
const imageSrc = ref()

if (coverImage.some == true) {
    const cover = coverImage.val
    imageSrc.value = cover.url

    watch([imageMap.imageMap], () => {
        let cover_opt = imageMap.get(props.musicId)
        if (cover_opt.none) return
        let cover = cover_opt.val

        if (cover.url === imageSrc.value) return

        imageSrc.value = cover.url
    })
}
</script>
<template>
    <div
        class="w-full h-full bg-center bg-cover"
        :style="{ backgroundImage: `url(${imageSrc})` }"
    ></div>
</template>
