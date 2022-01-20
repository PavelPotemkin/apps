import { MutationTree } from "vuex";
import { SourceStateTypes, SourceMutationsTypes } from "@/store/source/interfaces";
import { SOURCE_STORE } from "@/store/constants";

export const mutations: MutationTree<SourceStateTypes> &
  SourceMutationsTypes = {
  [SOURCE_STORE.MUTATIONS.SET_SOURCES](state, payload) {
    state.sources = payload;
  },
  [SOURCE_STORE.MUTATIONS.DELETE_SOURCES](state, payload) {
    state.sources = state.sources.filter(item => !payload.find(source => source.id === item.id));
  },
  [SOURCE_STORE.MUTATIONS.UPDATE_SOURCE](state, payload) {
    const index = state.sources.findIndex(item => item.id === payload.id)
    state.sources[index] = payload;
  }
};
