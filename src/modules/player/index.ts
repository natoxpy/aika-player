import { defineStore } from 'pinia'
import { Err, None, Ok, Option, Result, Some } from 'ts-results'
import { reactive, ref, watch, type Ref } from 'vue'
import * as ContextRegistry from '../contextRegistry'
import { useMusicRegistry, type MusicRecord } from '../musicRegistry'
import { useAudioProvider } from '../audio'

export class Player {
    constructor(
        private musicList: Set<string>,
        private cursor: Option<string>,
        private contextId: Option<string> = None
    ) {}

    public getMusicList() {
        return this.musicList
    }

    public getCursor() {
        return this.cursor
    }

    public cursorEq(rhs: string): boolean {
        const cursor = this.getCursor()

        if (cursor.none) return false

        return cursor.val == rhs
    }

    public getContextId() {
        return this.contextId
    }

    public setCursor(musicId: string): Result<null, null> {
        if (!this.musicList.has(musicId)) return Err(null)

        this.cursor = Some(musicId)
        return Ok(null)
    }

    public setContext(contextId: string): Result<null, null> {
        const contextRegistry = ContextRegistry.useContextRegistry()
        const musicContext = contextRegistry.get(contextId)

        if (musicContext.none) return Err(null)

        this.setFrom(musicContext.val)

        return Ok(null)
    }

    public has(musicId: string) {
        return this.musicList.has(musicId)
    }

    private setFrom(data: ContextRegistry.MusicContextList): Result<null, null> {
        if (data instanceof ContextRegistry.MusicContextList) {
            let cursor = data.musics.values().next().value as string | undefined
            if (!cursor) return Err(null)

            this.cursor = Some(cursor)

            Array.from(this.musicList.values()).map((item) => this.musicList.delete(item))
            Array.from(data.musics).map((item) => this.musicList.add(item))

            return Ok(null)
        }

        return Err(null)
    }

    public static from(data: ContextRegistry.MusicContextList): Result<Player, null> {
        if (data instanceof ContextRegistry.MusicContextList) {
            let cursor = data.musics.values().next().value as string | undefined
            if (!cursor) return Err(null)

            return Ok(new Player(data.musics, Some(cursor)))
        }

        return Err(null)
    }
}

function onUpdateCursor(player: Player, cursor: string) {
    const musicRegistry = useMusicRegistry()
    const music = musicRegistry.get(cursor)
    if (music.none) return

    const audioProvider = useAudioProvider()

    audioProvider.setSrc(music.val.audio)
}

function onMusicFinish(player: Player, cursor: string) {
    console.log('play next')
}

export const usePlayerManager = defineStore('playerManager', () => {
    const cursorShadow = ref()
    const player = reactive(new Player(new Set(), None))

    const audioProvider = useAudioProvider()

    watch([player], () => {
        if (cursorShadow.value == player.getCursor()) return
        cursorShadow.value = player.getCursor()
        const cursor = player.getCursor()

        if (player instanceof Player && cursor.some && player.has(cursor.val)) {
            onUpdateCursor(player, cursor.val)
        }
    })

    watch([audioProvider], () => {
        if (audioProvider.duration != audioProvider.currentTime) return

        const cursor = player.getCursor()

        if (!(player instanceof Player && cursor.some && player.has(cursor.val))) return

        onMusicFinish(player, cursor.val)
    })

    const play = (musicId: string) => {
        return player.setCursor(musicId)
    }

    const playFromContext = (musicId: string, contextId: string): Result<null, null> => {
        const playerContext = player.getContextId()
        if (
            playerContext.some &&
            playerContext.val == contextId &&
            player.getMusicList().has(musicId)
        )
            return play(musicId)

        let contextResult = player.setContext(contextId)
        if (contextResult.err) return contextResult

        let cursorResult = player.setCursor(musicId)
        if (cursorResult.err) return cursorResult

        return Ok(null)
    }

    const playInContext = (musicId: string) => {
        if (!player.has(musicId)) return Err(null)

        player.setCursor(musicId)
        Ok(null)
    }

    return {
        player,
        playFromContext,
        playInContext
    }
})
