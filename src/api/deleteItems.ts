import axios from "@/plugins/axios";

export async function deleteItems(url: string, items: { id: number }[]): Promise<void> {
  let ids = '/'
  items.forEach(item => ids += item.id)
  ids.substring(0, ids.length - 1)

  const response = await axios.delete(url + ids)
  return response.data
}
