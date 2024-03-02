import * as API from '@/api/index'
import { defineStore } from 'pinia'
import { useMusicList } from './musics'
import { useMappedArtistList } from './artists'
import { useMappedAlbumList } from './albums'
import { useImageMap } from './images'
import * as Database from './database'
import { reactive, ref } from 'vue'

export const useImportMusic = defineStore('importMusic', () => {
    const imported = ref<String[]>([])
    const importFail = ref<String[]>([])
    const processed = reactive(new Set())
    const onGoing = ref(false)

    const startAll = async () => {
        const musicList = useMusicList()
        const artistList = useMappedArtistList()
        const albumList = useMappedAlbumList()
        const imageList = useImageMap()
        const dbArtistList = Database.useArtistList()
        const dbAlbumList = Database.useAlbumList()

        const musics = musicList.list.musics
        const records = []

        for (const music of musics) {
            if (processed.has(music.id)) continue

            let artists = Array.from(artistList.for(music.id).getSet())
            let albums = Array.from(albumList.for(music.id).getSet())

            const cover = imageList.get(music.id).unwrap()

            const createArtist = artists.filter((item) => dbArtistList.get(item.id).none)
            artists = artists.filter((item) => !dbArtistList.get(item.id).none)

            const createAlbum = albums.filter((item) => dbAlbumList.get(item.id).none)
            albums = albums.filter((item) => !dbAlbumList.get(item).none)

            records.push({
                id: music.id,
                title: music.title,
                url: music.source,
                artists,
                albums,
                createArtist,
                createAlbum,
                cover
            })
        }

        for (const record of records) {
            try {
                const title = record.title
                const artists_id = record.artists
                    .filter((item) => !item.featured)
                    .map((item) => item.id)
                const featured_artists_id = record.artists
                    .filter((item) => item.featured)
                    .map((item) => item.id)

                const albums_id = record.albums.map((item) => item.id)
                const soundcloud_url = record.url
                let image_id = ''

                if (record.cover.arrayBuffer) {
                    const file = await API.uploadFromArrayBuffer(record.cover.arrayBuffer)
                    const image = await API.createImage(file.id)
                    image_id = image.id
                } else {
                    const file = await API.uploadFromUrl(record.cover.url)
                    const image = await API.createImage(file.id)
                    image_id = image.id
                }

                for (const createArtist of record.createArtist) {
                    const artist = await API.createArtist(createArtist.username)
                    artists_id.push(artist.id)
                }

                for (const createAlbum of record.createAlbum) {
                    const album = await API.createAlbum(createAlbum.name)
                    albums_id.push(album.id)
                }

                await API.soundcloudImport({
                    title,
                    artists_id,
                    featured_artists_id,
                    albums_id,
                    soundcloud_url,
                    image_id
                })
                imported.value.push(record.id)
            } catch (e) {
                console.log(e)
                importFail.value.push(record.id)
            }

            processed.add(record.id)
        }
    }

    return {
        onGoing,
        imported,
        importFail,
        processed,

        startAll: async () => {
            onGoing.value = true
            await startAll()

            onGoing.value = false
        }
    }
})
