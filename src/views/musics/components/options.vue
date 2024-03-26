<script setup lang="ts">
import MoreHorizontalIcon from '@/components/icons/shadcn/moreHorizontal.vue'
import { ref } from 'vue'
</script>
<template>
    <div class="relative">
        <button
            class="px-1 py-0 rounded-primary bg-surface0 bg-opacity-70 hover:bg-opacity-80 hover:bg-surface1 transition-all hover:stroke-lavender"
        >
            <MoreHorizontalIcon :size="32" color="defaultColor" />
        </button>

        <div
            class="flex text-sm flex-col absolute top-10 right-0 bg-opacity-80 rounded-primary whitespace-nowrap text-text"
        >
            <button class="px-3 hover:bg-surface0 hover:text-lavender bg-base rounded-t-primary">
                Add to next up
            </button>
            <button class="px-3 hover:bg-surface0 hover:text-lavender bg-base">
                Add to next up
            </button>
            <button class="px-3 hover:bg-surface0 hover:text-red bg-base rounded-b-primary">
                Remove
            </button>
        </div>
    </div>
</template>
