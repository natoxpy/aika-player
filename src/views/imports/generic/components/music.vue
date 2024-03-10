<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import MusicTemplate from '../templates/components/music.vue'
import CoverDropzone from './coverDropzone.vue'
import ArtistMenu from './artistMenu.vue'
import AlbumMenu from './albumMenu.vue'
import Cover from './cover.vue'
import { useMusicList } from '@/stores/imports/musics'
import { useImportMusic } from '@/stores/imports/import'
import { type Artist, useMappedArtistList } from '@/stores/imports/artists'
import * as Database from '@/stores/imports/database'
import { useMappedAlbumList } from '@/stores/imports/albums'

const props = defineProps<{ title: string; id: string }>()
const artistList = useMappedArtistList()
const albumList = useMappedAlbumList()
const importMusic = useImportMusic()

const mappedArtists = artistList.for(props.id)
const mappedAlbums = albumList.for(props.id)

const artists = ref<Artist[]>(Array.from(mappedArtists.getSet()))
const albums = ref<Database.Album[]>(Array.from(mappedAlbums.getSet()))

const titleSpan = ref<HTMLDivElement>()
const musicList = useMusicList()
const albumMenuState = ref(false)
const artistMenuState = ref(false)

watch([mappedArtists], () => {
    artists.value = Array.from(mappedArtists.getSet())
})

watch([mappedAlbums], () => {
    albums.value = Array.from(mappedAlbums.getSet())
})

onMounted(() => {
    const titleElement = titleSpan.value
    if (!titleElement) return

    titleElement.onblur = () => blur(titleElement)
    titleElement.onfocus = () => focus(titleElement)
})

function blur(element: HTMLDivElement) {
    element.style.borderBottomWidth = '0px'
    element.style.whiteSpace = 'nowrap'

    if (element.innerText.trim() == '') {
        element.innerText = 'No title'
    } else {
        element.innerText = element.innerText.replace(/\n/g, ' ').trim()
        let track = musicList.get(props.id)
        if (track.none) return

        track.val.title = element.innerText
    }
}

function focus(element: HTMLDivElement) {
    element.style.borderBottomWidth = '1px'
    element.style.whiteSpace = 'normal'
}

function getState() {
    if (importMusic.imported.findIndex((item) => item === props.id) !== -1) return 'imported'

    if (!importMusic.onGoing) return

    if (importMusic.importFail.findIndex((item) => item === props.id) !== -1) return 'failed'

    return 'loading'
}
</script>
<template>
    <MusicTemplate
        @artist-click="artistMenuState = true"
        @album-click="albumMenuState = true"
        :state="getState()"
        :id="id"
    >
        <template #title>
            <div class="text-lg line-clamp-2 min-h-[28px] overflow-hidden text-ellipsis">
                <div
                    class="text-text select-text border-surface1 outline-none max-h-[56px] transition-all text-ellipsis overflow-hidden whitespace-nowrap"
                    contenteditable="true"
                    ref="titleSpan"
                    :spellcheck="false"
                    role="textbox"
                >
                    {{ title }}
                </div>
            </div>
        </template>

        <template #cover>
            <Cover :music-id="id" />
        </template>

        <template #over-cover>
            <CoverDropzone :music-id="id"> </CoverDropzone>
        </template>

        <template #artist-list>
            <span
                class="text-surface2 italic"
                v-if="artists.filter((item) => item.featured == false).length === 0"
                >No artists</span
            >
            <span
                class="text-overlay1 overflow-hidden text-ellipsis whitespace-nowrap"
                v-for="artist of artists.filter((item) => item.featured == false)"
                >{{ artist.username }}</span
            >
        </template>

        <template #artist-separator>
            <div
                class="w-1 h-1 bg-lavender rounded-full"
                v-if="artists.filter((item) => item.featured == true).length !== 0"
            />
        </template>

        <template #artist-featured-list>
            <span
                class="text-overlay1 overflow-hidden text-ellipsis whitespace-nowrap"
                v-for="artist of artists.filter((item) => item.featured == true)"
                >{{ artist.username }}</span
            >
        </template>

        <template #artist-menu>
            <ArtistMenu
                :close="() => (artistMenuState = false)"
                :opened="artistMenuState"
                :id="id"
            />
        </template>

        <template #album-list>
            <span class="text-surface2 italic" v-if="albums.length == 0">No albums</span>
            <span
                class="text-overlay1 overflow-hidden text-ellipsis whitespace-nowrap"
                v-for="album of albums"
                >{{ album.name }}</span
            >
        </template>

        <template #album-menu>
            <AlbumMenu :close="() => (albumMenuState = false)" :opened="albumMenuState" :id="id" />
        </template>
    </MusicTemplate>
</template>
