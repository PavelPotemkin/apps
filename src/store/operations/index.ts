import {Module} from "vuex";
import {IRootState} from "@/store/root/interfaces";
import {getters} from "./getters";
import {actions} from "./actions";
import {mutations} from "./mutations";
import {state} from "./state";
import {OperationStateTypes} from "@/store/operations/interfaces";

// Module
const operation: Module<OperationStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default operation;
