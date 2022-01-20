import {TYPE_STORE} from "@/store/constants";
import {GetterTree} from "vuex";
import {IRootState} from "@/store/root/interfaces";
import {TypeGettersTypes, TypeStateTypes} from "@/store/type/interfaces";

export const getters: GetterTree<TypeStateTypes, IRootState> &
  TypeGettersTypes = {
  [TYPE_STORE.GETTERS.TYPES]: (state: TypeStateTypes) => {
    return state.types;
  }
};
