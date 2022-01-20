import { MutationTree } from "vuex";
import { TYPE_STORE} from "@/store/constants";
import {TypeMutationsTypes, TypeStateTypes} from "@/store/type/interfaces";

export const mutations: MutationTree<TypeStateTypes> &
  TypeMutationsTypes = {
  [TYPE_STORE.MUTATIONS.SET_TYPES](state, payload) {
    state.types = payload;
  },
  [TYPE_STORE.MUTATIONS.DELETE_TYPES](state, payload) {
    state.types = state.types.filter(item => !payload.find(type => type.id === item.id));
  },
  [TYPE_STORE.MUTATIONS.UPDATE_TYPE](state, payload) {
    const index = state.types.findIndex(item => item.id === payload.id)
    state.types[index] = payload;
  }
};
