<template>
  <div class="w-full mx-auto text-right">
    <a
      class="bg-gray-600 hover:bg-blue-800 text-white py-1 px-2 text-sm inline-flex items-center mr-4"
      :href="'https://www.facebook.com/sharer/sharer.php?u=' + this.config.siteUrl"
      title="Share on Facebook"
      itemprop="Facebook"
    >
      <svg
        class="mr-2"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 20 20"
        id="entypo-facebook"
        width="16"
        height="16"
        fill="currentColor"
      >
        <g>
          <path
            d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h7v-7H8V9.525h2v-2.05c0-2.164 1.212-3.684 3.766-3.684l1.803.002v2.605h-1.197c-.994 0-1.372.746-1.372 1.438v1.69h2.568L15 12h-2v7h4c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2z"
          />
        </g>
      </svg>
      Share
    </a>

    <a
      class="bg-gray-600 hover:bg-blue-600 text-white py-1 px-2 text-sm inline-flex items-center"
      :href="'https://twitter.com/intent/tweet?hashtags=' + this.createHashTags + '&text=' + $page.post.title + '&url=' + config.siteUrl + $route.path + '&via=newaeonweb'"
      title="Share on Twitter"
      itemprop="Twitter"
    >
      <svg
        class="mr-2"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 20 20"
        id="entypo-twitter"
        width="16"
        height="16"
        fill="currentColor"
      >
        <g>
          <path
            d="M17.316 6.246c.008.162.011.326.011.488 0 4.99-3.797 10.742-10.74 10.742-2.133 0-4.116-.625-5.787-1.697a7.577 7.577 0 0 0 5.588-1.562 3.779 3.779 0 0 1-3.526-2.621 3.858 3.858 0 0 0 1.705-.065 3.779 3.779 0 0 1-3.028-3.703v-.047a3.766 3.766 0 0 0 1.71.473 3.775 3.775 0 0 1-1.168-5.041 10.716 10.716 0 0 0 7.781 3.945 3.813 3.813 0 0 1-.097-.861 3.773 3.773 0 0 1 3.774-3.773 3.77 3.77 0 0 1 2.756 1.191 7.602 7.602 0 0 0 2.397-.916 3.789 3.789 0 0 1-1.66 2.088 7.55 7.55 0 0 0 2.168-.594 7.623 7.623 0 0 1-1.884 1.953z"
          />
        </g>
      </svg>
      Tweet
    </a>
  </div>
</template>

<script>
import config from "~/.temp/config.js";

export default {
  computed: {
    config() {
      return config;
    },
    createHashTags() {
      if (this.$page.post.keys.length != 0) {
        return this.$page.post.keys;
      } else {
        return ["Webdevelopment"];
      }
    }
  },
  props: {
    tags: String
  }
};
</script>


