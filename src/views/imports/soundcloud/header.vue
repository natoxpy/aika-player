<script setup lang="ts">
import HeaderTemplate from './templates/header.vue'
</script>
<template>
  <HeaderTemplate>
    <template #title> Soundcloud imports </template>
    <template #subtitle> Import your favorite music from soundcloud </template>
    <template #filter>
      <input
        class="outline-none bg-transparent border-baccent border px-3 py-1 w-full rounded-primary transition-all placeholder:text-baccent"
        placeholder="Soundcloud URL"
      />
    </template>
  </HeaderTemplate>
</template>
