<template>
  <catalog-items-template>
    <template #controls>
      <add-item
        button-name="Добавить категорию"
        :submit-function="addItem"
      >
        <template #fields="{rules}">
          <app-text-field
            v-model="name"
            :focus="true"
            placeholder="Название"
            :rules="[rules.required]"
          />
        </template>
      </add-item>
    </template>

    <template #inner>
      <list-items
        :items="category"
        @delete="deleteItem"
        @edit="showEditPopup"
      />
    </template>

    <template #outer>
      <edit-item
        v-model="editPopupDisplay"
        button-name="Изменить категорию"
        :submit-function="editItem"
      >
        <template #fields="{rules}">
          <app-text-field
            v-model="editFormData.name"
            :focus="true"
            placeholder="Название"
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
import {CATEGORY_STORE} from "@/store/constants";
import CatalogItemsTemplate from "@/views/CatalogItemsTemplate.vue";
import EditItem from "@/views/EditItem.vue";
import {CategoryItem} from "@/types/items/category.types";

export default defineComponent({
  name: "CategoriesPage",

  components: {
    EditItem, CatalogItemsTemplate, ListItems, AddItem, AppTextField
  },

  emits: ['delete', 'edit'],

  setup() {
    const store = useStore()

    const name = ref('')
    const editPopupDisplay = ref(false)

    const editFormData = reactive({
      id: 0,
      name: ''
    })

    const itemData = computed(() => {
      return {
        name: name.value
      }
    })

    const category = computed(() => 
      store.getters[CATEGORY_STORE.GETTERS.CATEGORIES])

    const addItem = async () => await store.dispatch(CATEGORY_STORE.ACTIONS.CREATE_CATEGORY,
      itemData.value)

    const deleteItem = async (data: CategoryItem) => await store.dispatch(CATEGORY_STORE.ACTIONS.DELETE_CATEGORIES, [data])

    const showEditPopup = (data: CategoryItem) => {
      editFormData.id = data.id
      editFormData.name = data.name

      editPopupDisplay.value = true
    }

    const editItem = async () => await store.dispatch(CATEGORY_STORE.ACTIONS.UPDATE_CATEGORY, editFormData)

    return {
      name,
      editFormData,
      category,
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