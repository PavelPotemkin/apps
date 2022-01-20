<template>
  <form
    class="app-form"
    @submit.prevent=""
  >
    <slot
      name="fields" 
      v-bind="{ rules, validate, resetForm, resetValidation }"
    />
    
    <slot
      name="default"
      v-bind="{submit}"
    >
      <app-button @click="submit">
        Отправить
      </app-button>
    </slot>
    
    <slot
      name="error"
      v-bind="{errorText}"
    >
      <div class="app-form__error-text">
        {{ errorText }}
      </div>
    </slot>
  </form>
</template>

<script lang="ts">
import {defineComponent, provide, reactive, ref, toRefs} from 'vue'
import {
  FormOptionsInterface,
  FormRulesInterface
} from "@/types/form.types";
import AppButton from "@/components/AppButton.vue";

export default defineComponent({
  name: 'AppForm',
  components: {AppButton},
  props: {
    submitFunction: {
      type: Function,
      default: () => {}
    },
  },
  emits: ['success', 'error'],
  setup(props, {emit}) {
    const submitFunction = props.submitFunction
    
    const errorText = ref('')
    
    const rules: FormRulesInterface = {
      required: v => {
        const isEmpty = (
          v === null ||
          ( typeof v === 'string' && v.length === 0 ) ||
          ( Array.isArray( v ) && v.length === 0 ) ||
          false
        );

        return !isEmpty || 'Обязательное поле';
      },
      phone: v => !v || v.length >= 11 || 'Телефон не может быть меньше 11 символов',
      email: v => !v || /.+@.+\..+/.test( v ) || 'Некорректный email',
    }
    
    const validate = ( silent: boolean = false ) => {
      let isValid: boolean = true
      
      options.items.forEach( item => {
        const errors = item.validate(undefined, silent)
        
        if (errors.length) {
          isValid = false
        }
      })
      
      return isValid
    }
    const resetValidation = () => {
      options.items.forEach( item => {
        item.resetValidation()
      } )
    }
    const resetForm = () => {
      options.items.forEach( item => {
        item.resetForm()
        item.resetValidation()
      } )
    }

    const options: FormOptionsInterface = reactive({
      lazy: true,
      validate: true,
      disabled: false,
      items: []
    })
    
    provide('options', options)
    
    const submit = async () => {
      if (!validate()) {
        return
      }
      
      try {
        const result = await submitFunction()

        emit('success', result)
      } catch (e: any) {
        console.log(e.response)
        errorText.value = e.response.data.errorMessage
        
        emit('error', e)
      }
    }

    return {
      rules,
      options,
      validate,
      resetValidation,
      resetForm,
      submit,
      errorText
    }
  }
})
</script>

<style lang="scss" scoped>
.app-form {
  &__error-text {
    height: 1rem;
    color: orangered;
  }
}
</style>