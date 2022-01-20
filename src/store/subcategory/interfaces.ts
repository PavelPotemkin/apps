import {ActionContext} from "vuex";
import {SUBCATEGORY_STORE} from "@/store/constants";
import {IRootState} from "@/store/root/interfaces";
import {
  CreateSubcategoryItemDto,
  SubcategoryItem
} from "@/types/items/subcategory.types";

export interface SubcategoryStateTypes {
  subcategories: SubcategoryItem[];
}

export interface SubcategoryGettersTypes {
  [SUBCATEGORY_STORE.GETTERS.SUBCATEGORIES](state: SubcategoryStateTypes): SubcategoryItem[];
}

export interface SubcategoryMutationsTypes<S = SubcategoryStateTypes> {
  [SUBCATEGORY_STORE.MUTATIONS.SET_SUBCATEGORIES](state: S, payload: SubcategoryItem[]): void;
  [SUBCATEGORY_STORE.MUTATIONS.DELETE_SUBCATEGORIES](state: S, payload: SubcategoryItem[]): void;
  [SUBCATEGORY_STORE.MUTATIONS.UPDATE_SUBCATEGORY](state: S, payload: SubcategoryItem): void;
}

export interface SubcategoryActionsTypes {
  [SUBCATEGORY_STORE.ACTIONS.GET_SUBCATEGORIES]({commit}: AugmentedActionContextSubcategory, payload: void): Promise<SubcategoryItem[]>;
  [SUBCATEGORY_STORE.ACTIONS.CREATE_SUBCATEGORY]({commit}: AugmentedActionContextSubcategory, payload: CreateSubcategoryItemDto): Promise<SubcategoryItem>;
  [SUBCATEGORY_STORE.ACTIONS.DELETE_SUBCATEGORIES]({commit}: AugmentedActionContextSubcategory, payload: SubcategoryItem[]): Promise<void>;
  [SUBCATEGORY_STORE.ACTIONS.UPDATE_SUBCATEGORY]({commit}: AugmentedActionContextSubcategory, payload: SubcategoryItem): Promise<SubcategoryItem>;
}

type AugmentedActionContextSubcategory = {
  commit<K extends keyof SubcategoryMutationsTypes>(
    key: K,
    payload: Parameters<SubcategoryMutationsTypes[K]>[1]
  ): ReturnType<SubcategoryMutationsTypes[K]>;
} & Omit<ActionContext<SubcategoryStateTypes, IRootState>, "commit">;

