<template>
  <div class="list-item">
    <div class="list-item__inner">
      <div
        v-for="col in cols"
        :key="col"
      >
        {{ col }}
      </div>
    </div>

    <div class="list-item__controls">
      <app-button
        class="list-item__btn"
        @click="deleteItem"
      >
        <span class="material-icons list-item__icon">
          close
        </span>
      </app-button>

      <app-button
        class="list-item__btn"
        @click="editItem"
      >
        <span class="material-icons list-item__icon">
          edit
        </span>
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, toRefs} from "vue";
import AppButton from "@/components/AppButton.vue";

export default defineComponent({
  name: "ListItem",
  
  components: {AppButton},

  props: {
    data: {
      type: Object,
      required: true
    }
  },
  
  emits: ['delete', 'edit'],
  
  setup(props, {emit}) {
    let data = toRefs(props).data

    const excludeArr = ['id', 'category_id', 'subcategory_id', 'source_id', 'type_id']
    
    const cols = computed(() =>
      Object.fromEntries(Object.entries(data.value).filter(item => !excludeArr.includes(item[0]))))
    
    const deleteItem = () => {
      emit('delete', data.value)
    }
    
    const editItem = () => {
      emit('edit', data.value)
    }

    return {
      cols,
      deleteItem,
      editItem
    }
  }
})
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  padding: 8px 12px;
  align-items: center;
  border: 1px solid grey;
  
  &__inner {
    width: 100%;
    display: flex;
    gap: 20px;
  }
  
  &__controls {
    display: flex;
    gap: 8px;
  }

  &__btn {
    padding: 8px;
  }

  &__icon {
    font-size: 16px;
  }
}
</style>