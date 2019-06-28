<template>
  <div class="flex flex-wrap my-12">
    <div class="w-full mb-8 md:mb-0 md:w-1/3">
      <img class="mx-auto medium-zoom-image" :src="'/images/' + image" :alt="title">
    </div>
    <div class="w-full md:w-2/3 px-3">
      <h1 class="mb-2">{{ title }}</h1>
      <p>{{ description }}</p>
      <ul>
        <li v-for="(feature, index) in features" :key="`feat-${index}`">{{ feature }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    title: String,
    description: String,
    features: Array
  }
};
</script>
