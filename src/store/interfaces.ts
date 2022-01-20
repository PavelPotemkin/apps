import {
  IRootGettersTypes,
  RootActionsTypes
} from "@/store/root/interfaces";
import {
  SourceActionsTypes,
  SourceGettersTypes
} from "@/store/source/interfaces";
import {
  TypeActionsTypes,
  TypeGettersTypes
} from "@/store/type/interfaces";
import {
  CategoryActionsTypes,
  CategoryGettersTypes
} from "@/store/category/interfaces";
import {
  SubcategoryActionsTypes,
  SubcategoryGettersTypes
} from "@/store/subcategory/interfaces";
import {
  OperationActionsTypes,
  OperationGettersTypes
} from "@/store/operations/interfaces";

export interface StoreActions
  extends RootActionsTypes,
    TypeActionsTypes,
    SourceActionsTypes,
    CategoryActionsTypes,
    SubcategoryActionsTypes,
    OperationActionsTypes {
}

export interface StoreGetters
  extends IRootGettersTypes,
    TypeGettersTypes,
    SourceGettersTypes,
    CategoryGettersTypes,
    SubcategoryGettersTypes,
    OperationGettersTypes {
}
