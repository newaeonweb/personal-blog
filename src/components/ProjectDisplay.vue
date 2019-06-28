<template>
  <div class="w-full sm:w-1/2 md:w-1/2 px-4 text-center">
    <div class="rounded overflow-hidden shadow-lg border mt-8">
      <div class="object-cover h-auto w-auto border-b border-gray-800">
        <img class="w-full medium-zoom-image" :src="'/images/projects/' + image" :alt="title">
      </div>

      <div class="px-6 py-4">
        <div class="font-bold font-sans text-xl mb-2">{{ title }}</div>
        <p class="text-gray-700 text-base">{{ description }}</p>
      </div>
      <div class="px-6 py-4 uppercase">
        <span
          v-for="(feature, index) in features"
          :key="`feat-${index}`"
          class="inline-block bg-gray-200 px-3 py-1 text-sm text-gray-700 mr-2 mb-2"
        >{{feature}}</span>
      </div>
    </div>
  </div>

  <!-- <div class="flex flex-wrap border-gray-400 border-dotted border-b-2">
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
  </div>-->
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
