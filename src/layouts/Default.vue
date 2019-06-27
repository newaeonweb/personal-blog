<template>
  <div class="relative w-full min-h-screen">
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
