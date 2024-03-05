import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCover, getMusics } from '@/stores/api/index.ts'

export const UpnextStore = defineStore('upnext', () => {
    const holding = ref()
    const holdingOver = ref()

    const musics = ref<any[]>([])

    musics.value = []

    ;(async () => {
        const items = []
        for (const item of await getMusics()) {
            const title = item.name
            const cover = await getCover(item.id)
            items.push({ title, cover })
        }
        musics.value = items
    })()

    const reinsertAt = (item_idx: number, location_idx: number) => {
        const item = musics.value.find((_, i) => i === item_idx)
        let items: any[] = musics.value
        items = items.filter((_, i) => i !== item_idx)

        if (item === undefined) return

        items = [...items.slice(0, location_idx), item, ...items.slice(location_idx)]

        musics.value = items
    }

    return {
        musics,
        holding,
        holdingOver,
        reinsertAt,
        setHolding: (arg: any) => (holding.value = arg),
        setHoldingOver: (arg: any) => (holdingOver.value = arg)
    }
})
