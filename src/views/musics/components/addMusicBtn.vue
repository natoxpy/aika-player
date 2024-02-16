<script setup lang="ts">
import PlusCircleIcon from '@/components/icons/shadcn/plusCircle.vue'
</script>
<template>
  <div class="py-2 px-4 rounded-primary flex items-center gap-2 bg-white cursor-pointer transition hover:bg-[rgba(255,255,255,0.8)]">
    <div>
      <PlusCircleIcon :size="16" color="#3A3A43" />
    </div>
    <div class="text-[#3A3A43] font-base">Add Music</div>
  </div>
</template>
