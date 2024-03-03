import { defineStore } from 'pinia'
import { ImageSource, MusicMapped } from '.'
import { reactive } from 'vue'

export const useImageMap = defineStore('mappedImages', () => {
    const imageMap = reactive(new MusicMapped<ImageSource, never>())

    return {
        imageMap,
        get: (musicId: string) => imageMap.get(musicId),
        set: (musicId: string, image: ImageSource) => {
            imageMap.set(musicId, image)
        }
    }
})
