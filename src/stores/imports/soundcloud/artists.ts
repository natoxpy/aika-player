import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { ImageSource } from '.'
import { Some } from 'ts-results'
import { MusicMapped } from './musics'
import Fuse from 'fuse.js'

export class Range {
    constructor(
        public start: number,
        public end: number
    ) {}

    public static from(start: number) {
        return new Range(start, start)
    }

    public to(end: number) {
        return new Range(this.start, end)
    }
}

/**
 * Where the artist comes from
 */
type ArtistData = {
    id: string
    username: string
    avatar: ImageSource
    featured: boolean
}

class Order {
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

    public from(data: ArtistData) {
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
            return new Set(Array.from(artists).splice(range.start, artists.size - range.end))
        }
    }
}

export class ArtistList {
    private artists = new Set<Artist>()

    public getSet() {
        return this.artists
    }

    public add(artist: Artist) {
        this.artists.add(artist)
    }

    public search(query: string) {
        return (
            ArtistSearch.from(this)
                .apply(ArtistSearch.fussyFilter(query))
                // HACK: Old
                //.apply(ArtistSearch.sortByFeatured())
                //.apply(ArtistSearch.sortByOrigin())
                // HACK: new
                .apply(Artist.sortBy('featured', Order.Ascending))
                //.apply(Artist.sortBy('origin', Order.Descending))

                .apply(ArtistSearch.cut(Range.from(0).to(5)))
        )
    }
}

/// TODO: will contain artists fetched from database
export const useMappedArtistList = defineStore('soundcloudImportArtistList', () => {
    const mappedArtistList = reactive(new MusicMapped<ArtistList>())

    return {
        /** awa */
        // artists: mappedArtistList.getData(),
        /** awa */
        for: (musicId: string) => {
            let artists = mappedArtistList.get(musicId).unwrap()
            return Some(artists.getSet())
        },
        addArtist: (musicId: string, artist: Artist) => {
            let arts = mappedArtistList.get(musicId).unwrap()
            arts.add(artist)
            mappedArtistList.set(musicId, arts)
        }
    }
})
