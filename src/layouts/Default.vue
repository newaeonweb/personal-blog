<template>
  <div class="relative w-full min-h-screen" id="top">
    <nav class="font-sans">
      <ul class="flex items-stretch max-w-4xl mx-auto p-4">
        <li class="flex-1 text-center">
          <g-link to="/" class>Home</g-link>
        </li>
        <li class="flex-1 text-center">
          <g-link to="/books" class>Books</g-link>
        </li>
        <li class="flex-1 text-center">
          <g-link to="/projects" class>Projects</g-link>
        </li>
        <li class="flex-1 text-center">
          <g-link to="/articles" class>Articles</g-link>
        </li>
      </ul>
    </nav>
    <div class="w-full">
      <slot/>
    </div>
    <div class="w-full mx-auto text-center">
        <a
          class="text-gray-400 hover:text-orange-400"
          v-if="$route.path === '/books' || $route.path === '/projects' || $route.path === '/articles'"
          href="#"
          v-scroll-to="'#app'"
          rel="noopener noreferrer"
        ><svg class="mx-auto text-center" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" id="entypo-chevron-with-circle-up" width="32" height="32" fill="currentColor"><g><path d="M10.359 7.785a.51.51 0 0 0-.717 0l-2.864 2.807a.498.498 0 0 0 0 .71.51.51 0 0 0 .717 0L10 9l2.506 2.302a.512.512 0 0 0 .718 0 .5.5 0 0 0 0-.71l-2.865-2.807zM10 .4A9.6 9.6 0 0 0 .4 10c0 5.303 4.298 9.6 9.6 9.6s9.6-4.297 9.6-9.6A9.6 9.6 0 0 0 10 .4zm0 17.954A8.353 8.353 0 0 1 1.646 10 8.354 8.354 0 1 1 10 18.354z"/></g></svg></a>
    </div>
    <footer class="absolute bottom-0 bottom-auto w-full">      
      <site-footer/>
    </footer>
  </div>
</template>

<script>
import config from "~/.temp/config.js";
import SiteFooter from "@/components/Footer";

export default {
  components: {
    SiteFooter
  },
  computed: {
    config() {
      return config;
    }
  }
};
</script>

<style src="~/assets/css/main.css"></style>
