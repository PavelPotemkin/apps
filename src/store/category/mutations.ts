import { MutationTree } from "vuex";
import { CategoryStateTypes, CategoryMutationsTypes } from "@/store/category/interfaces";
import { CATEGORY_STORE } from "@/store/constants";

export const mutations: MutationTree<CategoryStateTypes> &
  CategoryMutationsTypes = {
  [CATEGORY_STORE.MUTATIONS.SET_CATEGORIES](state, payload) {
    state.categories = payload;
  },
  [CATEGORY_STORE.MUTATIONS.DELETE_CATEGORIES](state, payload) {
    state.categories = state.categories.filter(item => !payload.find(category => category.id === item.id));
  },
  [CATEGORY_STORE.MUTATIONS.UPDATE_CATEGORY](state, payload) {
    const index = state.categories.findIndex(item => item.id === payload.id)
    state.categories[index] = payload;
  }
};
