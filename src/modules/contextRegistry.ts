import { defineStore } from 'pinia'
import { Err, None, Ok, Result, Some } from 'ts-results'
import { reactive } from 'vue'
/* INFO:
 * Context engine defines an area of related musics that
 * when one starts playing the next and previous will be
 * obvious to the player.
 */

export class MusicContextList {
    constructor(public musics: Set<string> = new Set()) {}

    public add(musicId: string) {
        this.musics.add(musicId)
    }

    public append(musicList: Set<string>) {
        Array.from(musicList).map((musicId) => this.musics.add(musicId))
    }

    public delete(musicId: string) {
        this.musics.delete(musicId)
    }

    public has(musicId: string) {
        return this.musics.has(musicId)
    }
}

export const useContextRegistry = defineStore('contextRegistry', () => {
    const contextList = reactive(new Map<string, MusicContextList>())

    const createContext = (nameId?: string): Result<string, null> => {
        let id = crypto.randomUUID() as string
        if (nameId) id = nameId

        if (contextList.has(id)) return Err(null)

        contextList.set(id, new MusicContextList())
        return Ok(id)
    }

    const deleteContext = (contextId: string) => {
        return contextList.delete(contextId)
    }

    const getContext = (contextId: string) => {
        let musicContext = contextList.get(contextId)

        if (musicContext) return Some(musicContext)
        return None
    }

    /// Ensures it always exists
    const forContext = (contextId: string) => {
        let id = crypto.randomUUID() as string
        if (contextId) id = contextId

        const context = contextList.get(id)
        if (context) return context

        const newContext = new MusicContextList()
        contextList.set(id, newContext)

        return contextList.get(id)!
    }

    return {
        contextList,
        create: createContext,
        delete: deleteContext,
        get: getContext,
        for: forContext
    }
})
