import axios from "axios";
import { API_LOCATION } from "..";

export type File = {
  id: string;
  name: string;
  location: string;
  mime: string;
  size: number;
};

export async function uploadFromArrayBuffer(
  arrayBuffer: ArrayBuffer,
): Promise<File> {
  const res = await axios.post(
    `${API_LOCATION}/fs/upload`,
    new Blob([arrayBuffer]),
  );
  return res.data as File;
}

export async function uploadFromUrl(url: string): Promise<File> {
  const url_to_upload = encodeURIComponent(url);
  const res = await axios.post(`${API_LOCATION}/fs/upload/${url_to_upload}`);
  return res.data as File;
}
