<template>
  <div class="flex flex-wrap my-12">
    <div class="w-full mb-8 md:mb-0 md:w-1/3">
      <img class="mx-auto medium-zoom-image" :src="'/images/' + image" :alt="title">
      <div class="bg-gray-300 font-light h-6 text-center text-sm">
        <span>Pages: {{ pages }} | Release: {{ release }}</span>
      </div>
    </div>
    <div class="w-full md:w-2/3 px-3">
      <h1 class="mb-2 font-sans">{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="mt-3">
        <p class="border-b font-sans mb-1 pb-1">Learn:</p>
        <ul class="list-disc pl-10 pb-4 text-gray-800">
          <li v-for="(feature, index) in features" :key="`feat-${index}`">{{ feature }}</li>
        </ul>
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
    pages: String,
    release: String,
    features: Array
  }
};
</script>
