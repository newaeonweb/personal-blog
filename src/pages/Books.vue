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
          :title="book.title"
          :description="book.description"
        />
      </article>
    </main>
  </Layout>
</template>

<script>
import config from "~/.temp/config.js";
import PageHeader from "@/components/PageHeader";
import BookDisplay from "@/components/BookDisplay";

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
      books: [
        {
          image: "fullstack-angular-laravel-docker.png",
          title:
            "Hands-On Full Stack Web Development with Angular 6 and Laravel 5",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quod laboriosam atque commodi aperiam aliquam consequuntur, error cumque perspiciatis quas expedita corporis dolorem vero libero incidunt necessitatibus vel eligendi nemo."
        },
        {
          image: "node.JS-6.x-blueprints.jpg",
          title: "Node.js 6.x Blueprints",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quod laboriosam atque commodi aperiam aliquam consequuntur, error cumque perspiciatis quas expedita corporis dolorem vero libero incidunt necessitatibus vel eligendi nemo."
        },
        {
          image: "angularJS-directives-cookbook.jpg",
          title: "AngularJS Directives Cookbook",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quod laboriosam atque commodi aperiam aliquam consequuntur, error cumque perspiciatis quas expedita corporis dolorem vero libero incidunt necessitatibus vel eligendi nemo."
        },
        {
          image: "learning-single-page-web-application-development.jpg",
          title: "Learning Single-page Web Application Development",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quod laboriosam atque commodi aperiam aliquam consequuntur, error cumque perspiciatis quas expedita corporis dolorem vero libero incidunt necessitatibus vel eligendi nemo."
        },
        {
          image: "HTML5-responsive-table-design.jpg",
          title: "HTML5 Responsive Table Design",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quod laboriosam atque commodi aperiam aliquam consequuntur, error cumque perspiciatis quas expedita corporis dolorem vero libero incidunt necessitatibus vel eligendi nemo."
        },
        {
          image: "node-projects-video.jpg",
          title: "Node Projects Video",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quod laboriosam atque commodi aperiam aliquam consequuntur, error cumque perspiciatis quas expedita corporis dolorem vero libero incidunt necessitatibus vel eligendi nemo."
        },
        {
          image: "nodejs-creating-applications-from-scratch.jpg",
          title: "Node.js: Creating Applications from Scratch",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quod laboriosam atque commodi aperiam aliquam consequuntur, error cumque perspiciatis quas expedita corporis dolorem vero libero incidunt necessitatibus vel eligendi nemo."
        }
      ]
    };
  },
  metaInfo() {
    return {
      title: "About",
      meta: [
        {
          key: "description",
          name: "description",
          content: "Introduction to the Bleda blog starter for Gridsome."
        },

        { property: "og:type", content: "article" },
        { property: "og:title", content: "About" },
        {
          property: "og:description",
          content: "Introduction to the Bleda blog starter for Gridsome."
        },
        { property: "og:url", content: `${this.config.siteUrl}/books/` },
        { property: "og:image", content: "/images/bleda-card.png" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "About" },
        {
          name: "twitter:description",
          content: "Introduction to the Bleda blog starter for Gridsome."
        },
        { name: "twitter:site", content: "@cossssmin" },
        { name: "twitter:creator", content: "@cossssmin" },
        { name: "twitter:image", content: "/images/bleda-card.png" }
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
