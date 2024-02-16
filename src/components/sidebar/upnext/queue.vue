<script setup lang="ts">
import QueueTemplate from './templates/queue.vue'
import QueueItem from './queueItem.vue'
import { UpnextStore } from '@/stores/upnext.ts'

const upnextStore = UpnextStore()
type Props = { open: boolean }
defineProps<Props>()
</script>

<template>
  <QueueTemplate :open="open">
    <template #items>
      <QueueItem
        v-for="[i, item] in upnextStore.musics.entries()"
        :id="i"
        :idx="i"
        :cover="item.cover"
      >
        <template #title> {{ item.title }} </template>
      </QueueItem>
      <!--
      <QueueItem cover="http://[::1]:8000/cdn/74fa2580-2d31-4364-adcc-96575171cffa">
        <template #title> From a Place of Love </template>
      </QueueItem>
      <QueueItem cover="http://[::1]:8000/cdn/ac4db47b-7045-4bdc-aa9c-99b9e7e063fd">
        <template #title> In Hell We Live </template>
      </QueueItem>
      <QueueItem cover="http://[::1]:8000/cdn/74fa2580-2d31-4364-adcc-96575171cffa">
        <template #title> Iron Lotus </template>
      </QueueItem>
      <QueueItem cover="http://[::1]:8000/cdn/ac4db47b-7045-4bdc-aa9c-99b9e7e063fd">
        <template #title> Mortal With You </template>
      </QueueItem>
      <QueueItem cover="http://[::1]:8000/cdn/74fa2580-2d31-4364-adcc-96575171cffa">
        <template #title> Statis </template>
      </QueueItem>
      <QueueItem cover="http://[::1]:8000/cdn/ac4db47b-7045-4bdc-aa9c-99b9e7e063fd">
        <template #title> Camelia </template>
      </QueueItem>
      -->
    </template>
  </QueueTemplate>
</template>
