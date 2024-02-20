<script setup lang="ts">
import { type IconProps, passDefaults } from '../icons.ts'

let props = defineProps<IconProps>()

const { size, color, strokeWidth } = passDefaults({ ...props })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5 3.75L5.625 10.625L2.5 7.5"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
