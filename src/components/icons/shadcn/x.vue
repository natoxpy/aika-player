<script setup lang="ts">
import { type IconProps, passDefaults } from '../icons.ts'

let props = defineProps<IconProps>()

const { size, color, strokeWidth } = passDefaults({ ...props })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" :stroke="color" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6 6L18 18" :stroke="color" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
