import {Store as VuexStore, CommitOptions, DispatchOptions} from "vuex";
import {
  OperationActionsTypes,
  OperationGettersTypes,
  OperationMutationsTypes,
  OperationStateTypes
} from "@/store/operations/interfaces";

export type OperationStoreModuleTypes<S = OperationStateTypes> = Omit<VuexStore<S>,
  "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof OperationMutationsTypes,
    P extends Parameters<OperationMutationsTypes[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<OperationMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof OperationGettersTypes]: ReturnType<OperationGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof OperationActionsTypes>(
    key: K,
    payload?: Parameters<OperationActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<OperationActionsTypes[K]>;
};

