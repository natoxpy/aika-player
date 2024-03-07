import axios from 'axios'
import { API_LOCATION, DEFAULT_IMAGE_FILE } from '..'

export type ArtistResponse = {
    id: string
    name: string
    avatar?: string
}

export type ArtistWithFeaturedResponse = {
    id: string
    name: string
    avatar?: string
    featured: boolean
}

export async function getArtists(): Promise<ArtistResponse[]> {
    const res = await axios.get(`${API_LOCATION}/db/artists/`)
    return res.data as ArtistResponse[]
}

export async function getArtist(artist_id: string): Promise<ArtistResponse> {
    const res = await axios.get(`${API_LOCATION}/db/artists/${artist_id}`)
    return res.data as ArtistResponse
}

export async function createArtist(name: string): Promise<ArtistResponse> {
    const res = await axios.post(`${API_LOCATION}/db/artists/`, {
        name
    })

    return res.data as ArtistResponse
}

export async function getAvatar(artist_id: string) {
    const res = await fetch(`${API_LOCATION}/db/artists/${artist_id}/avatar`)

    if (res.status === 200) {
        const data: { file_id: string } = await res.json()
        return `${API_LOCATION}/cdn/${data.file_id}`
    }

    return getDefaultAvatar()
}

export function getDefaultAvatar() {
    return DEFAULT_IMAGE_FILE
}
