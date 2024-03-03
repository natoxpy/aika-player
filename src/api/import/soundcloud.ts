import axios from 'axios'
import { API_LOCATION } from '../index'
import { type Music } from '..'

/* Type from Scloud */
export type ScloudTrack = {
    title: string
    url: string
    author: {
        avatar_url: string
        username: string
    }
    thumbnail: string
    duration: { secs: number }
    media: Array<{
        url: string
        preset: string
        duration: number
        snipped: boolean
        format: {
            protocol: string
            mime_type: string
        }
    }>
}

export class SoundcloudTrack {
    constructor(private track: ScloudTrack) {}
}

export type SoundcloudImport = {
    title: string
    image_id: string
    soundcloud_url: string
    artists_id: string[]
    featured_artists_id: string[]
    albums_id: string[]
}

export async function soundcloudImport(data: SoundcloudImport) {
    const res = await axios.post(`${API_LOCATION}/soundcloud/import`, data)
    return res.data as Music
}
