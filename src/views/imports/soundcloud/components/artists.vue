<script setup lang="ts">
type Props = {noFeatured?: boolean}
defineProps<Props>()
</script>
<template>
  <div class="flex items-center gap-2 hover:-translate-x-[calc(100%-250px)] transition-all duration-[2s] delay-700">
    <slot name="artists" />
    <div class="bg-fsecondary rounded-full w-[3px] h-[3px]" v-if="noFeatured != true" />
    <slot name="featured" />
  </div>
</template>
