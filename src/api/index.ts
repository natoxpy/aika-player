import axios from 'axios'
import { type ArtistWithFeaturedResponse } from './crud/artists.ts'
import { None, Option, Some } from 'ts-results'
export { getImage, createImage } from './crud/images.ts'
export { getAudio, createAudio } from './crud/audios.ts'
export { getArtists, createArtist } from './crud/artists.ts'
export { uploadFromArrayBuffer, uploadFromUrl } from './fs/upload.ts'
export { getAlbums, createAlbum } from './crud/albums.ts'
export { soundcloudImport } from './import/soundcloud.ts'

export const API_LOCATION = 'http://[::1]:8000'

export type MusicResponse = {
    name: string
    id: string
}

export type File = {
    id: string
    location: string
    size: number
    mime: string
    name: string
}

export type MusicArtist = {
    id: string
    music: string
    artist: string
    featured: boolean
}

export class Music {
    constructor(
        public name: string,
        public id: string
    ) {}

    public async getCover(): Promise<string> {
        const res = await axios.get<{ file_id: string }>(
            `${API_LOCATION}/db/musics/${this.id}/cover`
        )

        if (res.status === 200) {
            return wrapFileId(res.data.file_id)
        }

        return DEFAULT_IMAGE_FILE
    }

    public async getAudio(): Promise<Option<string>> {
        const res = await axios.get<{ file_id: string }>(
            `${API_LOCATION}/db/musics/${this.id}/audio`
        )

        if (res.status === 200) return Some(wrapFileId(res.data.file_id))

        return None
    }

    public async getArtists(): Promise<Option<Array<ArtistWithFeaturedResponse>>> {
        const res = await axios.get<Array<ArtistWithFeaturedResponse>>(
            `${API_LOCATION}/db/musics/${this.id}/artists`
        )

        if (res.status == 200) return Some(res.data)

        return None
    }

    public async getAlbums() {}
}

/**
 * Returns all musics
 */
export async function getMusics() {
    const res = await axios.get<Array<MusicResponse>>(`${API_LOCATION}/db/musics/`)
    return res.data.map((music) => new Music(music.name, music.id))
}

export async function getMusicAudio(musicId: string) {
    const res = await fetch(`${API_LOCATION}/db/musics/${musicId}/audio`)
    if (res.status === 204) return

    return (await res.json()) as { file_id: string }
}

export async function getMusicArtist(_artist_id: string): Promise<MusicArtist> {
    return { id: '', music: '', artist: '', featured: false }
}

/**
 * uri to cover cdn endpoint
 */
export async function getCover(image_id: string) {
    const res = await fetch(`${API_LOCATION}/db/musics/${image_id}/cover`)

    if (res.status === 200) {
        const data: { file_id: string } = await res.json()
        return `${API_LOCATION}/cdn/${data.file_id}`
    }

    return DEFAULT_IMAGE_FILE
}

export function wrapFileId(id: string) {
    return `${API_LOCATION}/cdn/${id}`
}

export const DEFAULT_IMAGE_FILE = `${API_LOCATION}/cdn/0b892f58-584d-45a0-9a34-818159b32565`
