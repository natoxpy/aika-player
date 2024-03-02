import { defineStore } from 'pinia'
import { MusicMapped, Range, ImageSource } from '.'
import * as Database from './database'
import { reactive, watch } from 'vue'
import Fuse from 'fuse.js'
import { getAlbumDefaultCover } from '@/api/crud/albums'

export class AlbumSearch {
    constructor(public albums = new Set<Database.Album>()) {}

    public static from(list: Database.AlbumList) {
        return new AlbumSearch(list.albums)
    }

    public push(album: Database.Album) {
        return new AlbumSearch(new Set(this.albums).add(album))
    }

    public append(artists: Set<Database.Album>) {
        const artistTempSet = new Set(this.albums)

        for (let artist of artists) {
            artistTempSet.add(artist)
        }

        return new AlbumSearch(artistTempSet)
    }

    public apply(callback: (data: Set<Database.Album>) => Set<Database.Album>) {
        return new AlbumSearch(callback(this.albums))
    }

    public static fussyFilter(patterns: string) {
        return (artists: Set<Database.Album>) => {
            const fuse = new Fuse(Array.from(artists), { keys: ['username'] })

            return new Set(fuse.search(patterns).map((result) => result.item))
        }
    }

    public static cut(range: Range) {
        return (artists: Set<Database.Album>) => {
            return new Set(Array.from(artists).splice(range.start, range.end))
        }
    }

    public static KeepOnTop(selected: Set<Database.Album>) {
        return (artists: Set<Database.Album>) => {
            return artists
        }
    }

    public static sortToTop(selected: Set<Database.Album>) {
        const has = (artist: Database.Album) =>
            Array.from(selected).findIndex((item) => item.id === artist.id) !== -1

        return (artists: Set<Database.Album>) => {
            return new Set(
                Array.from(artists).sort((a, b) => {
                    if (!has(a) && has(b)) return 1
                    if (has(a) && !has(b)) return -1
                    if (has(a) && has(b)) return 0

                    return 0
                })
            )
        }
    }
}

export const useMappedAlbumList = defineStore('importAlbumList', () => {
    const albumList = reactive(new MusicMapped<Database.AlbumList, Database.Album>())

    const forMusic = (musicId: string) => {
        let albums = albumList.get(musicId)
        if (albums.none) {
            let newAlbums = new Database.AlbumList()
            albumList.set(musicId, newAlbums)
            return albumList.get(musicId).unwrap()
        }

        return albums.val
    }

    return {
        array: albumList.array,
        for: forMusic,
        /**
         * TODO: This is not protected and it depends on the User to be used well
         */
        hasById: (musicId: string, albumId: string) => {
            let albums = forMusic(musicId)

            return albums.hasById(albumId)
        },

        add: (musicId: string, name: string) => {
            const albums = forMusic(musicId)

            let album = Database.Album.from({
                id: crypto.randomUUID(),
                name,
                cover: Database.Cover.from('', getAlbumDefaultCover())
            })

            // TODO: make this easier by handling it behind an API
            albumList.add(album)
            albums.add(album)
            albumList.set(musicId, albums)
        },

        search: (musicId: string, query: string) => {
            let albums = new Set(albumList.array)

            Database.useAlbumList()
                .getArray()
                .forEach((item) => albums.add(Database.Album.from(item)))

            const mappedAlbums = forMusic(musicId)
            let artistSearch = new AlbumSearch(albums)
            if (query.trim() == '') artistSearch.apply(AlbumSearch.fussyFilter(query))

            return artistSearch
                .apply(AlbumSearch.sortToTop(mappedAlbums.getSet()))
                .apply(AlbumSearch.cut(Range.from(0).to(4 + mappedAlbums.getSet().size))).albums
        },

        selectAlbum: (musicId: string, artistId: string) => {
            const artists = Array.from(albumList.array)

            Database.useAlbumList()
                .getArray()
                .forEach((item) => artists.push(Database.Album.from(item)))

            const artist = artists.find((item) => item.id == artistId)

            const mappedArtist = albumList.get(musicId)
            let albumMappedSet: Database.AlbumList

            if (mappedArtist.none) {
                albumMappedSet = new Database.AlbumList()
                albumList.set(musicId, albumMappedSet)
            } else albumMappedSet = mappedArtist.val

            if (artist == undefined) return

            if (albumMappedSet.getById(artistId).some) return console.log('PT')

            albumMappedSet.add(Database.Album.from(artist))
            albumList.set(musicId, albumMappedSet)
        },
        deselectAlbum: (musicId: string, artistId: string) => {
            const mappedAlbum = albumList.get(musicId)
            if (mappedAlbum.none) return

            const artist = mappedAlbum.val.getById(artistId)
            if (artist.none) return

            mappedAlbum.val.delete(artist.val)
        }
    }
})
