<script setup lang="ts">
import HeaderTemplate from './templates/header.vue'
</script>
<template>
  <HeaderTemplate>
    <template #title> Music Library </template>
    <template #subtitle> All the music you have available </template>
    <template #filter>
      <input
        class="outline-none bg-transparent border-baccent border px-3 py-1 w-[300px] rounded-primary transition-all placeholder:text-baccent"
        placeholder="Filter"
      />
    </template>
  </HeaderTemplate>
</template>
