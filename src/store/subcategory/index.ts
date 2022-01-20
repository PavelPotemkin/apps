import {Module} from "vuex";
import {IRootState} from "@/store/root/interfaces";
import {getters} from "./getters";
import {actions} from "./actions";
import {mutations} from "./mutations";
import {state} from "./state";
import {SubcategoryStateTypes} from "@/store/subcategory/interfaces";

// Module
const source: Module<SubcategoryStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default source;
