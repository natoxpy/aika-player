<script setup lang="ts">
import UploadIcon from '@/components/icons/uploadIcon.vue'
import { ref } from 'vue';
const dragState = ref<undefined | 'valid-file' | 'invalid-file'>();
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'
const soundcloudStore = useSoundcloudImport();

type Props = { id: string };
const props = defineProps<Props>();

function handleFile(file: File) {
  const fileReader = new FileReader();

  fileReader.addEventListener('load', (e) => {
    if (!e.target) return
    let arrayBuffer = e.target.result;
    if (!(arrayBuffer instanceof ArrayBuffer)) return console.error('data must load as an array buffer');

    soundcloudStore.setImageArrayBuffer(props.id, arrayBuffer)
  })

  fileReader.readAsArrayBuffer(file)
}

function dragover(e: DragEvent) {
  e.stopPropagation();
  e.preventDefault();

  if (e.dataTransfer)
    e.dataTransfer.dropEffect = 'copy';

  dragState.value = 'valid-file';
}

function dragleave(e: DragEvent) {
  dragState.value = undefined;
  e.preventDefault();
}

function drop(e: DragEvent) {
  e.stopPropagation();
  e.preventDefault();
  dragState.value = undefined;
  const files = e.dataTransfer?.files;
  if (files == undefined || files.length == 0) return;

  handleFile(files[0])
}

function change(e: Event) {
  const element: HTMLInputElement = e.target as HTMLInputElement;
  if (!element) return;
  const files = element.files;
  if (!files) return;
  handleFile(files[0])
}
</script>
<template>
  <div class="flex items-center justify-center w-full h-full" @dragover="dragover" @drop="drop" @dragleave="dragleave">
    <label for="dropzone-file"
      class="cursor-pointer w-full h-full rounded-primary flex items-center justify-center hover:opacity-100 transition-all"
      :class="{ 'bg-[hsl(125,40%,40%,0.6)] opacity-100': dragState === 'valid-file', 'bg-[hsl(210,30%,20%,0.8)] opacity-0': dragState === undefined }">
      <div class="flex flex-col items-center justify-center pt-5 pb-6 stroke-fprimary">
        <UploadIcon color="defaultColor" :size="32" />
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or
          drag and drop</p>
      </div>
      <input id="dropzone-file" type="file" class="hidden" accept="image/png, image/gif, image/jpeg" @change="change" />
    </label>
  </div>
</template>

