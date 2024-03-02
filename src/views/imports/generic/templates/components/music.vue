<script setup lang="ts">
import Loading from '@/assets/loading.vue'
import XIcon from '@/components/icons/shadcn/x.vue'
import CheckIcon from '@/components/icons/shadcn/check.vue'

defineProps<{ id: string; state?: 'imported' | 'failed' | 'loading' }>()

defineEmits<{
    'artist-click': any
    'album-click': any
}>()
</script>
<template>
    <div
        class="flex flex-col text-white h-[360px] min-w-[250px] w-[250px] rounded-primary relative p-3"
    >
        <div
            class="absolute top-0 left-0 h-full z-30 w-[250px] rounded-primary opacity-70 bg-[hsla(150,10%,20%,0.7)] stroke-green-300 flex justify-center items-center"
            v-if="state === 'imported'"
        >
            <CheckIcon :size="200" color="defaultColor" />
        </div>

        <div
            class="absolute top-0 left-0 h-full z-30 w-[250px] rounded-primary opacity-70 bg-[hsla(0,10%,20%,0.7)] stroke-red-300 flex justify-center items-center"
            v-if="state === 'failed'"
        >
            <XIcon :size="200" color="defaultColor" />
        </div>
        <div
            class="absolute top-0 left-0 h-full z-20 w-[250px] rounded-primary opacity-70 bg-[hsla(0,10%,10%,0.8)] stroke-gray-500"
            v-if="state === 'loading'"
        >
            <Loading stroke="defaultColor" />
        </div>
        <!-- FIX: NOT A PERFECT SQUARE, FIX THIS SHIT -->
        <div class="relative w-full mb-4 min-h-[250px] aspect-square">
            <div class="z-10 absolute w-full h-[250px] rounded-primary overflow-hidden">
                <slot name="cover" />
            </div>
            <div class="z-10 absolute w-full h-[250px]">
                <slot name="over-cover" />
            </div>
        </div>
        <div class="flex flex-col">
            <div class="text-lg line-clamp-2 overflow-hidden text-ellipsis">
                <slot name="title" />
            </div>
            <div class="flex gap-1">
                <slot name="author" />
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div class="">
                <div
                    class="cursor-pointer h-full w-full flex gap-2 whitespace-nowrap overflow-hidden text-ellipsis"
                    @click="$emit('artist-click')"
                    :id="id + '-artist-listing'"
                >
                    <slot name="artist-list" />
                    <div class="h-full flex items-center">
                        <slot name="artist-separator" />
                    </div>
                    <slot name="artist-featured-list" />
                </div>
                <div class="relative">
                    <slot name="artist-menu" />
                </div>
            </div>
            <div>
                <div
                    class="cursor-pointer flex gap-2 overflow-hidden"
                    @click="$emit('album-click')"
                    :id="id + '-album-listing'"
                >
                    <slot name="album-list" />
                </div>
                <div class="relative">
                    <slot name="album-menu" />
                </div>
            </div>
        </div>
    </div>
</template>
