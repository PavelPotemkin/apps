import {ActionTree} from "vuex";
import {SUBCATEGORY_STORE} from "@/store/constants";
import {IRootState} from "@/store/root/interfaces";
import {getItems} from "@/api/getItems";
import {createItem} from "@/api/createItem";
import {deleteItems} from "@/api/deleteItems";
import {updateItem} from "@/api/updateItem";
import {
  SubcategoryActionsTypes,
  SubcategoryStateTypes
} from "@/store/subcategory/interfaces";
import {SubcategoryItem} from "@/types/items/subcategory.types";

const url = '/api/subcategories'

export const actions: ActionTree<SubcategoryStateTypes, IRootState> & SubcategoryActionsTypes = {
  async [SUBCATEGORY_STORE.ACTIONS.GET_SUBCATEGORIES]({commit}, payload) {
    const subcategories = await getItems<SubcategoryItem>(url, payload);
    commit(SUBCATEGORY_STORE.MUTATIONS.SET_SUBCATEGORIES, subcategories);

    return subcategories
  },

  async [SUBCATEGORY_STORE.ACTIONS.CREATE_SUBCATEGORY]({commit, state}, payload) {
    const subcategory = await createItem<SubcategoryItem>(url, payload)
    commit(SUBCATEGORY_STORE.MUTATIONS.SET_SUBCATEGORIES, [...state.subcategories, subcategory]);

    return subcategory
  },

  async [SUBCATEGORY_STORE.ACTIONS.DELETE_SUBCATEGORIES]({commit, state}, payload) {
    await deleteItems(url, payload)
    commit(SUBCATEGORY_STORE.MUTATIONS.SET_SUBCATEGORIES, state.subcategories.filter(item => !payload.find(i => i.id === item.id)));

    return
  },

  async [SUBCATEGORY_STORE.ACTIONS.UPDATE_SUBCATEGORY]({state, commit}, payload) {
    const subcategory = await updateItem<SubcategoryItem>(url, payload)

    const subcategories = state.subcategories

    let index = subcategories.findIndex(item => item.id === payload.id)

    subcategories[index] = subcategory
    
    commit(SUBCATEGORY_STORE.MUTATIONS.SET_SUBCATEGORIES, subcategories);

    return payload
  }
};
