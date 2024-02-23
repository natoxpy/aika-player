<script setup lang="ts">
import { ref } from 'vue';
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'
const soundcloudStore = useSoundcloudImport();

const dragCounter = ref(0)
const dragState = ref<undefined | 'valid'>();

function getPlain(items?: DataTransferItemList): DataTransferItem | undefined {
  if (!items) return;
  return Array.from(items).find(item => item.type == 'text/plain')
}

function dragOver(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  if (!e.dataTransfer) return
  if (getPlain(e.dataTransfer.items)) dragState.value = 'valid'
}

function dragEnter(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation()
  dragCounter.value++;
}

function dragLeave(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation()

  dragCounter.value--;
  if (dragCounter.value != 0) return
  dragState.value = undefined;
}

async function drop(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()

  dragState.value = undefined;

  const items = e.dataTransfer?.items;
  const plain = getPlain(items)
  if (!plain) return;

  const text: string = await (new Promise((resolve, _) => plain.getAsString((data) => resolve(data))))
  if (!text) return;
  try {
    const url = new URL(text)
    if (!url.origin.startsWith('https://soundcloud.com')) return
    await soundcloudStore.addImportFromUrl(url.href)
  }
  catch { }
}
</script>
<template>
  <div class="flex flex-col relative pb-4 px-[50px] h-full overflow-auto">
    <div class="sticky top-0 bg-gradient-to-b from-bprimary z-50 via-[hsla(240,10%,4%,0.5)] via-75% transition-all">
      <slot name="header" />
    </div>
    <div class="flex-grow z-0 rounded-primary" :class="{ 'bg-bextra': dragState === 'valid' }" @dragenter="dragEnter"
      @dragleave="dragLeave" @dragover="dragOver" @drop="drop">
      <slot name="body" />
    </div>
  </div>
</template>
