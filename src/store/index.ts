import {createStore, useStore as VuexStore } from "vuex";
import {IRootState} from "@/store/root/interfaces";
import {TypeStoreModuleTypes} from "@/store/type/types";
import {SourceStoreModuleTypes} from "@/store/source/types";
import {CategoryStoreModuleTypes} from "@/store/category/types"
import {SubcategoryStoreModuleTypes} from "@/store/subcategory/types";
import {RootStoreModuleTypes} from "@/store/root/types";

import root from "@/store/root";
import {OperationStoreModuleTypes} from "@/store/operations/types";

export const store = createStore<IRootState>(root);

type StoreModules = {
  typeModule: TypeStoreModuleTypes;
  sourceModule: SourceStoreModuleTypes;
  categoryModule: CategoryStoreModuleTypes;
  subcategoryModule: SubcategoryStoreModuleTypes;
  operationModule: OperationStoreModuleTypes;
  root: RootStoreModuleTypes;
};

export type Store =
  TypeStoreModuleTypes<Pick<StoreModules, "typeModule">> &
  SourceStoreModuleTypes<Pick<StoreModules, "sourceModule">> &
  CategoryStoreModuleTypes<Pick<StoreModules, "categoryModule">> &
  SubcategoryStoreModuleTypes<Pick<StoreModules, "subcategoryModule">> &
  OperationStoreModuleTypes<Pick<StoreModules, "operationModule">> &
  RootStoreModuleTypes<Pick<StoreModules, "root">>;

export function useStore(): Store {
  return VuexStore() as Store;
}

