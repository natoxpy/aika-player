import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ImageSource } from './'
import { None, Some } from 'ts-results'
import { MusicMapped, Range } from './'
import Fuse from 'fuse.js'
import * as Database from './database/artists'
import { getDefaultAvatar } from '@/api/crud/artists'

/**
 * Where the artist comes from
 */
type ArtistData = {
    id: string
    username: string
    avatar: ImageSource
    featured: boolean
}

export class Order {
    constructor(public name: 'ascending' | 'descending') {}
    public static get Ascending() {
        return new Order('ascending')
    }
    public static get Descending() {
        return new Order('descending')
    }

    public isAscending() {
        return this.name == 'ascending'
    }

    public isDescending() {
        return this.name == 'descending'
    }

    public compare<T>(a: T, b: T): number {
        if (this.isAscending()) {
            if (a > b) return 1
            else if (a < b) return -1
        } else if (this.isAscending()) {
            if (a < b) return 1
            else if (a > b) return -1
        }

        return 0
    }
}

export class Artist {
    constructor(
        public id: string,
        public username: string,
        public avatar: ImageSource,
        public featured: boolean
    ) {}

    public static from(data: ArtistData | Database.Artist) {
        if (data instanceof Database.Artist) {
            return new Artist(data.id, data.name, data.avatar.image, false)
        }

        return new Artist(data.id, data.username, data.avatar, data.featured)
    }

    public static sortBy(field: keyof ArtistData, order: Order) {
        return (artists: Set<Artist>) => {
            let array = Array.from(artists)
            array.sort((a, b) => order.compare(a[field], b[field]))

            return new Set(array)
        }
    }
}

export class ArtistSearch {
    constructor(public artists = new Set<Artist>()) {}

    public static from(list: ArtistList) {
        return new ArtistSearch(list.getSet())
    }

    public push(artist: Artist) {
        return new ArtistSearch(new Set(this.artists).add(artist))
    }

    public append(artists: Set<Artist>) {
        const artistTempSet = new Set(this.artists)

        for (let artist of artists) {
            artistTempSet.add(artist)
        }

        return new ArtistSearch(artistTempSet)
    }

    public apply(callback: (data: Set<Artist>) => Set<Artist>) {
        return new ArtistSearch(callback(this.artists))
    }

    public static fussyFilter(patterns: string) {
        return (artists: Set<Artist>) => {
            const fuse = new Fuse(Array.from(artists), { keys: ['username'] })

            return new Set(fuse.search(patterns).map((result) => result.item))
        }
    }

    public static sortByFeatured() {
        return (artists: Set<Artist>) => {
            let sortedArtists = Array.from(artists).sort((a, b) => {
                if (!a.featured && b.featured === true) return -1
                if (a.featured === true && !b.featured) return 1
                return 0
            })

            return new Set(sortedArtists)
        }
    }

    public static cut(range: Range) {
        return (artists: Set<Artist>) => {
            return new Set(Array.from(artists).splice(range.start, range.end))
        }
    }

    public static KeepOnTop(selected: Set<Artist>) {
        return (artists: Set<Artist>) => {
            return artists
        }
    }

    public static sortToTop(selected: Set<Artist>) {
        const has = (artist: Artist) =>
            Array.from(selected).findIndex((item) => item.id === artist.id) !== -1

        return (artists: Set<Artist>) => {
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

export class ArtistList {
    private artists = new Set<Artist>()

    public getSet() {
        return this.artists
    }

    public getById(artistId: string) {
        const artist = Array.from(this.artists).find((item) => item.id === artistId)
        if (artist === undefined) return None
        return Some(artist)
    }

    public hasById(artistId: string) {
        const artist = Array.from(this.artists).find((item) => item.id === artistId)
        if (artist === undefined) return false
        return true
    }

    public has(artist: Artist) {
        return this.artists.has(artist)
    }

    public add(artist: Artist) {
        this.artists.add(artist)
    }

    public delete(artist: Artist) {
        this.artists.delete(artist)
    }
}

/// TODO: will contain artists fetched from database
export const useMappedArtistList = defineStore('importArtistList', () => {
    const artistList = reactive(new MusicMapped<ArtistList, Artist>())

    const forMusic = (musicId: string) => {
        let artists = artistList.get(musicId)
        if (artists.none) {
            let newArtists = new ArtistList()
            artistList.set(musicId, newArtists)
            return artistList.get(musicId).unwrap()
        }

        return artists.val
    }

    return {
        array: artistList.array,
        artistList,
        getByName: (musicId: string, name: string) => {
            let artists = Array.from(artistList.array)

            Database.useArtistList()
                .getArray()
                .forEach((item) => artists.push(Artist.from(item)))

            let artist = artists.find((item) => item.username === name)
            if (artist) return Some(artist)
            return None
        },

        add: (musicId: string, name: string) => {
            const artists = forMusic(musicId)

            let album = Artist.from({
                id: crypto.randomUUID(),
                username: name,
                avatar: ImageSource.fromUrl(new URL(getDefaultAvatar())),
                featured: false
            })

            // TODO: make this easier by handling it behind an API
            artistList.add(album)
            artists.add(album)
            artistList.set(musicId, artists)
        },

        getById: (musicId: string, artistId: string) => {
            let artists = forMusic(musicId)
            return artists.getById(artistId)
        },
        hasById: (musicId: string, artistId: string) => {
            let artists = forMusic(musicId)

            return artists.hasById(artistId)
        },
        search: (musicId: string, query: string) => {
            let artists = new Set(artistList.array)

            Database.useArtistList()
                .getArray()
                .forEach((item) => artists.add(Artist.from(item)))

            const mappedArtists = artistList.get(musicId).unwrap()

            let artistSearch = new ArtistSearch(artists)
            if (query.trim() == '')
                return artistSearch
                    .apply(Artist.sortBy('featured', Order.Ascending))
                    .apply(ArtistSearch.sortToTop(mappedArtists.getSet()))
                    .apply(ArtistSearch.cut(Range.from(0).to(4 + mappedArtists.getSet().size)))
                    .artists

            return artistSearch
                .apply(ArtistSearch.fussyFilter(query))
                .apply(Artist.sortBy('featured', Order.Ascending))
                .apply(ArtistSearch.sortToTop(mappedArtists.getSet()))
                .apply(ArtistSearch.cut(Range.from(0).to(4 + mappedArtists.getSet().size))).artists
        },

        for: forMusic,

        selectArtist: (musicId: string, artistId: string) => {
            const artists = Array.from(artistList.array)

            Database.useArtistList()
                .getArray()
                .forEach((item) => artists.push(Artist.from(item)))

            const artist = artists.find((item) => item.id == artistId)

            const mappedArtist = artistList.get(musicId)
            let artistMappedSet: ArtistList

            if (mappedArtist.none) {
                artistMappedSet = new ArtistList()
                artistList.set(musicId, artistMappedSet)
            } else artistMappedSet = mappedArtist.val

            if (artist == undefined) return

            if (artistMappedSet.getById(artistId).some) return console.log('PT')

            artistMappedSet.add(Artist.from(artist))
            artistList.set(musicId, artistMappedSet)
        },

        deselectArtist: (musicId: string, artistId: string) => {
            const mappedArtist = artistList.get(musicId)
            if (mappedArtist.none) return

            const artist = mappedArtist.val.getById(artistId)
            if (artist.none) return

            mappedArtist.val.delete(artist.val)
        },

        addArtist: (musicId: string, artist: Artist) => {
            let artists = forMusic(musicId)
            artists.add(artist)
            artistList.set(musicId, artists)
        }
    }
})
