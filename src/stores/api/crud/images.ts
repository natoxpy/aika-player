import axios from "axios";
import { API_LOCATION } from "..";

export type Image = {
  id: string;
  name: string;
};

export async function getImages(): Promise<Image[]> {
  const res = await axios.get(`${API_LOCATION}/db/images/`);
  return res.data as Image[];
}

export async function getImage(image_id: string): Promise<Image> {
  const res = await axios.get(`${API_LOCATION}/db/images/${image_id}/`);
  return res.data as Image;
}

export async function createImage(file_id: string): Promise<Image> {
  const res = await axios.post(`${API_LOCATION}/db/images/`, {
    file: file_id,
  });

  return res.data as Image;
}
