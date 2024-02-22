<script setup lang="ts">
import { ref } from 'vue';
import HeaderTemplate from './templates/header.vue'
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'
import SaveIcon from '@/components/icons/shadcn/save.vue';
import { useRouter } from 'vue-router'
import { soundcloudImport } from '@/stores/api/import/soundcloud';

const soundcloudStore = useSoundcloudImport();
const input_ref = ref<HTMLInputElement>();
const router = useRouter();

const onClick = async () => {
  let scloud_input = input_ref.value;
  if (!scloud_input) return
  const scloud_url = scloud_input.value;

  if (scloud_url.trim() == '') return

  soundcloudStore.addImportFromUrl(scloud_url)
  scloud_input.value = ''
}

async function save() {
  const musics = soundcloudStore.getAll();

  for (const music of musics) {
    await soundcloudImport(music);
  }

  router.push({ 'path': '/musics' });
}

</script>
<template>
  <HeaderTemplate>
    <template #title> Soundcloud imports </template>
    <template #subtitle> Import your favorite music from soundcloud </template>
    <template #save>
      <button v-on:click="save"
        class='border border-baccent stroke-baccent hover:stroke-fprimary h-[34px] min-w-[38px] w-[38px] flex items-center justify-center rounded-primary transition-all'
        v-if="soundcloudStore.musics.size != 0">
        <SaveIcon :size="20" color="defaultColor" />
      </button>

    </template>

    <template #input>
      <input ref="input_ref"
        class="outline-none bg-transparent border-baccent border px-3 py-1 w-full rounded-primary transition-all placeholder:text-baccent"
        placeholder="Soundcloud URL" />
    </template>
    <template #submit-btn>
      <button class="border-baccent border rounded-primary py-1 px-3 active:border-fsecondary active:bg-bextra"
        v-on:click="onClick">
        Import
      </button>
    </template>
  </HeaderTemplate>
</template>
