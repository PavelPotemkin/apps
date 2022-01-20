import {Store as VuexStore, CommitOptions, DispatchOptions} from "vuex";
import {
  TypeActionsTypes,
  TypeGettersTypes,
  TypeMutationsTypes,
  TypeStateTypes
} from "@/store/type/interfaces";

export type TypeStoreModuleTypes<S = TypeStateTypes> = Omit<VuexStore<S>,
  "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof TypeMutationsTypes,
    P extends Parameters<TypeMutationsTypes[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<TypeMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof TypeGettersTypes]: ReturnType<TypeGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof TypeActionsTypes>(
    key: K,
    payload?: Parameters<TypeActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<TypeActionsTypes[K]>;
};

