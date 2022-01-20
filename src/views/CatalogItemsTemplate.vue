<template>
  <div class="container catalog">
    <div class="catalog__controls">
      <slot name="controls" />
    </div>

    <div class="catalog__inner">
      <slot name="inner" />
    </div>

    <slot name="outer" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CatalogItemsTemplate",
})
</script>
