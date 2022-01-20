<template>
  <div :class="classObject">
    <label>
      <input
        v-focus="focus"
        class="app-text-field__input"
        :value="modelValue"
        :placeholder="placeholder"
        type="text"
        @[eventTypeHandle]="inputHandler"
      >
    </label>

    <span class="app-text-field__error-text">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
  ref, toRefs,
} from 'vue'
import {
  FormOptionsInterface,
  formRuleType, textFieldResetFormType, textFieldResetValidationType,
  textFieldValidationType
} from "@/types/form.types";
import {classObjectType} from "@/types/general.types";

export default defineComponent({
  name: "AppTextField",

  props: {
    modelValue: {
      type: String,
      required: true
    },
    rules: {
      type: Array as PropType<formRuleType[]>,
      default: null
    },
    eventTypeHandle: {
      type: String as PropType<'input' | 'change'>,
      default: 'input'
    },
    placeholder: {
      type: String,
      default: ''
    },
    focus: {
      type: Boolean,
      default: false
    }
  },

  emits: ['input', 'change', 'update:modelValue'],

  setup(props, {emit}) {
    const rules = props.rules
    const eventTypeHandle = props.eventTypeHandle
    const modelValue = toRefs(props).modelValue

    const options: FormOptionsInterface | undefined = inject('options')

    const errors = ref<string[]>([])
    const errorMessage = computed(() => errors.value[0])

    const classObject = computed<classObjectType>(() => {
      return {
        'app-text-field': true,
        'app-text-field--has-error': errors.value.length > 0
      }
    })

    const emitChange = (value: string) => {
      emit(eventTypeHandle, value)
      emit('update:modelValue', value)
    }

    const validate: textFieldValidationType = (value: string = modelValue.value, silent = false) => {
      if (!rules) return []
      
      rules.forEach(rule => {
        const validateResult = rule(value)

        if (!silent && typeof validateResult === 'string') {
          errors.value.push(validateResult)
        }
      })
      
      return errors.value
    }

    const resetValidation: textFieldResetFormType = () => {
      errors.value = []
    }
    
    const resetForm: textFieldResetValidationType = () => {
      emit('update:modelValue', '')
    }

    const inputHandler = (event: Event) => {
      errors.value = []

      const value = (event.target as HTMLInputElement).value

      validate(value)

      emitChange(value)
    };

    options && options.items.push({
      validate,
      resetValidation,
      resetForm
    })

    return {
      inputHandler,
      classObject,
      errors,
      errorMessage
    }
  }
})
</script>

<style lang="scss" scoped>
.app-text-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  &__input {
    width: 100%;
    padding: 12px 18px;
    background: white;
    border: 1px solid gray;
    outline: none;
  }

  &__error-text {
    height: 1rem;
    color: orangered;
  }
  
  &--has-error .app-text-field__input {
    border-color: red;
  }
}
</style>