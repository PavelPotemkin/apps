import {SOURCE_STORE} from "@/store/constants";
import {GetterTree} from "vuex";
import {
  SourceGettersTypes,
  SourceStateTypes
} from "@/store/source/interfaces";
import {IRootState} from "@/store/root/interfaces";

export const getters: GetterTree<SourceStateTypes, IRootState> &
  SourceGettersTypes = {
  [SOURCE_STORE.GETTERS.SOURCES]: (state: SourceStateTypes) => {
    return state.sources;
  }
};
