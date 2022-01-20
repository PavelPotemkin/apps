<template>
  <catalog-items-template>
    <template #controls>
      <add-item
        button-name="Добавить источник"
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
        :items="sources"
        @delete="deleteItem"
        @edit="showEditPopup"
      />
    </template>

    <template #outer>
      <edit-item
        v-model="editPopupDisplay"
        button-name="Изменить источник"
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
import {SOURCE_STORE} from "@/store/constants";
import CatalogItemsTemplate from "@/views/CatalogItemsTemplate.vue";
import EditItem from "@/views/EditItem.vue";
import {SourceItem} from "@/types/items/source.types";

export default defineComponent({
  name: "SourcesPage",

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

    const sources = computed(() => store.getters[SOURCE_STORE.GETTERS.SOURCES])

    const addItem = async () => await store.dispatch(SOURCE_STORE.ACTIONS.CREATE_SOURCE, 
      itemData.value)

    const deleteItem = async (data: SourceItem) => await store.dispatch(SOURCE_STORE.ACTIONS.DELETE_SOURCES, [data])

    const showEditPopup = (data: SourceItem) => {
      editFormData.id = data.id
      editFormData.name = data.name

      editPopupDisplay.value = true
    }

    const editItem = async () => await store.dispatch(SOURCE_STORE.ACTIONS.UPDATE_SOURCE, editFormData)

    return {
      name,
      editFormData,
      sources,
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