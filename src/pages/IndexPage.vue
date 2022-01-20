<template>
  <div class="container" />
</template>

<script lang="ts">
import {ref, defineComponent} from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const currentTabComponent = ref('')
    
    const setCurrentTabComponent = (value: string) => {
      currentTabComponent.value = value
    }
    
    return {
      currentTabComponent,
      setCurrentTabComponent
    }
  }
})
</script>

<style lang="scss" scoped>
.operations {
  
  &__inner {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
