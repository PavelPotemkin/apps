import axios from "@/plugins/axios";

export async function createItem<T>(url: string, data: any): Promise<T> {
  const response = await axios.post(url, data)
  return response.data
}