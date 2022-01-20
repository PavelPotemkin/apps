import {Module} from "vuex";
import {IRootState} from "@/store/root/interfaces";
import {SourceStateTypes} from "@/store/source/interfaces";
import {getters} from "./getters";
import {actions} from "./actions";
import {mutations} from "./mutations";
import {state} from "./state";

// Module
const source: Module<SourceStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default source;
