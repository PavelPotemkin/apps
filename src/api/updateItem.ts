import axios from "@/plugins/axios";

export async function updateItem<T>(url: string, item: T): Promise<T> {
  const response = await axios.put(url, item)
  return response.data
}
