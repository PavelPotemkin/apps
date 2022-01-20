<template>
  <the-header />

  <main>
    <router-view />
  </main>
  
  <the-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from "@/layouts/TheFooter.vue";
import {useStore} from "@/store";
import {
  CATEGORY_STORE, OPERATION_STORE,
  SOURCE_STORE,
  SUBCATEGORY_STORE,
  TYPE_STORE
} from "@/store/constants";

export default defineComponent({
  name: 'App',
  components: {TheFooter, TheHeader},
  setup() {
    const store = useStore()

    store.dispatch(SOURCE_STORE.ACTIONS.GET_SOURCES)
    store.dispatch(TYPE_STORE.ACTIONS.GET_TYPES)
    store.dispatch(CATEGORY_STORE.ACTIONS.GET_CATEGORIES)
    store.dispatch(SUBCATEGORY_STORE.ACTIONS.GET_SUBCATEGORIES)
    store.dispatch(OPERATION_STORE.ACTIONS.GET_OPERATIONS)
  }
})
</script>
