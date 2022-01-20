import {SUBCATEGORY_STORE} from "@/store/constants";
import {GetterTree} from "vuex";
import {IRootState} from "@/store/root/interfaces";
import {
  SubcategoryStateTypes,
  SubcategoryGettersTypes
} from "@/store/subcategory/interfaces";

export const getters: GetterTree<SubcategoryStateTypes, IRootState> &
  SubcategoryGettersTypes = {
  [SUBCATEGORY_STORE.GETTERS.SUBCATEGORIES]: (state: SubcategoryStateTypes) => {
    return state.subcategories;
  }
};
