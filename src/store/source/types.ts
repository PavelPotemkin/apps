import {
  SourceStateTypes,
  SourceMutationsTypes,
  SourceGettersTypes,
  SourceActionsTypes
} from "@/store/source/interfaces";
import {Store as VuexStore, CommitOptions, DispatchOptions} from "vuex";

export type SourceStoreModuleTypes<S = SourceStateTypes> = Omit<VuexStore<S>,
  "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof SourceMutationsTypes,
    P extends Parameters<SourceMutationsTypes[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<SourceMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof SourceGettersTypes]: ReturnType<SourceGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof SourceActionsTypes>(
    key: K,
    payload?: Parameters<SourceActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<SourceActionsTypes[K]>;
};

