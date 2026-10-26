import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { recipesApi } from '@/api'
import { useAsync } from '@/composables/useAsync'
import { escapeRegExp } from '@/utils/recipes'

const SORTS = {
  popular: (a, b) => b.likes.length - a.likes.length,
  fast: (a, b) => a.time - b.time,
  title: (a, b) => a.title.localeCompare(b.title, 'ru'),
}

const asArray = (value) => [].concat(value ?? []).filter(Boolean)

export function useRecipeFilters() {
  const route = useRoute()
  const router = useRouter()

  const filters = reactive({
    q: route.query.q || '',
    type: route.query.type || '',
    difficulty: asArray(route.query.difficulty),
    ingredients: asArray(route.query.ingredients),
    time: route.query.time || '',
    sort: route.query.sort || 'popular',
  })

  const { data, loading, error, run } = useAsync(async () => {
    const { data } = await recipesApi.getAll({
      title_like: escapeRegExp(filters.q.trim()) || undefined,
      type: filters.type || undefined,
      difficulty: filters.difficulty,
      time_lte: filters.time || undefined,
    })
    return data
  })

  const results = computed(() =>
    (data.value || [])
      .filter((recipe) => filters.ingredients.every((item) => recipe.tags.includes(item)))
      .sort(SORTS[filters.sort]),
  )

  function reset() {
    Object.assign(filters, {
      q: '',
      type: '',
      difficulty: [],
      ingredients: [],
      time: '',
      sort: 'popular',
    })
  }

  let timer
  watch(
    () => ({
      ...filters,
      difficulty: [...filters.difficulty],
      ingredients: [...filters.ingredients],
    }),
    (value) => {
      const query = Object.fromEntries(
        Object.entries(value).filter(
          ([key, item]) =>
            (Array.isArray(item) ? item.length : item) && !(key === 'sort' && item === 'popular'),
        ),
      )
      router.replace({ query })
      clearTimeout(timer)
      timer = setTimeout(run, 300)
    },
  )

  run()

  return { filters, results, loading, error, reset, reload: run }
}
