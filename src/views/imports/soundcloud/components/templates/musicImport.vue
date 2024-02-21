<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Artists from '../artists.vue'
import AlbumMenu from '../albumSelectMenu/index.vue'
import ArtistMenu from '../artistSelectMenu/index.vue'
import XIcon from '@/components/icons/shadcn/x.vue';
import { useSoundcloudImport } from '@/stores/imports/soundcloud.ts'
const soundcloudStore = useSoundcloudImport();

type Props = { title: string, noFeatured?: boolean, id: string, disabledActions?: boolean }
const props = defineProps<Props>()

const menuToggled = ref<'artists' | 'albums' | null>(null)

const titleSpan = ref<HTMLDivElement>()
const artistWinListener = ref<(e: MouseEvent) => void>()
const albumWinListener = ref<(e: MouseEvent) => void>()

function EditCover() {
  if (props.disabledActions === true) return
  // TODO 
  console.log('edit cover')
}


onMounted(() => {
  if (props.disabledActions === true) return
  const titleElement = titleSpan.value;

  if (!titleElement) return

  titleElement.onfocus = () => {
    titleElement.style.borderBottom = '1px solid hsl(0, 0%, 50%, 0.5)'
    titleElement.style.whiteSpace = 'normal'
  }

  titleElement.onblur = () => {
    titleElement.style.borderBottom = ''
    titleElement.style.whiteSpace = 'nowrap'

    if (titleElement.innerText.trim() == '') {
      titleElement.innerText = 'No title'
    } else {
      titleElement.innerText = titleElement.innerText.replace(/\n/g, ' ').trim()
      soundcloudStore.updateTitle(props.id, titleElement.innerText);
    }
  }
})

function closeMenu(e: MouseEvent) {
  if (props.disabledActions === true) return
  menuToggled.value = null;
}

function editArtist(e: MouseEvent) {
  if (props.disabledActions === true) return
  if (e.type == 'contextmenu')
    e.preventDefault()

  menuToggled.value = 'artists'

  const findRoot = (item: HTMLElement): HTMLElement | null => {
    if (item.id == `artist-menu-item-close-${props.id}`) return null
    if (item.id == `artist-menu-item-${props.id}`) return item
    let parent = item.parentElement
    if (!parent) return null
    return findRoot(parent)
  }

  if (artistWinListener.value != null) return

  artistWinListener.value = (ce: MouseEvent) => {
    if (menuToggled.value != 'artists') return
    const root = findRoot(ce.target as HTMLElement);

    if (root != null)
      return;

    menuToggled.value = null;
  }

  window.addEventListener('click', artistWinListener.value)

}

function editAlbum(e: MouseEvent) {
  if (props.disabledActions === true) return
  if (e.type == 'contextmenu')
    e.preventDefault()

  menuToggled.value = 'albums'

  const findRoot = (item: HTMLElement): HTMLElement | null => {
    if (item.id == `album-menu-item-close-${props.id}`) return null
    if (item.id == `album-menu-item-${props.id}`) return item
    let parent = item.parentElement
    if (!parent) return null
    return findRoot(parent)
  }

  if (albumWinListener.value != null) return

  albumWinListener.value = (ce: MouseEvent) => {
    if (menuToggled.value != 'albums') return;
    const root = findRoot(ce.target as HTMLElement);

    if (root != null)
      return;

    menuToggled.value = null;
  }

  window.addEventListener('click', albumWinListener.value)
}

</script>
<template>
  <div class="flex flex-col text-white h-[350px] min-w-[250px] w-[250px] rounded-primary">
    <div class="relative w-[250px] mb-4 min-h-[250px]">
      <div class="z-10 absolute w-[250px] h-[250px] rounded-primary overflow-hidden">
        <slot name="cover" />
      </div>
      <div class="z-10 absolute w-[250px] h-[250px]" v-on:dblclick="EditCover">
        <slot name="over-cover" />
      </div>
    </div>
    <div class="flex flex-col select-none">
      <div class="text-lg line-clamp-2 min-h-[28px] overflow-hidden text-ellipsis">
        <div
          class="select-text border-baccent outline-none min-h-[28px] whitespace-nowrap transition-all text-ellipsis overflow-hidden"
          contenteditable="true" ref="titleSpan">
          {{ title }}
        </div>

      </div>
      <div :id="`artist-menu-item-${id}`" role="button" class="flex relative gap-1"
        :class="{ 'cursor-pointer': disabledActions === false || disabledActions === undefined }" v-on:click="editArtist">
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
        <div v-if="menuToggled == 'artists'">
          <ArtistMenu :id="id">
            <template #search-right-icon>
              <span :id="`artist-menu-item-close-${id}`"
                class="stroke-fsecondary hover:stroke-fprimary active:stroke-fprimary" role="button"
                v-on:click="closeMenu">
                <XIcon :size="24" color="defaultColor" />
              </span>
            </template>

          </ArtistMenu>
        </div>
      </div>
      <div :id="`album-menu-item-${id}`" :role="menuToggled == null ? 'button' : ''" class="flex gap-1 relative "
        :class="{ 'cursor-pointer': disabledActions === false || disabledActions === undefined }" v-on:click="editAlbum"
        v-on:contextmenu="editAlbum">
        <div class="flex overflow-hidden gap-2">
          <slot name="album" />
        </div>
        <div v-if="menuToggled == 'albums'">
          <AlbumMenu :id="id">
            <template #search-right-icon>
              <span :id="`album-menu-item-close-${id}`"
                class="stroke-fsecondary hover:stroke-fprimary active:stroke-fprimary" role="button"
                v-on:click="closeMenu">
                <XIcon :size="24" color="defaultColor" />
              </span>
            </template>
          </AlbumMenu>
        </div>
      </div>
    </div>
  </div>
</template>
