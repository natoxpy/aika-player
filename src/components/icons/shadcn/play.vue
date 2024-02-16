<script setup lang="ts">
import { type IconProps, passDefaults } from '../icons'

const props = defineProps<IconProps>()

const { size, color, strokeWidth } = passDefaults(props)
</script>
<template>
  <svg :width="size" :height="size" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.25 3.75L23.75 15L6.25 26.25V3.75Z"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
