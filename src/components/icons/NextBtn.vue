<script setup lang="ts">
import { type IconProps, passDefaults } from './icons.ts'

let props = defineProps<IconProps>()

const { size, color, strokeWidth } = passDefaults({ ...props })
</script>

<template>
  <svg :width="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M2 11L2 18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87084 2.38548C4.13419 1.26402 2 2.72368 2 5.03289V7"
        :stroke="color"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
      ></path>
      <path
        d="M22 5V12M22 16V19"
        :stroke="color"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
      ></path>
    </g>
  </svg>
</template>
