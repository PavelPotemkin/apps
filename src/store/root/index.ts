import { Module, ModuleTree } from "vuex";
import { IRootState } from "@/store/root/interfaces";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";
import sourceModule from "@/store/source"
import typeModule from "@/store/type"
import categoryModule from "@/store/category"
import subcategoryModule from "@/store/subcategory"
import operationModule from "@/store/operations"

// Modules
const modules: ModuleTree<IRootState> = {
  sourceModule,
  typeModule,
  categoryModule,
  subcategoryModule,
  operationModule,
};

const root: Module<IRootState, IRootState> = {
  state,
  getters,
  mutations,
  actions,
  modules
};

export default root;
