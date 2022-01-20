import {ActionTree} from "vuex";
import {CATEGORY_STORE} from "@/store/constants";
import {IRootState} from "@/store/root/interfaces";
import {getItems} from "@/api/getItems";
import {createItem} from "@/api/createItem";
import {deleteItems} from "@/api/deleteItems";
import {updateItem} from "@/api/updateItem";
import {
  CategoryActionsTypes,
  CategoryStateTypes
} from "@/store/category/interfaces";
import {CategoryItem} from "@/types/items/category.types";

const url = '/api/categories'

export const actions: ActionTree<CategoryStateTypes, IRootState> & CategoryActionsTypes = {
  async [CATEGORY_STORE.ACTIONS.GET_CATEGORIES]({commit}, payload) {
    const sources = await getItems<CategoryItem>(url, payload);
    commit(CATEGORY_STORE.MUTATIONS.SET_CATEGORIES, sources);

    return sources
  },

  async [CATEGORY_STORE.ACTIONS.CREATE_CATEGORY]({commit, state}, payload) {
    const source = await createItem<CategoryItem>(url, payload)
    commit(CATEGORY_STORE.MUTATIONS.SET_CATEGORIES, [...state.categories, source]);

    return source
  },

  async [CATEGORY_STORE.ACTIONS.DELETE_CATEGORIES]({commit, state}, payload) {
    await deleteItems(url, payload)
    commit(CATEGORY_STORE.MUTATIONS.SET_CATEGORIES, state.categories.filter(item => !payload.find(i => i.id === item.id)));

    return
  },

  async [CATEGORY_STORE.ACTIONS.UPDATE_CATEGORY]({state, commit}, payload) {
    const category = await updateItem<CategoryItem>(url, payload)

    const categories = state.categories

    let index = categories.findIndex(item => item.id === payload.id)

    categories[index] = category
    
    commit(CATEGORY_STORE.MUTATIONS.SET_CATEGORIES, categories);

    return payload
  }
};
