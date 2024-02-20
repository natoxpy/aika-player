<script setup lang="ts">
type Props = { name: string }
defineProps<Props>()
</script>
<template>
  <span class="text-fsecondary font-inter whitespace-nowrap select-none">
    {{ name }}
  </span>
</template>
