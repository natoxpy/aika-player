<script setup lang="ts">
import { type IconProps, passDefaults } from './icons'

const props = defineProps<IconProps>()

const { size, color, strokeWidth } = passDefaults(props)
</script>
<template>
  <svg :width="size" :height="size" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
    <path :stroke="color" stroke-linecap="round" stroke-linejoin="round" :stroke-width="strokeWidth"
      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
  </svg>
</template>
