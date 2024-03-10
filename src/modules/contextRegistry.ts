import { defineStore } from 'pinia'
import { Err, None, Ok, Result, Some } from 'ts-results'
import { reactive } from 'vue'
/* INFO:
 * Context engine defines an area of related musics that
 * when one starts playing the next and previous will be
 * obvious to the player.
 */

export class MusicContextList {
    /* INFO:
     * The actual content will be saved to be restored later
     */
    private performBackups = false
    private backups: Array<Set<string>> = []

    constructor(public musics: Set<string> = new Set()) {}

    private saveState() {
        if (!this.performBackups) return
        if (this.backups.length > 2000) this.backups.shift()

        this.backups.push(new Set(this.musics))
    }

    public rollback(steps?: number): Result<null, null> {
        if (this.performBackups == false) return Err(null)
        if (steps == undefined) steps = this.backups.length

        if (steps <= 0) return Err(null)

        const rollbackMusic = this.backups.pop()

        if (!rollbackMusic) return Err(null)

        this.musics.clear()
        this.systemAppend(rollbackMusic)

        if (steps - 1 <= 0) return Ok(null)

        return this.rollback(steps - 1)
    }

    public enableRollbacks() {
        this.performBackups = true
    }

    public disableRollbacks() {
        this.backups = []
        this.performBackups = false
    }

    public add(musicId: string) {
        this.saveState()
        this.musics.add(musicId)
    }

    public append(musicList: Set<string>) {
        this.saveState()
        this.systemAppend(musicList)
    }

    private systemAppend(musicList: Set<string>) {
        Array.from(musicList).map((musicId) => this.musics.add(musicId))
    }

    public delete(musicId: string) {
        this.saveState()
        this.musics.delete(musicId)
    }

    public clear() {
        this.saveState()
        this.musics.clear()
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
