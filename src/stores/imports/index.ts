import { None, Some, type Option } from 'ts-results'

export class ImageSource {
    constructor(
        public url: string,
        public arrayBuffer?: ArrayBuffer
    ) {}

    public static fromUrl(url: URL): ImageSource {
        return new ImageSource(url.toString(), undefined)
    }

    public static fromBuffer(arrayBuffer: ArrayBuffer): ImageSource {
        let blob = new Blob([arrayBuffer])
        let url = URL.createObjectURL(blob)

        return new ImageSource(url, arrayBuffer)
    }
}

export class MusicMapped<T, K> {
    public data = new Map<string, T>()
    public array = new Set<K>()

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

    public add(data: K) {
        this.array.add(data)
    }

    public clean() {
        this.data.clear()
        this.array.clear()
    }
}

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
