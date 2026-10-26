<template>
  <article class="card h-100">
    <img :src="image" class="card-img-top recipe-card__img" :alt="title" loading="lazy" />
    <div class="card-body">
      <h2 class="card-title h5">{{ title }}</h2>
      <p class="card-text text-muted small mb-2">{{ type }} · {{ difficulty }} · {{ time }} мин</p>
      <p class="card-text">{{ description }}</p>
    </div>
    <div class="card-footer bg-transparent">Нравится: {{ likes }}</div>
  </article>
</template>

<script>
export default {
  name: 'RecipeCard',

  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
}
</script>
