<script setup lang="ts">
import { type IconProps, passDefaults } from '../icons.ts'

let props = defineProps<IconProps>()

const { size, color, strokeWidth } = passDefaults({ ...props })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 15 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_294_1642)">
      <path
        d="M7.5 6.25L9.43125 10.1625L13.75 10.7938L10.625 13.8375L11.3625 18.1375L7.5 16.1063L3.6375 18.1375L4.375 13.8375L1.25 10.7938L5.56875 10.1625L7.5 6.25Z"
        :stroke="color"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_294_1642">
        <rect :width="size" :height="size" :fill="color" transform="translate(0 5)" />
      </clipPath>
    </defs>
  </svg>
</template>
