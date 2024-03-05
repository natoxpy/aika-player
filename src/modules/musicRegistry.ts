import { defineStore } from 'pinia'
import { None, Some } from 'ts-results'
import { reactive } from 'vue'

/*INFO:
 * Music Registry Contains a list of all musics the client its
 * has requested from the server to view.
 */

export type MusicRecord = {
    title: string
    audio: string
    cover: string
    artists: Set<string>
    featuredArtists: Set<string>
    albums: Set<string>
}

export type QueryPredicate = (
    value: [string, MusicRecord],
    index: number,
    array: Array<[string, MusicRecord]>
) => boolean

export class RecordQueries {
    public static id(musicId: string): QueryPredicate {
        return (item) => item[0] == musicId
    }

    public static idSet(musicIdSet: Set<string>): QueryPredicate {
        return (item) => musicIdSet.has(item[0])
    }
}

export const useMusicRegistry = defineStore('musicContext', () => {
    const musicList = reactive(new Map<string, MusicRecord>())

    const addRecord = (musicId: string, record: MusicRecord) => {
        if (musicList.has(musicId)) return false
        musicList.set(musicId, record)
        return true
    }

    const getRecord = (musicId: string) => {
        let record = musicList.get(musicId)
        if (record) return Some(record)
        return None
    }

    const deleteRecord = (musicId: string) => {
        return musicList.delete(musicId)
    }

    const updateRecord = (musicId: string, record: MusicRecord) => {
        if (!musicList.has(musicId)) return false
        musicList.set(musicId, record)
        return true
    }

    const queryRecord = (predicate: QueryPredicate) => {
        let arr = Array.from(musicList)
        return arr.filter(predicate)
    }

    return {
        add: addRecord,
        delete: deleteRecord,
        get: getRecord,
        update: updateRecord,
        query: queryRecord
    }
})
