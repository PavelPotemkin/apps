import { MutationTree } from "vuex";
import { OPERATION_STORE } from "@/store/constants";
import {
  OperationMutationsTypes,
  OperationStateTypes
} from "@/store/operations/interfaces";

export const mutations: MutationTree<OperationStateTypes> &
  OperationMutationsTypes = {
  [OPERATION_STORE.MUTATIONS.SET_OPERATIONS](state, payload) {
    state.operations = payload;
  },
  [OPERATION_STORE.MUTATIONS.DELETE_OPERATIONS](state, payload) {
    state.operations = state.operations.filter(item => !payload.find(operation => operation.id === item.id));
  },
  [OPERATION_STORE.MUTATIONS.UPDATE_OPERATION](state, payload) {
    const index = state.operations.findIndex(item => item.id === payload.id)
    state.operations[index] = payload;
  }
};
