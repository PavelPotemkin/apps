import {CATEGORY_STORE} from "@/store/constants";
import {GetterTree} from "vuex";
import {IRootState} from "@/store/root/interfaces";
import {
  CategoryGettersTypes,
  CategoryStateTypes
} from "@/store/category/interfaces";

export const getters: GetterTree<CategoryStateTypes, IRootState> &
  CategoryGettersTypes = {
  [CATEGORY_STORE.GETTERS.CATEGORIES]: (state: CategoryStateTypes) => {
    return state.categories;
  }
};
