<script setup lang="ts">
type Props = { name: string }
defineProps<Props>()
</script>
<template>
  <span class="text-fsecondary font-inter whitespace-nowrap select-text">
    {{ name }}
  </span>
</template>
