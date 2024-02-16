<script setup lang="ts">
import { type IconProps, passDefaults } from './icons'

const props = defineProps<IconProps>()

const { size, color, strokeWidth } = passDefaults(props)
</script>
<template>
  <svg :width="size" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      :stroke="color"
      :stroke-width="strokeWidth"
      fill="none"
      d="M22 11v7.967c0 2.31-2.134 3.769-3.87 2.648L7.34 14.647c-1.787-1.154-1.787-4.14 0-5.294l10.79-6.968C19.865 1.264 22 2.724 22 5.033V7M2 5v7m0 7v-3"
    />
  </svg>
</template>
