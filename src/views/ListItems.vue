<template>
  <div v-if="!items?.length">
    Нет данных
  </div>
  
  <div
    v-for="item in items"
    v-else
    :key="item.id"
  >
    <list-item
      :data="item"
      @delete="deleteItem"
      @edit="editItem"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import ListItem from "@/views/ListItem.vue";
import {ItemType} from "@/types/items/index.types";

export default defineComponent({
  name: "ListItems",
  
  components: {ListItem},
  
  props: {
    items: {
      type: Array as PropType<ItemType[]>,
      required: true
    }
  },

  emits: ['delete', 'edit'],

  setup(props, {emit}) {
    
    const deleteItem = (data: ItemType) => {
      emit('delete', data)
    }

    const editItem = (data: ItemType) => {
      emit('edit', data)
    }
    
    return {
      deleteItem,
      editItem
    }
  }
})
</script>

<style scoped>

</style>