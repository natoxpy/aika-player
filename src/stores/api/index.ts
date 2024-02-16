import { ref, computed } from "vue";
import { defineStore } from "pinia";

const API_LOCATION = "http://[::1]:8000";

export type Music = {
  name: string;
  id: string;
};

export type File = {
  id: string,
  location: string,
  size: number,
  mime: string,
  name: string,
}

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
export async function getCover(music_id: string) {
  const res = await fetch(`${API_LOCATION}/db/musics/${music_id}/cover`);

  if (res.status === 200) {
    const data: { file_id: string } = await res.json();
    return `${API_LOCATION}/cdn/${data.file_id}`
  }

  return `${API_LOCATION}/cdn/30305764-14d6-4060-95a5-2eb820cf6357`
}

/** 
 * @returns {string} uri to cover cdn endpoint 
 */
export async function getAudio(music_id: string) {
  const res = await fetch(`${API_LOCATION}/db/musics/${music_id}/audio`);

  if (res.status === 200) {
    const data: { file_id: string } = await res.json();
    return `${API_LOCATION}/cdn/${data.file_id}`
  }

  return `${API_LOCATION}/cdn/30305764-14d6-4060-95a5-2eb820cf6357`
}





