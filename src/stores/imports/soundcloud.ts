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
import {
  getAlbums,
  type Album,
  getAlbumDefaultCover,
} from "../api/crud/albums";

export async function uploadImageFromUrl(url: string) {
  const file = await uploadFromUrl(url);
  return {
    image: await createImage(file.id),
    file,
  };
}

export type ArtistsMeta = Artist & { avatar_url: string; featured?: boolean };
export type AlbumsMeta = Album & { cover_url: string; selected?: boolean };

export const useSoundcloudImport = defineStore("soundcloud_imports", () => {
  const musics = ref<Map<string, string>>(new Map());
  const urls = ref<Map<string, string>>(new Map());
  const artists = ref<Map<string, Array<[string, boolean]>>>(new Map());
  const albums = ref<Map<string, Array<string>>>(new Map());
  const covers = ref<Map<string, string>>(new Map());

  const importing = ref<Set<string>>(new Set());

  const updateTitle = (id: string, title: string) => {
    musics.value.set(id, title);
  };

  const addImportFromUrl = async (url: string) => {
    const importId = crypto.randomUUID();
    importing.value.add(importId);

    const track = await previewFromUrl(url);
    const musicId = crypto.randomUUID();

    urls.value.set(musicId, track.url);
    musics.value.set(musicId, track.title);
    artists.value.set(musicId, []);
    albums.value.set(musicId, []);
    covers.value.set(musicId, track.thumbnail);

    importing.value.delete(importId);
  };

  const allArtists = computed(async () => {
    const artists: ArtistsMeta[] = [];
    const apiArtists = await getArtists();

    for (const artist of apiArtists) {
      const avatar_url = await getAvatar(artist.id);

      artists.push({
        avatar_url,
        ...artist,
      });
    }

    return artists;
  });

  const allAlbums = computed(async () => {
    const albums: AlbumsMeta[] = [];
    const apiAlbums = await getAlbums();

    for (const album of apiAlbums) {
      albums.push({
        cover_url: getAlbumDefaultCover(),
        ...album,
      });
    }

    return albums;
  });

  const localGetAlbum = async (albumId: string) => {
    const albums = await allAlbums.value;
    return albums.find((item) => item.id === albumId) as AlbumsMeta;
  };

  const localGetArtist = async (artistId: string) => {
    const artists = await allArtists.value;
    return artists.find((item) => item.id === artistId) as ArtistsMeta;
  };

  return {
    musics,
    artists,
    albums,
    covers,
    importing,
    addImportFromUrl,
    updateTitle,

    getAll: () => {
      const importMusics: SoundcloudImportMusic[] = [];

      for (const [musicId, title] of musics.value.entries()) {
        const artistList = (artists.value.get(musicId) ?? [])
          .filter((item) => item[1] === false)
          .map((item) => item[0]);

        const featuredArtistList = (artists.value.get(musicId) ?? [])
          .filter((item) => item[1] === true)
          .map((item) => item[0]);

        const albumList = albums.value.get(musicId) ?? [];

        const soundcloud_url = urls.value.get(musicId) ?? "";
        const coverUrl = covers.value.get(musicId) ?? "";

        importMusics.push({
          title,
          image_src: coverUrl,
          artists_id: artistList,
          featured_artists_id: featuredArtistList,
          albums_id: albumList,
          soundcloud_url,
        });
      }

      return importMusics;
    },

    hasArtist: (musicId: string, artistId: string) => {
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

    addArtist: (musicId: string, artistId: string, featured = false) => {
      const artistList = artists.value.get(musicId) ?? [];
      artistList.push([artistId, featured]);
      artists.value.set(musicId, artistList);
    },

    getArtistsForSelector: async (music_id: string, filter?: string) => {
      const artistsMeta: ArtistsMeta[] = [];

      const artistList = artists.value.get(music_id) ?? [];
      const used = new Set();

      for (const [artist_id, feat] of artistList) {
        used.add(artist_id);

        const artist = await localGetArtist(artist_id);

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

    hasAlbum: (musicId: string, albumId: string) => {
      const albumList = albums.value.get(musicId) ?? [];
      return albumList.findIndex((itm) => itm === albumId) !== -1;
    },

    removeAlbum: (musicId: string, albumId: string) => {
      const albumList = albums.value.get(musicId) ?? [];
      const newAlbumList = albumList.filter((itm) => itm !== albumId);
      albums.value.set(musicId, newAlbumList);
    },

    addAlbum: (musicId: string, albumId: string) => {
      const artistList = albums.value.get(musicId) ?? [];
      artistList.push(albumId);
    },

    getAlbumsForSelector: async (music_id: string, filter?: string) => {
      const albumsMeta: AlbumsMeta[] = [];

      const albumList = albums.value.get(music_id) ?? [];
      const used = new Set();

      for (const albumId of albumList) {
        used.add(albumId);

        const album = await localGetAlbum(albumId);

        albumsMeta.push({
          selected: true,
          ...album,
        });
      }

      const apiAlbums = (await allAlbums.value).filter(
        (item) => !used.has(item.id),
      );

      if (filter === undefined || filter.trim() === "") {
        for (const album of apiAlbums) {
          albumsMeta.push({
            ...album,
          });
        }
      } else {
        const fuse = new Fuse(apiAlbums, { keys: ["name"] });

        for (const result of fuse.search(filter)) {
          const album = result.item;

          albumsMeta.push({
            ...album,
          });
        }
      }

      return albumsMeta;
    },

    getAlbums: async (id: string) => {
      const albumsMeta: AlbumsMeta[] = [];

      const albumList = albums.value.get(id) ?? [];

      for (const albumId of albumList) {
        const album = await localGetAlbum(albumId);

        const data = {
          selected: true,
          ...album,
        };

        albumsMeta.push(data);
      }

      return albumsMeta;
    },
  };
});
