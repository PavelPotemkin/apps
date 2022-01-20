import {
  SubcategoryStateTypes,
  SubcategoryGettersTypes,
  SubcategoryMutationsTypes,
  SubcategoryActionsTypes
} from "@/store/subcategory/interfaces";
import {Store as VuexStore, CommitOptions, DispatchOptions} from "vuex";

export type SubcategoryStoreModuleTypes<S = SubcategoryStateTypes> = Omit<VuexStore<S>,
  "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof SubcategoryMutationsTypes,
    P extends Parameters<SubcategoryMutationsTypes[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<SubcategoryMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof SubcategoryGettersTypes]: ReturnType<SubcategoryGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof SubcategoryActionsTypes>(
    key: K,
    payload?: Parameters<SubcategoryActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<SubcategoryActionsTypes[K]>;
};

