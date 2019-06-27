<template>
  <header class="text-center border-b-2 border-dotted pt-12 pb-12">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-1">{{ title }}</h1>
    <p class="text-gray-600 text-lg sm:text-3xl">{{ description }}</p>
  </header>
</template>

<script>
export default {
  props: ["title", "description"]
};
</script>
