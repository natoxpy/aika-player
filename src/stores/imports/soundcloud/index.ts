import { useMappedArtistList } from './artists'

// TODO: find a more appropiate place for this
export class ImageSource {
    constructor(
        public url: string,
        public arrayBuffer?: ArrayBuffer
    ) {}

    fromUrl(url: URL): ImageSource {
        return new ImageSource(url.toString(), undefined)
    }

    fromBuffer(arrayBuffer: ArrayBuffer): ImageSource {
        let blob = new Blob([arrayBuffer])
        let url = URL.createObjectURL(blob)
        return new ImageSource(url, arrayBuffer)
    }
}

/** a
 */
export namespace SoundcloudStores {
    export const useArtists = useMappedArtistList
}
