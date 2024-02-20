<script setup lang="ts">
import SaveIcon from '@/components/icons/shadcn/save.vue';

</script>
<template>
  <div class="h-[150px] mb-[5px] text-white flex flex-row justify-between items-center">
    <div class="flex flex-col gap-1 min-w-[500px]">
      <div class="text-5xl">
        <slot name="title" />
      </div>
      <div class="text-base text-fsecondary sticky">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="flex max-w-[600px] flex-grow items-center gap-4">
      <button class='border border-baccent stroke-baccent hover:stroke-fprimary h-[34px] w-[38px] flex items-center justify-center rounded-primary transition-all'> 
        <SaveIcon :size="20" color="defaultColor" />
      </button>
      <div class="flex-grow">
        <slot name="filter" />
      </div>

      <div
        class="flex stroke-baccent hover:stroke-fsecondary cursor-pointer justify-center items-center"
      >
        <button
          class="border-baccent border rounded-primary py-1 px-3 active:border-fsecondary active:bg-bextra"
          v-on:click="() => console.log(1)"
        >
          Import
        </button>
      </div>
    </div>
  </div>
</template>
