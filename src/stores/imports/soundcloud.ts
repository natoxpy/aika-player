import Fuse from "fuse.js";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { createImage } from "../api/";
import {
  type Artist,
  getArtist,
  getArtists,
  getAvatar,
  getDefaultAvatar,
} from "../api/crud/artists";
import { uploadFromUrl } from "../api/fs/upload";
import {
  type SoundcloudImportMusic,
  previewFromUrl,
} from "../api/import/soundcloud";

export async function uploadImageFromUrl(url: string) {
  const file = await uploadFromUrl(url);
  return {
    image: await createImage(file.id),
    file,
  };
}

export type ArtistsMeta = Artist & { avatar_url: string; featured?: boolean };

export const useSoundcloudImport = defineStore("soundcloud_imports", () => {
  const musics = ref<Map<string, string>>(new Map());
  const artists = ref<Map<string, Array<[string, boolean]>>>(new Map());
  const covers = ref<Map<string, string>>(new Map());

  const imports = ref<Map<string, SoundcloudImportMusic>>(new Map());
  const importing = ref(false);

  const updateTitle = (id: string, title: string) => {
    const music = imports.value.get(id);
    if (!music) return;
    music.title = title;
  };

  const addImportFromUrl = async (url: string) => {
    importing.value = true;

    const track = await previewFromUrl(url);
    const musicId = crypto.randomUUID();

    musics.value.set(musicId, track.title);
    artists.value.set(musicId, []);
    covers.value.set(musicId, track.thumbnail);

    importing.value = false;
  };

  const allArtists = computed(async () => {
    console.log('awa')
    const artists: ArtistsMeta[] = [];
    const apiArtists = await getArtists(); 

    for (const artist of apiArtists) {
      const avatar_url = await getAvatar(artist.id);

      artists.push({
        avatar_url,
        ...artist 
      })
    }

    return artists;
  });

  const localGetArtist = async (artistId: string) => {
    const artists = await allArtists.value;
    return artists.find(item => item.id === artistId) as ArtistsMeta
  }

  return {
    musics,
    artists,
    covers,
    imports,
    importing,
    addImportFromUrl,
    updateTitle,

    hasArtist: (musicId: string, artistId: string, feat = false) => {
      const artistList = artists.value.get(musicId) ?? [];
      return artistList.findIndex((itm) => itm[0] === artistId) !== -1;
    },

    setArtist: (musicId: string, artistId: string, feat = false) => {
      const artistList = artists.value.get(musicId) ?? [];
      const artistIdx = artistList.findIndex((itm) => itm[0] === artistId);

      artistList[artistIdx][0] = artistId;
      artistList[artistIdx][1] = feat;

      artists.value.set(musicId, artistList);
    },

    removeArtist: (musicId: string, artistId: string) => {
      const artistList = artists.value.get(musicId) ?? [];
      const newArtistList = artistList.filter((itm) => itm[0] !== artistId);

      artists.value.set(musicId, newArtistList);
    },

    addArtist: (music_id: string, artist_id: string, featured = false) => {
      const artistList = artists.value.get(music_id) ?? [];
      artistList.push([artist_id, featured]);
    },

    getArtistsForSelector: async (music_id: string, filter?: string) => {
      const artistsMeta: ArtistsMeta[] = [];

      const artistList = artists.value.get(music_id) ?? [];
      const used = new Set();

      for (const [artist_id, feat] of artistList) {
        used.add(artist_id);

        const artist = await localGetArtist(artist_id);
        // const artist_avatar = await getAvatar(artist_id);

        artistsMeta.push({
          featured: feat,
          ...artist,
        });
      }

      artistsMeta.sort((a, b) => {
        if (!a.featured && b.featured === true) return -1;
        if (a.featured === true && !b.featured) return 1;
        return 0;
      });

      const apiArtists = (await allArtists.value).filter(
        (item) => !used.has(item.id),
      );

      if (filter === undefined || filter.trim() === "") {
        for (const artist of apiArtists) {
          artistsMeta.push({
            featured: undefined,
            ...artist,
          });
        }
      } else {
        const fuse = new Fuse(apiArtists, { keys: ["name"] });

        for (const result of fuse.search(filter)) {
          const artist = result.item;

          artistsMeta.push({
            featured: undefined,
            ...artist,
          });
        }
      }

      return artistsMeta;
    },

    getArtists: async (id: string) => {
      const artistsMeta: ArtistsMeta[] = [];
      const artistsFeatMeta: ArtistsMeta[] = [];

      const artistList = artists.value.get(id) ?? [];

      for (const [artist_id, feat] of artistList) {
        const artist = await localGetArtist(artist_id);

        const data = {
          featured: feat,
          ...artist,
        };

        if (!feat) artistsMeta.push(data);
        else artistsFeatMeta.push(data);
      }

      return [artistsMeta, artistsFeatMeta];
    },
  };
});
