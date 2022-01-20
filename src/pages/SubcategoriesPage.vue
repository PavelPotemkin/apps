<template>
  <catalog-items-template>
    <template #controls>
      <add-item
        button-name="Добавить подкатегорию"
        :submit-function="addItem"
      >
        <template #fields="{rules}">
          <app-text-field
            v-model="name"
            :focus="true"
            placeholder="Название"
            :rules="[rules.required]"
          />
          
          <app-select
            v-model="categoryId"
            class="mb-5"
            :values="categories"
            :rules="[rules.required]"
          />
        </template>
      </add-item>
    </template>

    <template #inner>
      <list-items
        :items="subcategories"
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
            v-model="editFormData.name"
            :focus="true"
            placeholder="Название"
            :rules="[rules.required]"
          />

          <app-select
            v-model="editFormData.category_id"
            class="mb-5"
            :values="categories"
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
import {CATEGORY_STORE, SUBCATEGORY_STORE} from "@/store/constants";
import CatalogItemsTemplate from "@/views/CatalogItemsTemplate.vue";
import EditItem from "@/views/EditItem.vue";
import {
  SubcategoryItem,
  SubcategoryListItem
} from "@/types/items/subcategory.types";
import AppSelect from "@/components/AppSelect.vue";

export default defineComponent({
  name: "SubcategoriesPage",

  components: {
    AppSelect,
    EditItem, CatalogItemsTemplate, ListItems, AddItem, AppTextField
  },

  emits: ['delete', 'edit'],

  setup() {
    const store = useStore()

    const name = ref('')
    const categoryId = ref<number>(0)
    
    const editPopupDisplay = ref(false)
    const editFormData = reactive({
      id: 0,
      name: '',
      category_id: 0
    })

    const itemData = computed(() => {
      return {
        name: name.value,
        category_id: categoryId.value
      }
    })
    
    const categories = computed(() =>
      store.getters[CATEGORY_STORE.GETTERS.CATEGORIES])
    const subcategories = computed(() => {
      const subcategories: SubcategoryListItem[] = store.getters[SUBCATEGORY_STORE.GETTERS.SUBCATEGORIES]

      subcategories.forEach( subcategory => {
        const category = categories.value.find( category => category.id === subcategory.category_id )
        
        if (category) {
          subcategory.categoryName = category.name
        }
      } )
      
      return subcategories
    })


    const addItem = async () => await store.dispatch(SUBCATEGORY_STORE.ACTIONS.CREATE_SUBCATEGORY, itemData.value)
    const editItem = async () => await store.dispatch(SUBCATEGORY_STORE.ACTIONS.UPDATE_SUBCATEGORY, editFormData)
    const deleteItem = async (data: SubcategoryItem) => await store.dispatch(SUBCATEGORY_STORE.ACTIONS.DELETE_SUBCATEGORIES, [data])

    const showEditPopup = (data: SubcategoryItem) => {
      editFormData.id = data.id;
      editFormData.name = data.name;
      editFormData.category_id = data.category_id;

      editPopupDisplay.value = true
    }

    return {
      name,
      categoryId,
      editFormData,
      categories,
      subcategories,
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