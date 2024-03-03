import { defineStore } from 'pinia'
import { None, Some, type Option } from 'ts-results'
import { computed, reactive } from 'vue'
import { ImageSource } from '../soundcloud/index'
import * as MappedArtistList from '../artists'
import { getArtists } from '@/api'
import { getAvatar } from '@/api/crud/artists'

export class Avatar {
    constructor(
        public id: string,
        public image: ImageSource
    ) {}

    /** TODO: Put fileId into proper format to access CDN */
    public static from(avatarId: string, _avatarFileId: string) {
        return new Avatar(avatarId, new ImageSource(_avatarFileId))
    }
}

export class Artist {
    constructor(
        public id: string,
        public name: string,
        public avatar: Avatar
    ) {}

    public static from(data: { id: string; name: string; avatar: Avatar }) {
        return new Artist(data.id, data.name, data.avatar)
    }
}

export class ArtistList {
    public artists: Set<Artist> = new Set()

    public find(predicate: (value: Artist, index: number) => boolean): Option<Artist> {
        let result = Array.from(this.artists).find(predicate)
        if (result) return Some(result)
        return None
    }

    public async load() {
        let artists = []

        for (let artist of await getArtists()) {
            const avatar = await getAvatar(artist.id)

            artists.push(
                Artist.from({
                    id: artist.id,
                    name: artist.name,
                    avatar: Avatar.from('', avatar)
                })
            )
        }

        this.artists = new Set(artists)
    }
}

export const useArtistList = defineStore('databaseArtistList', () => {
    const artistList = reactive(new ArtistList())
    artistList.load()

    return {
        artistList,
        getArray: () => Array.from(artistList.artists),
        get: (artist: string | MappedArtistList.Artist | Artist): Option<Artist> => {
            let artistId: string | undefined = undefined

            if (typeof artist == 'string') artistId = artist

            if (artist instanceof MappedArtistList.Artist || artist instanceof Artist)
                artistId = artist.id

            if (artistId === null) return None

            return artistList.find((value) => value.id === artistId)
        }
    }
})
