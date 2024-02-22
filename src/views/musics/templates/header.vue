<script setup lang="ts">
import PlusCircleIcon from '@/components/icons/shadcn/plusCircle.vue'
</script>
<template>
  <div class="h-[150px] py-[5px] mb-[5px] text-white flex flex-row justify-between items-center">
    <div class="flex flex-col gap-1">
      <div class="text-5xl">
        <slot name="title" />
      </div>
      <div class="text-base text-fsecondary sticky">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex stroke-baccent hover:stroke-fsecondary cursor-pointer justify-center items-center">
        <RouterLink to="/imports/soundcloud">
          <PlusCircleIcon :size="36" :stroke-width="0.5" color="defaultColor" />
        </RouterLink>
      </div>
      <div class="">
        <slot name="filter" />
      </div>
    </div>
  </div>
</template>
