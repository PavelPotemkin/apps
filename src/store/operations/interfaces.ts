import {ActionContext} from "vuex";
import {OPERATION_STORE} from "@/store/constants";
import {IRootState} from "@/store/root/interfaces";
import {
  CreateOperationItemDto,
  OperationItem
} from "@/types/items/operation.types";

export interface OperationStateTypes {
  operations: OperationItem[];
}

export interface OperationGettersTypes {
  [OPERATION_STORE.GETTERS.OPERATIONS](state: OperationStateTypes): OperationItem[];
}

export interface OperationMutationsTypes<S = OperationStateTypes> {
  [OPERATION_STORE.MUTATIONS.SET_OPERATIONS](state: S, payload: OperationItem[]): void;
  [OPERATION_STORE.MUTATIONS.DELETE_OPERATIONS](state: S, payload: OperationItem[]): void;
  [OPERATION_STORE.MUTATIONS.UPDATE_OPERATION](state: S, payload: OperationItem): void;
}

export interface OperationActionsTypes {
  [OPERATION_STORE.ACTIONS.GET_OPERATIONS]({commit}: AugmentedActionContextOperation, payload: void): Promise<OperationItem[]>;
  [OPERATION_STORE.ACTIONS.CREATE_OPERATION]({commit}: AugmentedActionContextOperation, payload: CreateOperationItemDto): Promise<OperationItem>;
  [OPERATION_STORE.ACTIONS.DELETE_OPERATIONS]({commit}: AugmentedActionContextOperation, payload: OperationItem[]): Promise<void>;
  [OPERATION_STORE.ACTIONS.UPDATE_OPERATION]({commit}: AugmentedActionContextOperation, payload: OperationItem): Promise<OperationItem>;
}

type AugmentedActionContextOperation = {
  commit<K extends keyof OperationMutationsTypes>(
    key: K,
    payload: Parameters<OperationMutationsTypes[K]>[1]
  ): ReturnType<OperationMutationsTypes[K]>;
} & Omit<ActionContext<OperationStateTypes, IRootState>, "commit">;

