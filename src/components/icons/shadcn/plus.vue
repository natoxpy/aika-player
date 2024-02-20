<script setup lang="ts">
import { type IconProps, passDefaults } from '../icons'

const props = defineProps<IconProps>()

const { size, color, strokeWidth } = passDefaults(props)
</script>
<template>
  <svg :width="size" :height="size" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4.16667V15.8333" :stroke="color" :stroke-width="strokeWidth" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M4.16699 10H15.8337" :stroke="color" :stroke-width="strokeWidth" stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
</template>
