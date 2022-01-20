<template>
  <catalog-items-template>
    <template #controls>
      <add-item
        button-name="Добавить тип"
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
        :items="types"
        @delete="deleteItem"
        @edit="showEditPopup"
      />
    </template>

    <template #outer>
      <edit-item
        v-model="editPopupDisplay"
        button-name="Изменить тип"
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
import {TYPE_STORE} from "@/store/constants";
import CatalogItemsTemplate from "@/views/CatalogItemsTemplate.vue";
import EditItem from "@/views/EditItem.vue";
import {TypeItem} from "@/types/items/type.types";

export default defineComponent({
  name: "TypesPage",

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

    const types = computed(() => store.getters[TYPE_STORE.GETTERS.TYPES])

    const addItem = async () => await store.dispatch(TYPE_STORE.ACTIONS.CREATE_TYPE, itemData.value)

    const deleteItem = async (data: TypeItem) => await store.dispatch(TYPE_STORE.ACTIONS.DELETE_TYPES, [data])

    const showEditPopup = (data: TypeItem) => {
      editFormData.id = data.id;
      editFormData.name = data.name;
      
      editPopupDisplay.value = true
    }

    const editItem = async () => await store.dispatch(TYPE_STORE.ACTIONS.UPDATE_TYPE, editFormData)

    return {
      name,
      editFormData,
      types,
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