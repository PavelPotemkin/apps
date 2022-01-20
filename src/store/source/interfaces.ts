import {ActionContext} from "vuex";
import {SOURCE_STORE} from "@/store/constants";
import {IRootState} from "@/store/root/interfaces";
import {CreateSourceItemDto, SourceItem} from "@/types/items/source.types";

export interface SourceStateTypes {
  sources: SourceItem[];
}

export interface SourceGettersTypes {
  [SOURCE_STORE.GETTERS.SOURCES](state: SourceStateTypes): SourceItem[];
}

export interface SourceMutationsTypes<S = SourceStateTypes> {
  [SOURCE_STORE.MUTATIONS.SET_SOURCES](state: S, payload: SourceItem[]): void;
  [SOURCE_STORE.MUTATIONS.DELETE_SOURCES](state: S, payload: SourceItem[]): void;
  [SOURCE_STORE.MUTATIONS.UPDATE_SOURCE](state: S, payload: SourceItem): void;
}

export interface SourceActionsTypes {
  [SOURCE_STORE.ACTIONS.GET_SOURCES]({commit}: AugmentedActionContextSource, payload: void): Promise<SourceItem[]>;
  [SOURCE_STORE.ACTIONS.CREATE_SOURCE]({commit}: AugmentedActionContextSource, payload: CreateSourceItemDto): Promise<SourceItem>;
  [SOURCE_STORE.ACTIONS.DELETE_SOURCES]({commit}: AugmentedActionContextSource, payload: SourceItem[]): Promise<void>;
  [SOURCE_STORE.ACTIONS.UPDATE_SOURCE]({commit}: AugmentedActionContextSource, payload: SourceItem): Promise<SourceItem>;
}

type AugmentedActionContextSource = {
  commit<K extends keyof SourceMutationsTypes>(
    key: K,
    payload: Parameters<SourceMutationsTypes[K]>[1]
  ): ReturnType<SourceMutationsTypes[K]>;
} & Omit<ActionContext<SourceStateTypes, IRootState>, "commit">;

