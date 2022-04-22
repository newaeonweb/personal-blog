<template>
  <div class="flex flex-wrap my-12 shadow rounded">
    <div class="w-full md:mb-0 md:w-1/3">
      <img class="mx-auto medium-zoom-image pt-4 pr-4 pl-4" :src="'/images/' + image" :alt="title" />
      <div class="font-light h-6 text-center text-sm">
        <span class="text-gray-800">Pages: {{ pages }} | Release: {{ release }}</span>
      </div>
    </div>
    <div class="w-full md:w-2/3 px-3 mt-4">
      <h1 class="mb-2 font-sans">{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="mt-3">
        <p class="border-b font-sans mb-1 pb-1">Learn:</p>
        <ul class="list-disc pl-10 pb-4 text-gray-800">
          <li v-for="(feature, index) in features" :key="`feat-${index}`">{{ feature }}</li>
        </ul>
      </div>
    </div>
    <div class="w-full text-center md:text-right pr-4 pb-5">
      <a
        :href="link"
        target="_blank"
        class="bg-blue-700 hover:bg-orange-700 text-white text-sm py-2 px-4"
      >Buy this book on Packtpub</a>
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
    features: Array,
    link: String
  }
};
</script>
