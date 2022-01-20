<template>
  <app-popup v-model="popupDisplay">
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

  <app-button @click="showPopup">
    {{ buttonName }}
  </app-button>
</template>

<script lang="ts">
import {ref, defineComponent} from "vue";
import AppPopup from "@/components/AppPopup.vue";
import AppButton from "@/components/AppButton.vue";
import AppForm from "@/components/AppForm.vue";

export default defineComponent({
  name: "AddItem",

  components: {AppForm, AppButton, AppPopup},

  props: {
    buttonName: {
      type: String,
      default: 'Добавить'
    },
    submitFunction: {
      type: Function,
      required: true
    }
  },

  emits: ['success'],

  setup(props, {emit}) {
    const popupDisplay = ref(false)

    const hidePopup = () => {
      popupDisplay.value = false
    }

    const showPopup = () => {
      popupDisplay.value = true
    }

    const emitSuccess = (data: any) => {
      hidePopup()
      emit('success', data)
    }

    return {
      popupDisplay,
      showPopup,
      emitSuccess,
    }
  }
})
</script>
<style scoped>

</style>