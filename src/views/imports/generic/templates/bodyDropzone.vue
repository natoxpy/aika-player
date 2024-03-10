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
            class="flex flex-row overflow-hidden my-4 flex-wrap justify-start gap-6 w-[70%] h-64 min-w-[600px] bg-mantle p-4 rounded-lg transition-all"
            @drop="(e) => $emit('drop', e)"
            @dragover="(e) => $emit('dragover', e)"
            @dragenter="(e) => $emit('dragenter', e)"
            @dragleave="(e) => $emit('dragleave', e)"
            :class="{
                'bg-mantle': hoverState === 'valid' && false,
                'bg-mantle bg-opacity-85': hoverState === 'invalid' && false
            }"
        >
            <div
                class="flex flex-col gap-6 items-center justify-center w-full h-full border-[4px] border-dashed rounded-lg transition-all"
                :class="{
                    'border-lavender  stroke-lavender': hoverState === undefined,
                    'border-teal stroke-teal': hoverState === 'valid',
                    'border-red stroke-red': hoverState === 'invalid'
                }"
            >
                <span class="text-subtext1 text-xl">
                    <span v-if="hoverState == 'invalid'" class="font-bold text-red uppercase"
                        >Don't</span
                    >
                    <span class="font-bold transition-colors text-lavender">
                        Drag and
                        <span
                            :class="{
                                'text-teal uppercase': hoverState === 'valid'
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
