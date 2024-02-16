<script setup lang="ts">
import { type IconProps, passDefaults } from '../icons'

const props = defineProps<IconProps>()

const { size, color, strokeWidth } = passDefaults(props)
</script>
<template>
  <svg :width="size" :height="size" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13 5H8V25H13V5Z"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M23 5H18V25H23V5Z"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
