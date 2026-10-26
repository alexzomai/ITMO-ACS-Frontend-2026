<template>
  <base-layout>
    <h1>Вкусная лента</h1>

    <form class="d-flex flex-column flex-sm-row gap-2 my-4" @submit.prevent>
      <label for="search" class="visually-hidden">Поиск</label>
      <input
        id="search"
        v-model="search"
        type="search"
        class="form-control"
        placeholder="Поиск по названию"
      />
      <select v-model="type" class="form-select" aria-label="Тип блюда">
        <option value="">Все типы</option>
        <option v-for="item in types" :key="item">{{ item }}</option>
      </select>
    </form>

    <p v-if="filtered.length === 0" class="text-muted">Ничего не нашлось</p>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="recipe in filtered" :key="recipe.id" class="col">
        <recipe-card
          :title="recipe.title"
          :image="recipe.image"
          :type="recipe.type"
          :difficulty="recipe.difficulty"
          :time="recipe.time"
          :description="recipe.description"
          :likes="recipe.likes.length"
        />
      </div>
    </div>
  </base-layout>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import BaseLayout from '@/layouts/BaseLayout.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import useRecipesStore from '@/stores/recipes'

export default {
  name: 'RecipesPage',

  components: { BaseLayout, RecipeCard },

  data() {
    return {
      search: '',
      type: '',
      types: ['Супы', 'Основные блюда', 'Завтраки', 'Салаты', 'Десерты'],
    }
  },

  computed: {
    ...mapState(useRecipesStore, ['recipes']),

    filtered() {
      const search = this.search.trim().toLowerCase()
      return this.recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(search) && (!this.type || recipe.type === this.type),
      )
    },
  },

  methods: {
    ...mapActions(useRecipesStore, ['loadRecipes']),
  },

  mounted() {
    this.loadRecipes()
  },
}
</script>
