<script setup lang="ts">
import UploadIcon from '@/components/icons/uploadIcon.vue'
import { useDragOver } from '@/stores/isDragOver'
const appDragOver = useDragOver()

type Props = {
    state?: 'invalid-cooldown' | 'draggingover'
}

defineProps<Props>()

defineEmits<{
    (n: 'drop', e: DragEvent): void
    (n: 'dragover', e: DragEvent): void
    (n: 'dragenter', e: DragEvent): void
    (n: 'dragleave', e: DragEvent): void
}>()
</script>

<template>
    <div
        class="w-full h-full"
        @drop="(e) => $emit('drop', e)"
        @dragover="(e) => $emit('dragover', e)"
        @dragenter="(e) => $emit('dragenter', e)"
        @dragleave="(e) => $emit('dragleave', e)"
    >
        <label class="w-full h-full bg-green-400" for="cover_input">
            <div
                class="flex w-full h-full p-2 bg-[hsla(225,10%,5%,0.6)] hover:opacity-100 opacity-0 transition-all cursor-pointer"
                :class="{
                    'bg-[hsla(225,10%,5%,0.6)]': state === undefined,
                    'bg-[hsla(160,15%,5%,0.7)] opacity-100': state === 'draggingover',
                    'bg-[hsla(0,5%,10%,0.7)] opacity-100': state === 'invalid-cooldown'
                }"
            >
                <div
                    class="flex flex-col grow rounded-primary border-dashed border-[hsla(225,10%,60%,0.9)] border-[3px] items-center justify-center transition-all"
                    :class="{
                        'stroke-[hsla(225,10%,75%,1)]': state === undefined,
                        'border-emerald-500 stroke-emerald-500': state === 'draggingover',
                        'border-red-400 stroke-red-400': state === 'invalid-cooldown'
                    }"
                >
                    <span class="text-gray-200 transition-all">
                        <span
                            v-if="state == 'invalid-cooldown'"
                            class="font-bold text-red-400 uppercase"
                            >Don't</span
                        >
                        <span class="font-bold text-gray-100 transition-all">
                            Drag and
                            <span
                                :class="{
                                    'text-emerald-500 uppercase':
                                        state === 'draggingover' || appDragOver.isOver
                                }"
                            >
                                Drop
                            </span>
                        </span>
                        <span v-if="state == 'invalid-cooldown'"> that </span>
                        <span v-else> new cover </span>
                    </span>
                    <span>
                        <UploadIcon :size="44" color="defaultColor" />
                    </span>
                </div>
            </div>
            <input
                id="cover_input"
                class="hidden"
                type="file"
                accept="image/png, image/gif, image/jpeg"
            />
        </label>
    </div>
</template>
