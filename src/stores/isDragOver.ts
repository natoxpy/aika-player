import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDragOver = defineStore('dragover', () => {
    const isOver = ref(false)
    const isOverTemp = ref(false)

    const kinds = ref<string[]>()
    const tempKinds = ref<string[]>()

    const types = ref<string[]>()
    const tempTypes = ref<string[]>()

    const locked = ref(false)

    return {
        isOver,
        kinds,
        types,
        hasKind: (kind: string) => {
            if (!kinds.value) return false
            return kinds.value.findIndex((item) => item === kind) !== -1
        },
        /** Bypasses lock */
        unOver: () => {
            isOver.value = false
            kinds.value = undefined
            types.value = undefined
        },
        setTypes: (k?: string[]) => {
            if (locked.value == false) {
                types.value = k
            } else tempTypes.value = k
        },

        setKinds: (k?: string[]) => {
            if (locked.value == false) {
                kinds.value = k
            } else tempKinds.value = k
        },
        setIsOver: (value: boolean) => {
            if (locked.value == false) {
                isOver.value = value
            } else isOverTemp.value = value
        },
        lock: () => (locked.value = true),
        unlock: () => {
            locked.value = false
            isOver.value = isOverTemp.value
            kinds.value = tempKinds.value
            types.value = tempTypes.value
        }
    }
})
