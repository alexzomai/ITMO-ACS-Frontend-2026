import instance from '@/api/instance'
import RecipesApi from '@/api/recipes'

const recipesApi = new RecipesApi(instance)

export { recipesApi }
