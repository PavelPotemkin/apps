<template>
  <button
    :class="classObject"
    @click="emitClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import {classObjectType} from "@/types/general.types";

export default defineComponent({
  name: 'AppButton',
  props: {},
  emits: ['click'],
  setup(props, {emit}) {
    function emitClick() {
      emit('click')
    }

    const classObject = computed<classObjectType>(() => {
      return {
        'app-button': true
      }
    })
    
    return {
      emitClick,
      classObject
    }
  }
})
</script>

<style scoped>
.app-button {
  padding: 8px 16px;
  background: white;
  border: 1px solid gray;
}
</style>