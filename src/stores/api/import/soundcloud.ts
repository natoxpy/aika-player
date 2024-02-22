import axios from "axios";
import { API_LOCATION, createArtist, createImage, type Music } from "..";
import { uploadFromUrl } from "../fs/upload";
import { createAlbum } from "../crud/albums";

export type SoundcloudTrack = {
  title: string;
  url: string;
  thumbnail: string;
  duration: { secs: number };
  media: string;
  client_id: string;
};

export type SoundcloudImport = {
  title: string;
  image_id: string;
  soundcloud_url: string;
  artists_id: string[];
  featured_artists_id: string[];
  albums_id: string[];
};

export type SoundcloudImportMusic = {
  title: string;
  image_src: string;
  artists_not_in_db: string[],
  featured_artists_not_in_db: string[],
  albums_not_in_db: string[],
  soundcloud_url: string;
  artists_id: string[];
  featured_artists_id: string[];
  albums_id: string[];
};

export async function soundcloudImport(
  data: SoundcloudImportMusic,
): Promise<Music> {
  const file = await uploadFromUrl(data.image_src);
  const image = await createImage(file.id);
  const artists_id = data.artists_id;
  const albums_id = data.albums_id;

  for (const artistName of data.artists_not_in_db) {
    const artist =  await createArtist(artistName);
    artists_id.push(artist.id)
  }

  for (const albumName of data.albums_not_in_db) {
    const album =  await createAlbum(albumName);
    albums_id.push(album.id)
  }

  const importData: SoundcloudImport = {
    title: data.title,
    image_id: image.id,
    soundcloud_url: data.soundcloud_url,
    artists_id,
    featured_artists_id: data.featured_artists_id,
    albums_id: data.albums_id,
  };

  const res = await axios.post(`${API_LOCATION}/soundcloud/import`, importData);
  return res.data as Music;
}

export async function previewFromUrl(url: string) {
  const url_encoded = encodeURIComponent(url);
  const res = await fetch(`${API_LOCATION}/soundcloud/metadata/${url_encoded}`);
  return (await res.json()) as SoundcloudTrack;
}
