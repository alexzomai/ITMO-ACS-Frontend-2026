class RecipesApi {
  constructor(instance) {
    this.API = instance
  }

  getAll = async () => {
    return this.API({
      url: '/recipes',
      params: { _embed: 'likes' },
    })
  }
}

export default RecipesApi
