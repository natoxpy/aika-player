<script setup lang="ts">
import PageTemplate from './templates/page.vue'
import Header from './header.vue'
import Body from './body.vue'
</script>
<template>
  <PageTemplate>
    <template #header>  
      <Header />
    </template>
    <template #body> 
      <Body />
    </template>
  </PageTemplate>
</template>
