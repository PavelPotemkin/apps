import {ActionContext} from "vuex";
import {CATEGORY_STORE} from "@/store/constants";
import {IRootState} from "@/store/root/interfaces";
import {
  CategoryItem,
  CreateCategoryItemDto
} from "@/types/items/category.types";

export interface CategoryStateTypes {
  categories: CategoryItem[];
}

export interface CategoryGettersTypes {
  [CATEGORY_STORE.GETTERS.CATEGORIES](state: CategoryStateTypes): CategoryItem[];
}

export interface CategoryMutationsTypes<S = CategoryStateTypes> {
  [CATEGORY_STORE.MUTATIONS.SET_CATEGORIES](state: S, payload: CategoryItem[]): void;
  [CATEGORY_STORE.MUTATIONS.DELETE_CATEGORIES](state: S, payload: CategoryItem[]): void;
  [CATEGORY_STORE.MUTATIONS.UPDATE_CATEGORY](state: S, payload: CategoryItem): void;
}

export interface CategoryActionsTypes {
  [CATEGORY_STORE.ACTIONS.GET_CATEGORIES]({commit}: AugmentedActionContextCategory, payload: void): Promise<CategoryItem[]>;
  [CATEGORY_STORE.ACTIONS.CREATE_CATEGORY]({commit}: AugmentedActionContextCategory, payload: CreateCategoryItemDto): Promise<CategoryItem>;
  [CATEGORY_STORE.ACTIONS.DELETE_CATEGORIES]({commit}: AugmentedActionContextCategory, payload: CategoryItem[]): Promise<void>;
  [CATEGORY_STORE.ACTIONS.UPDATE_CATEGORY]({commit}: AugmentedActionContextCategory, payload: CategoryItem): Promise<CategoryItem>;
}

type AugmentedActionContextCategory = {
  commit<K extends keyof CategoryMutationsTypes>(
    key: K,
    payload: Parameters<CategoryMutationsTypes[K]>[1]
  ): ReturnType<CategoryMutationsTypes[K]>;
} & Omit<ActionContext<CategoryStateTypes, IRootState>, "commit">;

