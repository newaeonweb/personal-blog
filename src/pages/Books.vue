<template>
  <Layout>
    <main class="max-w-4xl mx-auto px-4 py-8 md:p-8">
      <page-header
        title="Books"
        description="JavaScript/TypeScript, NodeJS, DevOps Technical books"
      />
      <article>
        <book-display
          v-for="book in books"
          :key="book.id"
          :image="book.image"
          :pages="book.pages"
          :release="book.release"
          :title="book.title"
          :description="book.description"
          :features="book.features"
          :link="book.link"
        />
      </article>
    </main>
  </Layout>
</template>

<script>
import config from "~/.temp/config.js";
import PageHeader from "@/components/PageHeader";
import BookDisplay from "@/components/BookDisplay";

// Load books from file
import books from "~/data/books.json";

export default {
  components: {
    PageHeader,
    BookDisplay
  },
  mounted() {
    import("medium-zoom").then(mediumZoom => {
      this.zoom = mediumZoom.default("img");
    });
  },
  data: function() {
    return {
      books
    };
  },
  metaInfo() {
    return {
      title: "Books",
      meta: [
        {
          key: "description",
          name: "description",
          content:
            "My Tech books about fullStack JavaScript development available on @packtpub."
        },

        { property: "og:type", content: "Books" },
        { property: "og:title", content: "Books" },
        {
          property: "og:description",
          content:
            "My Tech books about fullStack JavaScript development available on @packtpub."
        },
        { property: "og:url", content: `${this.config.siteUrl}/books/` },
        {
          property: "og:image",
          content: "/images/fullstack-angular-laravel-docker.png"
        },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Books" },
        {
          name: "twitter:description",
          content:
            "My Tech books about fullStack JavaScript development available on @packtpub."
        },
        { name: "twitter:site", content: "@newaeonweb" },
        { name: "twitter:creator", content: "@newaeonweb" },
        {
          name: "twitter:image",
          content: "/images/fullstack-angular-laravel-docker.png"
        }
      ]
    };
  },
  computed: {
    config() {
      return config;
    }
  }
};
</script>
