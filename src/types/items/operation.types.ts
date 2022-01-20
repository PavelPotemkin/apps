export type OperationItem = {
  id: number
  type_id: number
  source_id: number
  category_id: number
  subcategory_id?: number
  sum: number
  operationDate?: Date
}

export type CreateOperationItemDto = {
  type_id: number
  source_id: number
  category_id: number
  subcategory_id?: number
  sum: number
  operationDate?: Date
}

export type OperationListItem = {
  id: number
  type_id: number
  source_id: number
  category_id: number
  subcategory_id?: number
  sum: number
  operationDate?: Date
  categoryName?: string
  sourceName?: string
  typeName?: string
  subcategoryName?: string
}
