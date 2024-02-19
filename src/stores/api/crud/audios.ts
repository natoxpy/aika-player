import axios from "axios";
import { API_LOCATION } from "..";

export type Audio = {
  id: string;
  name: string;
};

export async function getAudios(): Promise<Audio[]> {
  const res = await axios.get(`${API_LOCATION}/db/audios/`);
  return res.data as Audio[];
}

export async function getAudio(audio_id: string): Promise<Audio> {
  const res = await axios.get(`${API_LOCATION}/db/audios/${audio_id}/`);
  return res.data as Audio;
}

export async function createAudio(file_id: string) {
  const res = await axios.post(`${API_LOCATION}/db/audios/`, {
    file: file_id,
  });
}
