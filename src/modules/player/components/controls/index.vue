<script setup lang="ts">
import TimeSeeker from './TimeSeeker.vue'
import ActionButtons from './ActionButtons.vue'
import VolumeButtons from './VolumeButtons.vue'
</script>

<template>
    <div
        class="border-t border-baccent w-full gap-4 h-full flex justify-center items-center bg-bprimary"
    >
        <ActionButtons />
        <div class="w-1 h-1 rounded-full bg-gray-400" />
        <TimeSeeker />
        <div class="w-1 h-1 rounded-full bg-gray-400" />
        <VolumeButtons />
    </div>
</template>
