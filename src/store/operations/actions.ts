import {ActionTree} from "vuex";
import {OPERATION_STORE} from "@/store/constants";
import {IRootState} from "@/store/root/interfaces";
import {getItems} from "@/api/getItems";
import {createItem} from "@/api/createItem";
import {deleteItems} from "@/api/deleteItems";
import {updateItem} from "@/api/updateItem";
import {
  OperationActionsTypes,
  OperationStateTypes
} from "@/store/operations/interfaces";
import {OperationItem} from "@/types/items/operation.types";

const url = '/api/operations'

export const actions: ActionTree<OperationStateTypes, IRootState> & OperationActionsTypes = {
  async [OPERATION_STORE.ACTIONS.GET_OPERATIONS]({commit}, payload) {
    const operation = await getItems<OperationItem>(url, payload);
    commit(OPERATION_STORE.MUTATIONS.SET_OPERATIONS, operation);

    return operation
  },

  async [OPERATION_STORE.ACTIONS.CREATE_OPERATION]({commit, state}, payload) {
    const operation = await createItem<OperationItem>(url, payload)
    commit(OPERATION_STORE.MUTATIONS.SET_OPERATIONS, [...state.operations, operation]);

    return operation
  },

  async [OPERATION_STORE.ACTIONS.DELETE_OPERATIONS]({commit, state}, payload) {
    await deleteItems(url, payload)
    commit(OPERATION_STORE.MUTATIONS.SET_OPERATIONS, state.operations.filter(item => !payload.find(i => i.id === item.id)));

    return
  },

  async [OPERATION_STORE.ACTIONS.UPDATE_OPERATION]({state, commit}, payload) {
    const operation = await updateItem<OperationItem>(url, payload)

    const operations = state.operations

    let index = operations.findIndex(item => item.id === payload.id)

    operations[index] = operation
    
    commit(OPERATION_STORE.MUTATIONS.SET_OPERATIONS, operations);

    return payload
  }
};
