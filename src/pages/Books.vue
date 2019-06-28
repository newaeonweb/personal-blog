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
      title: "Books",
      meta: [
        {
          key: "description",
          name: "description",
          content: "My Tech books about fullStack JavaScript development available on @packtpub."
        },

        { property: "og:type", content: "Books" },
        { property: "og:title", content: "Books" },
        {
          property: "og:description",
          content: "My Tech books about fullStack JavaScript development available on @packtpub."
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
          content: "My Tech books about fullStack JavaScript development available on @packtpub."
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
