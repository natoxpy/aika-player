import axios from 'axios'
import { None, Some, type Option } from 'ts-results'

export const API_LOCATION = 'http://[::1]:8000'

export type SoundcloudArtwork = {
    url: string
    original: string
    base: string
    extension: string
}

export type SoundcloudMedia = {
    url: string
    preset: string
    duration: number
    snipeed: boolean
    format: {
        protocol: string
        mime_type: string
    }
}

export type SoundcloudTrack = {
    title: string
    url: string
    artwork: SoundcloudArtwork
    author: {
        username: string
        artwork: SoundcloudArtwork
    }
    duration: {
        secs: number
        nanos: number
    }
    media: Array<SoundcloudMedia>
}

export async function fetchSoundcloudTrack(url: URL): Promise<Option<SoundcloudTrack>> {
    console.log(`${API_LOCATION}/soundcloud/metadata/${encodeURIComponent(url.toString())}`)

    let response = await axios.get(
        `${API_LOCATION}/soundcloud/metadata/${encodeURIComponent(url.toString())}`
    )

    if (response.status !== 200) return None

    return Some(response.data as any)
}
