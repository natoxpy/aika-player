<script setup lang="ts">
import musicImportTemplate from './templates/musicImport.vue'
import LoadingSvg from '@/assets/loading.vue'

type Props = { id: string }
defineProps<Props>()
</script>
<template>
  <musicImportTemplate title="Loading..." :no-featured="true" :id="id" disabled-actions>
    <template #cover>
      <div class="border border-bextra w-full h-full bg-cover stroke-white bg-center" :style="{}">
        <LoadingSvg stroke="defaultColor" />
      </div>
    </template>
    <template #artists>
      <span class="italic text-fsecondary">Loading artists</span>
    </template>
    <template #album>
      <span class="italic text-fsecondary">Loading albums</span>
    </template>
  </musicImportTemplate>
</template>
