<template>
  <div :class="classObject">
    <button
      type="button"
      class="app-select__button"
      tabindex="-1"
      @click="toggleSelect"
    >
      {{ selectName || 'Выберите значение' }}
    </button>

    <div
      v-show="displaySelect"
      class="app-select__dropdown"
    >
      <ul class="app-select__options">
        <li
          v-for="(value, index) in values" 
          :key="value.id"
          class="app-select__option" 
          :tabindex="index + 1"
          @click="changeSelect(value)"
        >
          {{ value.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, toRefs} from 'vue'
import {classObjectType} from "@/types/general.types";
import {values} from "lodash";

export default defineComponent({
  name: 'AppSelect',
  
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    values: {
      type: Array as PropType<{id:number, name: string}[]>,
      required: true
    }
  },
  
  emits: ['update:modelValue'],
  
  setup(props, {emit}) {
    const displaySelect = ref(false)
    const modelValue = toRefs(props).modelValue

    const classObject = computed<classObjectType>(() => {
      return {
        'app-select': true
      }
    })

    const selectName = computed(() => props.values.find(value => value.id === +modelValue.value)?.name)
    
    const toggleSelect = () => {
      displaySelect.value = !displaySelect.value
    }

    const changeSelect = (value: any) => {
      emit('update:modelValue', value.id)
      displaySelect.value = false
    }

    return {
      displaySelect,
      classObject,
      toggleSelect,
      changeSelect,
      selectName
    }
  }
})
</script>

<style lang="scss" scoped>
.app-select__button {
  width: 100%;
  padding: 12px 18px;
  background: white;
  border: 1px solid gray;
  outline: none;
  text-align: left;
}

.app-select__dropdown {
  position: relative;
}

.app-select__options {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background: white;
  list-style: none;
  border: 1px solid gray;
}

.app-select__option {
  padding: 8px 18px;
  border-bottom: 1px solid lightgrey;
  
  &:hover {
    cursor: pointer;
  }
}
</style>