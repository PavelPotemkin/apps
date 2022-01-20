import {OPERATION_STORE} from "@/store/constants";
import {GetterTree} from "vuex";
import {IRootState} from "@/store/root/interfaces";
import {
  OperationGettersTypes,
  OperationStateTypes
} from "@/store/operations/interfaces";

export const getters: GetterTree<OperationStateTypes, IRootState> &
  OperationGettersTypes = {
  [OPERATION_STORE.GETTERS.OPERATIONS]: (state: OperationStateTypes) => {
    return state.operations;
  }
};
