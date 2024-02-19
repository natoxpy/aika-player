import axios from "axios";
import { API_LOCATION, type Music } from "..";

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
  artists_id: string;
  featured_artists_id: string[];
  album_id: string;
};

export async function soundcloudImport(data: SoundcloudImport): Promise<Music> {
  const res = await axios.post(`${API_LOCATION}/soundcloud/import/`, data);
  return res.data as Music;
}

export async function previewFromUrl(url: string) {
  const url_encoded = encodeURIComponent(url);
  const res = await fetch(`${API_LOCATION}/soundcloud/metadata/${url_encoded}`);
  return (await res.json()) as SoundcloudTrack;
}
