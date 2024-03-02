export { getImage, createImage } from './crud/images.ts'
export { getAudio, createAudio } from './crud/audios.ts'
export { getArtists, createArtist } from './crud/artists.ts'
export { uploadFromArrayBuffer, uploadFromUrl } from './fs/upload.ts'
export { getAlbums, createAlbum } from './crud/albums.ts'
export { soundcloudImport } from './import/soundcloud.ts'

export const API_LOCATION = 'http://[::1]:8000'

export type Music = {
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

/**
 * Returns all musics
 */
export async function getMusics() {
    const res = await fetch(`${API_LOCATION}/db/musics/`)
    return (await res.json()) as Array<Music>
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
 * @returns {string} uri to cover cdn endpoint
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
