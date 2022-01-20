import axios from "@/plugins/axios";

export async function getItems<T>(url: string, params?: any): Promise<T[]> {
  const response = await axios.get(url, {params})
  return response.data
}