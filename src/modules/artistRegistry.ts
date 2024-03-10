import { getArtists } from '@/api'
import { defineStore } from 'pinia'
import { Some, type Option, None } from 'ts-results'
import { reactive } from 'vue'

export type ArtistRecord = {
    name: string
    avatar?: string
}

export type QueryPredicate = (
    value: [string, ArtistRecord],
    index: number,
    array: Array<[string, ArtistRecord]>
) => boolean

export const useArtistRegistry = defineStore('artistRegistry', () => {
    const artistList = reactive(new Map<string, ArtistRecord>())

    const addRecord = (artistId: string, record: ArtistRecord) => {
        if (artistList.has(artistId)) return false
        artistList.set(artistId, record)
        return true
    }

    const getRecord = (artistId: string) => {
        let record = artistList.get(artistId)
        if (record) return Some(record)
        return None
    }

    const deleteRecord = (artistId: string) => {
        return artistList.delete(artistId)
    }

    const updateRecord = (artistId: string, record: ArtistRecord) => {
        if (!artistList.has(artistId)) return false
        artistList.set(artistId, record)
        return true
    }

    const queryRecord = (predicate: QueryPredicate) => {
        let arr = Array.from(artistList)
        return arr.filter(predicate)
    }

    const syncRecord = async () => {
        for (const artist of await getArtists()) {
            addRecord(artist.id, {
                name: artist.name,
                avatar: artist.avatar
            })
        }
    }

    return {
        artistList,
        add: addRecord,
        deletes: deleteRecord,
        get: getRecord,
        update: updateRecord,
        query: queryRecord,
        sync: syncRecord
    }
})
