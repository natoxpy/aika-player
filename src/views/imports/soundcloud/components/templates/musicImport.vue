<script setup lang="ts">
import { ref } from 'vue'
import Artists from '../artists.vue'
import AlbumMenu from '../albumSelectMenu/index.vue'
import ArtistMenu from '../artistSelectMenu/index.vue'

type Props = { title: string, noFeatured?: boolean, albumMenu?: boolean, artistMenu?: boolean }
defineProps<Props>()

const titleSpan = ref<HTMLDivElement>()

function EditCover() {
  console.log('edit cover')
}

function placeCaretAtEnd(el: any) {
  el.focus()
  if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
    var range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    var sel: any = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  } else if (typeof (document.body as any).createTextRange != 'undefined') {
    var textRange = (document.body as any).createTextRange()
    textRange.moveToElementText(el)
    textRange.collapse(false)
    textRange.select()
  }
}

function EditTitle() {
  const element = titleSpan.value
  if (!element) return

  element.contentEditable = 'true'
  element.style.borderBottom = '1px solid hsl(0, 0%, 50%, 0.5)'
  element.style.whiteSpace = 'normal'

  placeCaretAtEnd(element)

  element.onblur = () => (
    (element.contentEditable = 'false'),
    (element.style.borderBottom = ''),
    (element.style.whiteSpace = 'nowrap'),
    element.innerText.trim() == ''
      ? (element.innerText = 'No title')
      : (element.innerText = element.innerText.replace(/\n/g, ' ').trim()),
    console.log(element.innerText)
  )
}

function EditArtists(e: MouseEvent) {
  console.log('open artists menu')
}

function EditAlbum(e: MouseEvent) {
  console.log('open albums menu')
}
</script>
<template>
  <div
    class="flex flex-col text-white h-[350px] min-w-[250px] w-[250px] rounded-primary"
  >
    <div class="relative w-[250px] mb-4 min-h-[250px]">
      <div class="z-10 absolute w-[250px] h-[250px] rounded-primary overflow-hidden">
        <slot name="cover" />
      </div>
      <div class="z-10 absolute w-[250px] h-[250px]" v-on:dblclick="EditCover">
        <slot name="over-cover" />
      </div>
    </div>
    <div class="flex flex-col select-none">
      <div
        class="text-lg line-clamp-2 min-h-[28px] overflow-hidden text-ellipsis"
        v-on:dblclick="EditTitle"
      >
        <div
          class="select-text border-baccent outline-none min-h-[28px] transition-all text-ellipsis overflow-hidden"
          ref="titleSpan"
          v-on:dblclick="EditTitle"
        >
          {{ title }}
        </div>
      </div>
      <div class="flex relative gap-1" v-on:dblclick="EditArtists">
        <div class="flex w-full overflow-hidden">
          <Artists :noFeatured="noFeatured">
            <template #artists>
              <slot name="artists" />
            </template>

            <template #featured>
              <slot name="featured-artists" />
            </template>
          </Artists>
        </div>
        <div v-if="artistMenu">
          <ArtistMenu />
        </div>
        <div v-if="albumMenu">
          <AlbumMenu />
        </div>
      </div>
      <div class="flex gap-1 overflow-hidden" v-on:dblclick="EditAlbum">
        <slot name="album" />
      </div>
    </div>
  </div>
</template>
