<script setup lang="ts">
import uploadTrackIcon from '@/components/icons/svgrepo/uploadTrack.vue'
import XIcon from '@/components/icons/shadcn/x.vue'
import { useImportMusic } from '@/stores/imports/import'
const importMusic = useImportMusic()

defineProps<{ hoverState?: 'valid' | 'invalid'; visible: boolean }>()

defineEmits<{
    (n: 'drop', e: DragEvent): void
    (n: 'dragover', e: DragEvent): void
    (n: 'dragenter', e: DragEvent): void
    (n: 'dragleave', e: DragEvent): void
}>()
</script>

<template>
    <div
        class="w-full flex justify-center items-center overflow-hidden transition-all"
        :class="{
            'opacity-100': visible === true,
            'opacity-20': visible === false,
            'h-0': importMusic.onGoing,
            'h-80': !importMusic.onGoing
        }"
    >
        <div
            class="flex flex-row overflow-hidden my-4 flex-wrap justify-start gap-6 w-[70%] h-64 min-w-[600px] bg-[hsla(225,10%,5%,0.8)] p-4 rounded-lg transition-all"
            @drop="(e) => $emit('drop', e)"
            @dragover="(e) => $emit('dragover', e)"
            @dragenter="(e) => $emit('dragenter', e)"
            @dragleave="(e) => $emit('dragleave', e)"
            :class="{
                'bg-[hsla(160,5%,10%,0.95)] opacity-100': hoverState === 'valid',
                'bg-[hsla(0,5%,10%,0.95)] opacity-100': hoverState === 'invalid'
            }"
        >
            <div
                class="flex flex-col gap-6 items-center justify-center w-full h-full border-[4px] border-[hsla(225,10%,60%,0.9)] border-dashed rounded-lg transition-all"
                :class="{
                    'border-gray-500  stroke-[hsla(225,10%,75%,0.8)]': hoverState === undefined,
                    'border-emerald-700 stroke-emerald-500': hoverState === 'valid',
                    'border-red-500 stroke-red-500': hoverState === 'invalid'
                }"
            >
                <span class="text-white text-xl">
                    <span v-if="hoverState == 'invalid'" class="font-bold text-red-500 uppercase"
                        >Don't</span
                    >
                    <span class="font-bold transition-colors">
                        Drag and
                        <span
                            :class="{
                                'text-emerald-500 uppercase': hoverState === 'valid'
                            }"
                        >
                            Drop
                        </span>
                    </span>
                    <span v-if="hoverState == 'invalid'"> from unsupported source </span>
                    <span v-else> music from external sources </span>
                </span>
                <span v-if="hoverState == 'invalid'">
                    <XIcon :size="50" color="defaultColor" />
                </span>
                <span v-else>
                    <uploadTrackIcon :size="50" color="defaultColor" />
                </span>
            </div>
        </div>
    </div>
</template>
