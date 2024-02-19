import axios from "axios";
import { API_LOCATION } from "..";

export type Artist = {
  id: string;
  name: string;
};

export async function getArtists(): Promise<Artist[]> {
  const res = await axios.get(`${API_LOCATION}/db/artists/`);
  return res.data as Artist[];
}

export async function getArtist(artist_id: string): Promise<Artist> {
  const res = await axios.get(`${API_LOCATION}/db/artists/${artist_id}/`);
  return res.data as Artist;
}

export async function createArtist(name: string) {
  const res = await axios.post(`${API_LOCATION}/db/artists/`, {
    name,
  });
}
