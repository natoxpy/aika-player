import { defineStore } from 'pinia'
import { None, Some } from 'ts-results'
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

export const useMusicContext = defineStore('musicContext', () => {
    const contextList = reactive(new Map<string, MusicContextList>())

    const createContext = () => {
        let id = crypto.randomUUID()
        contextList.set(id, new MusicContextList())
        return id
    }

    const deleteContext = (contextId: string) => {
        return contextList.delete(contextId)
    }

    const forContext = (contextId: string) => {
        let musicContext = contextList.get(contextId)

        if (musicContext) return Some(musicContext)
        return None
    }

    return {
        create: createContext,
        delete: deleteContext,
        for: forContext
    }
})
