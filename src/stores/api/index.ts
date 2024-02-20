export { getImage, createImage } from "./crud/images.ts";
export { getAudio, createAudio } from "./crud/audios.ts";
export { getArtists, createArtist } from "./crud/artists.ts";

export const API_LOCATION = "http://[::1]:8000";

export type Music = {
	name: string;
	id: string;
};

export type File = {
	id: string;
	location: string;
	size: number;
	mime: string;
	name: string;
};

/**
 * Returns all musics
 */
export async function getMusics() {
	const res = await fetch(`${API_LOCATION}/db/musics/`);
	return (await res.json()) as Array<Music>;
}

/**
 * @returns {string} uri to cover cdn endpoint
 */
export async function getCover(image_id: string) {
	const res = await fetch(`${API_LOCATION}/db/musics/${image_id}/cover`);

	if (res.status === 200) {
		const data: { file_id: string } = await res.json();
		return `${API_LOCATION}/cdn/${data.file_id}`;
	}

	return `${API_LOCATION}/cdn/30305764-14d6-4060-95a5-2eb820cf6357`;
}

export function wrapFileId(id: string) {
	return `${API_LOCATION}/cdn/${id}`;
}
