<template>
  <catalog-items-template>
    <template #controls>
      <add-item
        button-name="Добавить подкатегорию"
        :submit-function="addItem"
      >
        <template #fields="{rules}">
          <app-select
            v-model="typeId"
            class="mb-5"
            :values="types"
            :rules="[rules.required]"
          />
          
          <app-select
            v-model="sourceId"
            class="mb-5"
            :values="sources"
            :rules="[rules.required]"
          />
          
          <app-select
            v-model="categoryId"
            class="mb-5"
            :values="categories"
            :rules="[rules.required]"
          />
          
          <app-select
            v-model="subcategoryId"
            class="mb-5"
            :values="subcategories"
            :rules="[rules.required]"
          />
          
          <app-text-field
            v-model="sum"
            :focus="true"
            placeholder="Сумма"
            :rules="[rules.required]"
          />
        </template>
      </add-item>
    </template>

    <template #inner>
      <list-items
        :items="operations"
        @delete="deleteItem"
        @edit="showEditPopup"
      />
    </template>

    <template #outer>
      <edit-item
        v-model="editPopupDisplay"
        button-name="Изменить подкатегорию"
        :submit-function="editItem"
      >
        <template #fields="{rules}">
          <app-text-field
            v-model="editFormData.sum"
            :focus="true"
            placeholder="Сумма"
            :rules="[rules.required]"
          />

          <app-select
            v-model="editFormData.type_id"
            class="mb-5"
            :values="types"
            :rules="[rules.required]"
          />

          <app-select
            v-model="editFormData.source_id"
            class="mb-5"
            :values="sources"
            :rules="[rules.required]"
          />

          <app-select
            v-model="editFormData.category_id"
            class="mb-5"
            :values="categories"
            :rules="[rules.required]"
          />

          <app-select
            v-model="editFormData.subcategory_id"
            class="mb-5"
            :values="subcategories"
            :rules="[rules.required]"
          />
        </template>
      </edit-item>
    </template>
  </catalog-items-template>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref} from 'vue'
import {useStore} from "@/store";
import AppTextField from "@/components/AppTextField.vue";
import AddItem from "@/views/AddItem.vue";
import ListItems from "@/views/ListItems.vue";
import {
  OPERATION_STORE,
  CATEGORY_STORE,
  SUBCATEGORY_STORE,
  TYPE_STORE,
  SOURCE_STORE
} from
    "@/store/constants";
import CatalogItemsTemplate from "@/views/CatalogItemsTemplate.vue";
import EditItem from "@/views/EditItem.vue";
import AppSelect from "@/components/AppSelect.vue";
import {OperationItem, OperationListItem} from "@/types/items/operation.types";

export default defineComponent({
  name: "OperationsPage",

  components: {
    AppSelect,
    EditItem, CatalogItemsTemplate, ListItems, AddItem, AppTextField
  },

  emits: ['delete', 'edit'],

  setup() {
    const store = useStore()

    const sum = ref<number>(0)
    const typeId = ref<number>(0)
    const sourceId = ref<number>(0)
    const categoryId = ref<number>(0)
    const subcategoryId = ref<number>(0)

    const editPopupDisplay = ref(false)
    const editFormData = reactive<OperationItem>({
      id: 0,
      sum: 0,
      type_id: 0,
      source_id: 0,
      category_id: 0,
      subcategory_id: 0
    })

    const itemData = computed(() => {
      return {
        sum: sum.value,
        type_id: typeId.value,
        source_id: sourceId.value,
        category_id: categoryId.value,
        subcategory_id: subcategoryId.value,
      }
    })

    const types = computed(() => 
      store.getters[TYPE_STORE.GETTERS.TYPES])
    const sources = computed(() => 
      store.getters[SOURCE_STORE.GETTERS.SOURCES])
    const categories = computed(() => 
      store.getters[CATEGORY_STORE.GETTERS.CATEGORIES])
    const subcategories = computed(() =>
      store.getters[SUBCATEGORY_STORE.GETTERS.SUBCATEGORIES])
    const operations = computed(() => {
      const operations: OperationListItem[] = 
        store.getters[OPERATION_STORE.GETTERS.OPERATIONS]

      operations.forEach(operation => {
        const type = types.value.find(type => type.id === operation.type_id)
        const source = sources.value.find(source => source.id === operation.source_id)
        const category = categories.value.find(category => category.id === operation.category_id)
        const subcategory = subcategories.value.find(subcategory => subcategory.id === operation.subcategory_id)

        if (type) {
          operation.typeName = type.name
        }
        if (source) {
          operation.sourceName = source.name
        }
        if (category) {
          operation.categoryName = category.name
        }
        if (subcategory) {
          operation.subcategoryName = subcategory.name
        }
      })

      return operations
    })
    
    const addItem = async () => await store.dispatch(OPERATION_STORE.ACTIONS.CREATE_OPERATION, itemData.value)
    const editItem = async () => await store.dispatch(OPERATION_STORE.ACTIONS.UPDATE_OPERATION, editFormData)
    const deleteItem = async (data: OperationItem) => await store.dispatch(OPERATION_STORE.ACTIONS.DELETE_OPERATIONS, [data])

    const showEditPopup = (data: OperationItem) => {
      editFormData.id = data.id;
      editFormData.type_id = data.type_id;
      editFormData.source_id = data.source_id;
      editFormData.category_id = data.category_id;
      editFormData.subcategory_id = data.subcategory_id;

      editPopupDisplay.value = true
    }

    return {
      sum,
      typeId,
      sourceId,
      categoryId,
      subcategoryId,
      editFormData,
      types,
      sources,
      categories,
      subcategories,
      operations,
      deleteItem,
      addItem,
      editItem,
      showEditPopup,
      editPopupDisplay
    }
  }
})
</script>

<style scoped>

</style>