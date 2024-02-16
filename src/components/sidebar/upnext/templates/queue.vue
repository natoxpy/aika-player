<script setup lang="ts">
type Props = { open: boolean }
defineProps<Props>()
</script>
<template>
  <div
    class="w-full flex overflow-hidden bg-bprimary flex-col h-92 p-2 border-t border-baccent max-h-[800px] gap-2 sticky bottom-[79px] overflow-y-auto"
    :class="{ 'opacity-0': !open }"
  >
    <slot name="items" />
  </div>
</template>
