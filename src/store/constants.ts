import {
  RootGetters,
  RootMutations,
  RootActions,
  SourceGetters,
  SourceMutations,
  SourceActions,
  TypeGetters,
  TypeMutations,
  TypeActions,
  CategoryGetters,
  CategoryMutations,
  CategoryActions,
  SubcategoryGetters,
  SubcategoryMutations,
  SubcategoryActions, 
  OperationGetters, 
  OperationMutations, 
  OperationActions,
} from "@/store/enums";

export const ROOT_STORE = {
  GETTERS: RootGetters,
  MUTATIONS: RootMutations,
  ACTIONS: RootActions
};

export const SOURCE_STORE = {
  GETTERS: SourceGetters,
  MUTATIONS: SourceMutations,
  ACTIONS: SourceActions
};

export const TYPE_STORE = {
  GETTERS: TypeGetters,
  MUTATIONS: TypeMutations,
  ACTIONS: TypeActions
};

export const CATEGORY_STORE = {
  GETTERS: CategoryGetters,
  MUTATIONS: CategoryMutations,
  ACTIONS: CategoryActions
};

export const SUBCATEGORY_STORE = {
  GETTERS: SubcategoryGetters,
  MUTATIONS: SubcategoryMutations,
  ACTIONS: SubcategoryActions
};

export const OPERATION_STORE = {
  GETTERS: OperationGetters,
  MUTATIONS: OperationMutations,
  ACTIONS: OperationActions
};

