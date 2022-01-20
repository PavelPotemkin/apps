<template>
  <header class="header">
    <nav class="nav-items">
      <router-link
        to="/"
        class="nav-item h5"
      >
        Главная
      </router-link>
      
      <router-link
        active-class=""
        to="/types"
        class="nav-item h5"
      >
        Типы
      </router-link>

      <router-link
        active-class=""
        to="/sources"
        class="nav-item h5"
      >
        Источники
      </router-link>

      <router-link
        active-class=""
        to="/categories"
        class="nav-item h5"
      >
        Категории
      </router-link>

      <router-link
        active-class=""
        to="/subcategories"
        class="nav-item h5"
      >
        Подкатегории
      </router-link>

      <router-link
        active-class=""
        to="/operations"
        class="nav-item h5"
      >
        Операции
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheHeader',
})
</script>

<style lang="scss" scoped>
.header {
  padding: 25px 20px 30px;
}

.nav-items {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-item.router-link-exact-active {
  color: darkorange;
}
</style>
