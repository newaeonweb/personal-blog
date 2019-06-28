<template>
  <div class="flex flex-wrap border-gray-400 border-dotted border-b-2">
    <div class="w-4/5 mx-auto">
      <h1 class="my-4 text-center">{{ title }}</h1>
      <div class="my-4">
        <img
          class="mx-auto border-2 medium-zoom-image"
          :src="'/images/projects/' + image"
          :alt="title"
        >
      </div>
      <p class="text-gray-700 p-2">{{ description }}</p>
      <div class="uppercase text-center mt-4 mb-8">
        <strong class="block mb-2">Stack:</strong>
        <span class="text-gray-600">
          <ul class="flex flex-wrap items-center">
            <li
              class="inline p-2"
              v-for="(feature, index) in features"
              :key="`feat-${index}`"
            >{{ feature }}</li>
          </ul>
        </span>
      </div>
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
