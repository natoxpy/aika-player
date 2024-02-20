<script setup lang="ts">
import { ref } from 'vue';
import HeaderTemplate from './templates/header.vue'
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'

const soundcloudStore = useSoundcloudImport();
const input_ref = ref<HTMLInputElement>();

const onClick = async () => {
  let scloud_input = input_ref.value;
  if (!scloud_input) return
  const scloud_url = scloud_input.value;

  if (scloud_url.trim() == '') return

  await soundcloudStore.addImportFromUrl(scloud_url)
  scloud_input.value = ''
}

</script>
<template>
  <HeaderTemplate>
    <template #title> Soundcloud imports </template>
    <template #subtitle> Import your favorite music from soundcloud </template>
    <template #input>
      <input ref="input_ref"
        class="outline-none bg-transparent border-baccent border px-3 py-1 w-full rounded-primary transition-all placeholder:text-baccent"
        placeholder="Soundcloud URL" :disabled="soundcloudStore.importing" />
    </template>
    <template #submit-btn>
      <button class="border-baccent border rounded-primary py-1 px-3 active:border-fsecondary active:bg-bextra"
        v-on:click="onClick" :disabled="soundcloudStore.importing">
        Import
      </button>
    </template>
  </HeaderTemplate>
</template>
