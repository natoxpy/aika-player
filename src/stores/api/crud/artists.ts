import axios from "axios";
import { API_LOCATION } from "..";

export type Artist = {
  id: string;
  name: string;
  avatar?: string;
};

export async function getArtists(): Promise<Artist[]> {
  const res = await axios.get(`${API_LOCATION}/db/artists/`);
  return res.data as Artist[];
}

export async function getArtist(artist_id: string): Promise<Artist> {
  const res = await axios.get(`${API_LOCATION}/db/artists/${artist_id}`);
  return res.data as Artist;
}

export async function createArtist(name: string): Promise<Artist> {
  const res = await axios.post(`${API_LOCATION}/db/artists/`, {
    name,
  });

  return res.data as Artist;
}

export async function getAvatar(artist_id: string) {
  const res = await fetch(`${API_LOCATION}/db/artists/${artist_id}/avatar`);

  if (res.status === 200) {
    const data: { file_id: string } = await res.json();
    return `${API_LOCATION}/cdn/${data.file_id}`;
  }

  return getDefaultAvatar();
}

export function getDefaultAvatar() {

  return `${API_LOCATION}/cdn/30305764-14d6-4060-95a5-2eb820cf6357`;
}
