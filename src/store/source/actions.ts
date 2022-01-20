import {ActionTree} from "vuex";
import {
  SourceStateTypes,
  SourceActionsTypes,
} from "@/store/source/interfaces";
import {SOURCE_STORE} from "@/store/constants";
import {IRootState} from "@/store/root/interfaces";
import {getItems} from "@/api/getItems";
import {createItem} from "@/api/createItem";
import {deleteItems} from "@/api/deleteItems";
import {updateItem} from "@/api/updateItem";
import {SourceItem} from "@/types/items/source.types";

const url = '/api/sources'

export const actions: ActionTree<SourceStateTypes, IRootState> & SourceActionsTypes = {
  async [SOURCE_STORE.ACTIONS.GET_SOURCES]({commit}, payload) {
    const sources = await getItems<SourceItem>(url, payload);
    commit(SOURCE_STORE.MUTATIONS.SET_SOURCES, sources);

    return sources
  },

  async [SOURCE_STORE.ACTIONS.CREATE_SOURCE]({commit, state}, payload) {
    const source = await createItem<SourceItem>(url, payload)
    commit(SOURCE_STORE.MUTATIONS.SET_SOURCES, [...state.sources, source]);

    return source
  },

  async [SOURCE_STORE.ACTIONS.DELETE_SOURCES]({commit, state}, payload) {
    await deleteItems(url, payload)
    commit(SOURCE_STORE.MUTATIONS.SET_SOURCES, state.sources.filter(item => !payload.find(i => i.id === item.id)));

    return
  },

  async [SOURCE_STORE.ACTIONS.UPDATE_SOURCE]({state, commit}, payload) {
    const source = await updateItem<SourceItem>(url, payload)

    const sources = state.sources

    let index = sources.findIndex(item => item.id === payload.id)

    sources[index] = source
    
    commit(SOURCE_STORE.MUTATIONS.SET_SOURCES, sources);

    return payload
  }
};
