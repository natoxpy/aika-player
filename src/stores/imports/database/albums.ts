import { getAlbums } from '@/api/crud/albums'
import { ImageSource, MusicMapped } from '..'
import { getCover } from '@/stores/api'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { None, Some, type Option } from 'ts-results'

export class Cover {
    constructor(
        public id: string,
        public image: ImageSource
    ) {}

    /** TODO: Put fileId into proper format to access CDN */
    public static from(coverId: string, coverFileId: string) {
        return new Cover(coverId, new ImageSource(coverFileId))
    }
}

export class Album {
    constructor(
        public id: string,
        public name: string,
        public cover: Cover
    ) {}

    public static from(data: { id: string; name: string; cover: Cover }) {
        return new Album(data.id, data.name, data.cover)
    }
}

export class AlbumList {
    public albums: Set<Album> = new Set()

    public find(predicate: (value: Album, index: number) => boolean): Option<Album> {
        let result = Array.from(this.albums).find(predicate)
        if (result) return Some(result)
        return None
    }

    public add(album: Album) {
        this.albums.add(album)
    }

    public delete(album: Album) {
        this.albums.delete(album)
    }

    public getById(albumId: string) {
        const album = Array.from(this.albums).find((item) => item.id === albumId)
        if (album === undefined) return None
        return Some(album)
    }

    public hasById(albumId: string) {
        const album = Array.from(this.albums).find((item) => item.id === albumId)
        if (album === undefined) return false
        return true
    }

    public getSet() {
        return this.albums
    }

    public async load() {
        let albums = []

        for (let artist of await getAlbums()) {
            const cover = await getCover(artist.id)

            albums.push(
                Album.from({
                    id: artist.id,
                    name: artist.name,
                    cover: Cover.from('', cover)
                })
            )
        }

        this.albums = new Set(albums)
    }
}

export const useAlbumList = defineStore('databaseAlbumList', () => {
    const albumList = reactive(new AlbumList())
    albumList.load()

    return {
        albumList,
        getArray: () => Array.from(albumList.albums),
        get: (album: string | Album): Option<Album> => {
            let albumId: string | undefined = undefined

            if (typeof album == 'string') albumId = album
            if (album instanceof Album) albumId = album.id

            if (albumId === null) return None

            return albumList.find((value) => value.id === albumId)
        }
    }
})
