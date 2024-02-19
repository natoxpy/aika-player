import axios from "axios";
import { API_LOCATION } from "..";

export type File = {
  id: string;
  name: string;
  location: string;
  mime: string;
  size: number;
};

export async function upload_from_url(url: string): Promise<File> {
  const url_to_upload = encodeURIComponent(url);
  const res = await axios.post(`${API_LOCATION}/fs/upload/${url_to_upload}`);
  return res.data as File;
}
