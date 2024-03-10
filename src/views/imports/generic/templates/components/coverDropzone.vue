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
        <label class="w-full h-full bg-green" for="cover_input">
            <div
                class="flex w-full h-full p-2 bg-[hsla(225,10%,5%,0.6)] hover:opacity-100 opacity-0 transition-all cursor-pointer"
                :class="{
                    'bg-[hsla(225,10%,5%,0.6)]': state === undefined,
                    'bg-[hsla(160,15%,5%,0.7)] opacity-100': state === 'draggingover',
                    'bg-[hsla(0,5%,10%,0.7)] opacity-100': state === 'invalid-cooldown'
                }"
            >
                <div
                    class="flex flex-col grow rounded-primary border-dashed border-[3px] items-center justify-center transition-all"
                    :class="{
                        'border-lavender stroke-lavender': state === undefined,
                        'border-teal stroke-teal': state === 'draggingover',
                        'border-red stroke-red': state === 'invalid-cooldown'
                    }"
                >
                    <span class="text-subtext1 transition-all text-sm text-lavender">
                        <span
                            v-if="state == 'invalid-cooldown'"
                            class="font-bold text-red uppercase"
                            >Don't</span
                        >
                        <span class="font-bold text-lavender transition-all">
                            Drag and
                            <span
                                :class="{
                                    'text-teal uppercase':
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
