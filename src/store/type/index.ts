import {Module} from "vuex";
import {IRootState} from "@/store/root/interfaces";
import {getters} from "./getters";
import {actions} from "./actions";
import {mutations} from "./mutations";
import {state} from "./state";
import {TypeStateTypes} from "@/store/type/interfaces";

// Module
const type: Module<TypeStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default type;
