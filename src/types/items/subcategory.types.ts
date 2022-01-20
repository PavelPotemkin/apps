export type SubcategoryItem = {
  id: number,
  name: string,
  category_id: number
}

export type CreateSubcategoryItemDto = {
  name: string,
  category_id: number
}

export type SubcategoryListItem = {
  id: number,
  name: string,
  category_id: number,
  categoryName?: string
}
