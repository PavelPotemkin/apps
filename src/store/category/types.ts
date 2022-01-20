import {
  CategoryStateTypes,
  CategoryGettersTypes,
  CategoryMutationsTypes,
  CategoryActionsTypes
} from "@/store/category/interfaces";
import {Store as VuexStore, CommitOptions, DispatchOptions} from "vuex";

export type CategoryStoreModuleTypes<S = CategoryStateTypes> = Omit<VuexStore<S>,
  "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof CategoryMutationsTypes,
    P extends Parameters<CategoryMutationsTypes[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<CategoryMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof CategoryGettersTypes]: ReturnType<CategoryGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof CategoryActionsTypes>(
    key: K,
    payload?: Parameters<CategoryActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<CategoryActionsTypes[K]>;
};

