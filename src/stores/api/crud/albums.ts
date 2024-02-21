import axios from "axios";
import { API_LOCATION } from "..";

export type Album = {
	id: string;
	name: string;
	cover?: string;
};

export async function getAlbums(): Promise<Album[]> {
	const res = await axios.get(`${API_LOCATION}/db/albums/`);
	return res.data as Album[];
}

export async function getAlbum(artist_id: string): Promise<Album> {
	const res = await axios.get(`${API_LOCATION}/db/albums/${artist_id}`);
	return res.data as Album;
}

export async function createAlbum(
	name: string,
	cover?: string,
): Promise<Album> {
	const res = await axios.post(`${API_LOCATION}/db/albums/`, {
		name,
		cover,
	});

	return res.data as Album;
}

export function getAlbumDefaultCover() {
	return `${API_LOCATION}/cdn/30305764-14d6-4060-95a5-2eb820cf6357`;
}
