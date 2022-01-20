import { MutationTree } from "vuex";
import {
  SubcategoryMutationsTypes,
  SubcategoryStateTypes
} from "@/store/subcategory/interfaces";
import {SUBCATEGORY_STORE} from "@/store/constants";

export const mutations: MutationTree<SubcategoryStateTypes> &
  SubcategoryMutationsTypes = {
  [SUBCATEGORY_STORE.MUTATIONS.SET_SUBCATEGORIES](state, payload) {
    state.subcategories = payload;
  },
  [SUBCATEGORY_STORE.MUTATIONS.DELETE_SUBCATEGORIES](state, payload) {
    state.subcategories = state.subcategories.filter(item => !payload.find(subcategory => subcategory.id === item.id));
  },
  [SUBCATEGORY_STORE.MUTATIONS.UPDATE_SUBCATEGORY](state, payload) {
    const index = state.subcategories.findIndex(item => item.id === payload.id)
    state.subcategories[index] = payload;
  }
};
