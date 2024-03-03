import { defineStore } from 'pinia'
import { None, Some, type Result, type Option, Err } from 'ts-results'
import { reactive, ref, watch } from 'vue'
import { fetchSoundcloudTrack, type SoundcloudTrack } from '../api/import'
import { useImageMap } from './images'
import { ImageSource } from '.'
import { useMappedArtistList } from './artists.ts'

export class Music {
    constructor(
        public id: string,
        public title: string,
        public source: string
    ) {}

    public static from(data: { id: string; title: string; source: string }) {
        return new Music(data.id, data.title, data.source)
    }
}

export class MusicList {
    // public musics = new Set<Music>()
    public musics: Music[] = []

    public getSet() {
        return this.musics
    }

    public asArray() {
        return Array.from(this.musics)
    }

    public delete(music: Music) {
        // return this.musics.delete(music)
    }

    public add(music: Music) {
        this.musics.push(music)
    }

    public get(musicId: string) {
        const music = this.asArray().find((music) => music.id === musicId)
        if (music) return Some(music)
        return None
    }

    public async addSoundcloudUrl(url: URL): Promise<Result<SoundcloudTrack, string>> {
        try {
            let track = await fetchSoundcloudTrack(url)
            if (track.none) return Err('')
            let imageMap = useImageMap()
            let artistList = useMappedArtistList()

            let artistName = track.val.author.username

            const musicId = crypto.randomUUID()

            this.add(
                Music.from({
                    id: musicId,
                    title: track.val.title,
                    source: track.val.url
                })
            )

            let artist = artistList.getByName(musicId, artistName)

            if (artist.some) artistList.selectArtist(musicId, artist.val.id)
            else artistList.add(musicId, artistName)

            let coverUrl = new URL(track.val.artwork.original)
            imageMap.set(musicId, ImageSource.fromUrl(coverUrl))

            return Err('')
        } catch {
            return Err('')
        }
    }

    public async addFromLink(url: URL) {
        if (['soundcloud.com'].includes(url.hostname)) return await this.addSoundcloudUrl(url)
        return None
    }
}

export const useMusicList = defineStore('importMusicList', () => {
    const musicList = reactive(new MusicList())
    const loadingTotal = ref(0)

    const size = ref(0)

    watch([musicList.musics], () => (size.value = musicList.musics.length))

    return {
        list: musicList,
        size,
        musics: musicList.musics,
        loadingTotal: loadingTotal,

        get(musicId: string): Option<Music> {
            return musicList.get(musicId)
        },

        addFromLink: async (url: URL) => {
            loadingTotal.value++
            await musicList.addFromLink(url)

            loadingTotal.value--
        }
    }
})
