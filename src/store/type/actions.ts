import {ActionTree} from "vuex";
import {
  TypeActionsTypes,
  TypeStateTypes
} from "@/store/type/interfaces";
import {TYPE_STORE} from "@/store/constants";
import {IRootState} from "@/store/root/interfaces";
import {getItems} from "@/api/getItems";
import {createItem} from "@/api/createItem";
import {deleteItems} from "@/api/deleteItems";
import {updateItem} from "@/api/updateItem";
import {TypeItem} from "@/types/items/type.types";

const url = '/api/types'

export const actions: ActionTree<TypeStateTypes, IRootState> & TypeActionsTypes = {
  async [TYPE_STORE.ACTIONS.GET_TYPES]({commit}, payload) {
    const types = await getItems<TypeItem>(url, payload);
    commit(TYPE_STORE.MUTATIONS.SET_TYPES, types);

    return types
  },
  
  async [TYPE_STORE.ACTIONS.CREATE_TYPE]({commit, state}, payload) {
    const type = await createItem<TypeItem>(url, payload)
    commit(TYPE_STORE.MUTATIONS.SET_TYPES, [...state.types, type]);

    return type
  },

  async [TYPE_STORE.ACTIONS.DELETE_TYPES]({commit, state}, payload) {
    await deleteItems(url, payload)
    commit(TYPE_STORE.MUTATIONS.SET_TYPES, state.types.filter(item => !payload.find(i => i.id === item.id)));

    return
  },

  async [TYPE_STORE.ACTIONS.UPDATE_TYPE]({state, commit}, payload) {
    const type = await updateItem<TypeItem>(url, payload)

    const types = state.types

    let index = types.findIndex(item => item.id === payload.id)

    types[index] = type

    commit(TYPE_STORE.MUTATIONS.SET_TYPES, types);

    return payload
  }
};
