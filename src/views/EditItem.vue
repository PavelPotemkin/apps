<template>
  <app-popup
    :model-value="modelValue"
    @update:modelValue="updatePopup"
  >
    <app-form
      :submit-function="submitFunction"
      @success="emitSuccess"
    >
      <template #fields="{rules}">
        <slot
          name="fields"
          v-bind="{rules}"
        />
      </template>
    </app-form>
  </app-popup>
</template>

<script lang="ts">
import {ref, defineComponent} from "vue";
import AppPopup from "@/components/AppPopup.vue";
import AppForm from "@/components/AppForm.vue";

export default defineComponent({
  name: "EditItem",

  components: {AppForm, AppPopup},

  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    buttonName: {
      type: String,
      default: 'Добавить'
    },
    submitFunction: {
      type: Function,
      required: true
    }
  },

  emits: ['success', 'update:modelValue'],

  setup(props, {emit}) {
    const popupDisplay = ref(false)

    const hidePopup = () => {
      emit('update:modelValue', false)
    }
    
    const updatePopup = (value: boolean) => {
      emit('update:modelValue', value)
    }

    const emitSuccess = (data: any) => {
      hidePopup()
      emit('success', data)
    }

    return {
      popupDisplay,
      updatePopup,
      emitSuccess,
    }
  }
})
</script>
<style scoped>

</style>