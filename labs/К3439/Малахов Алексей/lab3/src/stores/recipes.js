import { defineStore } from 'pinia'
import { recipesApi } from '@/api'

const useRecipesStore = defineStore('recipes', {
  state: () => ({
    recipes: [],
  }),

  actions: {
    async loadRecipes() {
      const response = await recipesApi.getAll()

      this.recipes = response.data

      return response
    },
  },
})

export default useRecipesStore
