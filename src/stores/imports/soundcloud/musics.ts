import { None, Some, type Option } from 'ts-results'

export class MusicMapped<T> {
    public data = new Map<string, T>()

    public getData() {
        return this.data
    }

    public get(musicId: string): Option<T> {
        let mappedSet = this.data.get(musicId)
        if (!mappedSet) return None
        return Some(mappedSet)
    }

    public set(musicId: string, data: T) {
        this.data.set(musicId, data)
    }

    public clean() {
        this.data.clear()
    }
}
