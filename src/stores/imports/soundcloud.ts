import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { createImage, wrapFileId } from "../api/";
import { uploadFromUrl } from "../api/fs/upload";
import {
  type SoundcloudImport,
  previewFromUrl,
} from "../api/import/soundcloud";
import { getArtist, getArtists, type Artist } from "../api/crud/artists";

export async function uploadImageFromUrl(url: string) {
  const file = await uploadFromUrl(url);
  return {
    image: await createImage(file.id),
    file,
  };
}

export type SoundcloudImportLoadedData = {
  cover_img: string;
} & SoundcloudImport;

export const useSoundcloudImport = defineStore("soundcloud_imports", () => {
  const imports = ref<SoundcloudImportLoadedData[]>([]);
  const importing = ref(false);

  const updateTitle = (idx: number, title: string) => {
    imports.value[idx].title = title;
    console.log(imports.value);
  };

  const addImportFromUrl = async (url: string) => {
    importing.value = true;

    const track = await previewFromUrl(url);

    const { file, image } = await uploadImageFromUrl(track.thumbnail);
    const image_id = image.id;
    const cover_img = wrapFileId(file.id);

    const scImport: SoundcloudImportLoadedData = {
      title: track.title,
      image_id,
      cover_img,
      soundcloud_url: track.url,
      artists_id: [],
      featured_artists_id: [],
      album_id: undefined,
    };

    imports.value.push(scImport);

    importing.value = false;
  };

  const allArtists = computed(async () => {
    return await getArtists();
  });

  const artists = computed(async () => {
    const artistsList = await allArtists.value;

    const artistsData: Artist[][] = [];
    for (const [idx, item] of imports.value.entries()) {
      const artists_id = item.artists_id;
      artistsData[idx] = [];

      for (const artist_id in artists_id) {
        const artist = artistsList.find((itm) => itm.id === artist_id);
        if (!artist) continue;
        artistsData[idx].push(artist);
      }
    }

    return artistsData;
  });

  return { imports, importing, addImportFromUrl, updateTitle, artists, allArtists };
});
