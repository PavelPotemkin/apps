import {ActionContext} from "vuex";
import {TYPE_STORE} from "@/store/constants";
import {IRootState} from "@/store/root/interfaces";
import {CreateTypeItemDto, TypeItem} from "@/types/items/type.types";

export interface TypeStateTypes {
  types: TypeItem[];
}

export interface TypeGettersTypes {
  [TYPE_STORE.GETTERS.TYPES](state: TypeStateTypes): TypeItem[];
}

export interface TypeMutationsTypes<S = TypeStateTypes> {
  [TYPE_STORE.MUTATIONS.SET_TYPES](state: S, payload: TypeItem[]): void;
  [TYPE_STORE.MUTATIONS.DELETE_TYPES](state: S, payload: TypeItem[]): void;
  [TYPE_STORE.MUTATIONS.UPDATE_TYPE](state: S, payload: TypeItem): void;
}

export interface TypeActionsTypes {
  [TYPE_STORE.ACTIONS.GET_TYPES]({commit}: AugmentedActionContextType, payload: void): Promise<TypeItem[]>;
  [TYPE_STORE.ACTIONS.CREATE_TYPE]({commit}: AugmentedActionContextType, payload: CreateTypeItemDto): Promise<TypeItem>;
  [TYPE_STORE.ACTIONS.DELETE_TYPES]({commit}: AugmentedActionContextType, payload: TypeItem[]): Promise<void>;
  [TYPE_STORE.ACTIONS.UPDATE_TYPE]({commit}: AugmentedActionContextType, payload: TypeItem): Promise<TypeItem>;
}

type AugmentedActionContextType = {
  commit<K extends keyof TypeMutationsTypes>(
    key: K,
    payload: Parameters<TypeMutationsTypes[K]>[1]
  ): ReturnType<TypeMutationsTypes[K]>;
} & Omit<ActionContext<TypeStateTypes, IRootState>, "commit">;

