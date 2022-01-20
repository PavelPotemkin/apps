<template>
  <div
    v-if="modelValue"
    class="app-popup-wrapper"
    tabindex="1"
    @click="close"
  >
    <div
      class="app-popup"
      @click.stop=""
    >
      <slot name="close-icon">
        <button
          class="cursor-pointer app-popup__close"
          @click="close"
        >
          <span class="material-icons">close</span>
        </button>
      </slot>

      <div class="app-popup__inner">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'AppPopup',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    function close() {
      emit('update:modelValue', false)
    }

    return {
      close
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins/index.scss";

.app-popup-wrapper {
  background: rgba(0, 0, 0.1, 0.1);
  @include position-fixed-center-vh;
  @include flex-center-vh;
  
  &:hover {
    cursor: pointer;
  }
}

.app-popup {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 32px;

  &:hover {
    cursor: default;
  }

  &__close {
    position: absolute;
    top: 8px;
    right: 8px;
  }
}
</style>