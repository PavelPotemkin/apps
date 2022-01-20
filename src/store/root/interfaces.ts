import {ActionContext, DispatchOptions} from "vuex";
import {ROOT_STORE} from "@/store/constants";
import {StoreActions} from "@/store/interfaces";

export interface IRootState {
  version: string;
}

export interface IRootGettersTypes {
  [ROOT_STORE.GETTERS.UPDATE_VERSION](state: IRootState): string;
}

export interface RootMutationsTypes<S = IRootState> {
  [ROOT_STORE.MUTATIONS.UPDATE_VERSION](state: S, payload: string): void;
}

export interface RootActionsTypes {
  [ROOT_STORE.ACTIONS.UPDATE_VERSION]({commit}: AugmentedActionContextRoot, payload: string): void;
}

type AugmentedActionContextRoot = {
  commit<K extends keyof RootMutationsTypes>(
    key: K,
    payload: Parameters<RootMutationsTypes[K]>[1]
  ): ReturnType<RootMutationsTypes[K]>;
} & Omit<ActionContext<IRootState, IRootState>, "commit"> & {
  dispatch<K extends keyof StoreActions>(
    key: K,
    payload?: Parameters<StoreActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<StoreActions[K]>;
};
