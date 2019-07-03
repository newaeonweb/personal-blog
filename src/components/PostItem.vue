<template>
  <article>
    <div class="py-8 sm:py-12 border-b">
      <header class="mb-8">
        <div>
          <time
            :datetime="post.datetime"
            class="text-gray-700 mb-2 uppercase"
          >{{ formatPublishDate(post.datetime) }}</time>
          <span v-if="post.tags && post.tags.length > 0">
            in
            <g-link
              :to="`${post.tags[0].path}/`"
              class="text-gray-700 capitalize border-b border-transparent hover:border-gray-400 transition-border-color"
            >{{ titleCase(post.tags[0].title) }}</g-link>
          </span>
        </div>

        <h2 class="text-3xl sm:text-4xl leading-tight font-sans mb-1 sm:mb-2">
          <g-link
            :to="`${post.path}/`"
            class="text-gray-800 hover:text-orange-600 font-bold"
          >{{ post.title }}</g-link>
        </h2>
      </header>
      <p class="text-gray-700" v-html="excerpt(post, 280, ' ...')"></p>
    </div>
  </article>
</template>

<script>
import moment from "moment";

export default {
  props: ["post"],
  computed: {
    formattedPublishDate() {
      return moment(this.post.datetime).format("DD MMMM, YYYY");
    }
  },
  methods: {
    formatPublishDate(date) {
      return moment(date).format("DD MMMM, YYYY");
    },
    excerpt(post, length, clamp) {
      if (post.excerpt) {
        return post.excerpt;
      }

      length = length || 280;
      clamp = clamp || " ...";
      let text = post.content
        .replace(/<pre(.|\n)*?<\/pre>/gm, "")
        .replace(/<[^>]+>/gm, "");

      return text.length > length ? `${text.slice(0, length)}${clamp}` : text;
    },
    titleCase(str) {
      return str
        .replace("-", " ")
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    }
  }
};
</script>
