<template>
  <Layout>
    <main class="max-w-4xl mx-auto px-4 py-8 md:p-8">
      <header class="text-center border-b-2 border-dotted pt-12 pb-12">
        <div class="flex flex-col-reverse mx-auto">
          <p
            class="text-gray-700 leading-normal"
          >{{ $page.tag.belongsTo.totalCount }} posts in total</p>
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-2 capitalize"
          >{{ titleCase($page.tag.title) }}</h1>
        </div>
      </header>
      <section>
        <post-item v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node"/>
      </section>
      <pagination
        :base="`${$page.tag.path}`"
        :info="$page.tag.belongsTo.pageInfo"
        v-if="$page.tag.belongsTo.pageInfo.totalPages > 1"
      />
    </main>
  </Layout>
</template>

<script>
import moment from "moment";
import config from "~/.temp/config.js";
import PostItem from "@/components/PostItem";
import SiteFooter from "@/components/Footer";
import Pagination from "@/components/Pagination";

export default {
  components: {
    PostItem,
    Pagination,
    SiteFooter
  },
  metaInfo() {
    return {
      title: `Posts tagged "${this.titleCase(this.$page.tag.title)}"`,
      meta: [
        {
          key: "description",
          name: "description",
          content: `Browse posts tagged "${this.titleCase(
            this.$page.tag.title
          )}"`
        },

        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: `Posts tagged "${this.titleCase(this.$page.tag.title)}"`
        },
        {
          property: "og:description",
          content: `Browse posts tagged "${this.titleCase(
            this.$page.tag.title
          )}"`
        },
        {
          property: "og:url",
          content: `${this.config.siteUrl}/${this.$page.tag.path}/`
        },
        { property: "og:image", content: this.ogImageUrl },

        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: `Posts tagged "${this.titleCase(this.$page.tag.title)}"`
        },
        {
          name: "twitter:description",
          content: `Browse posts tagged "${this.titleCase(
            this.$page.tag.title
          )}"`
        },
        { name: "twitter:site", content: "@newaeonweb" },
        { name: "twitter:creator", content: "@newaeonweb" },
        { name: "twitter:image", content: this.ogImageUrl }
      ]
    };
  },
  methods: {
    titleCase(str) {
      return str
        .replace("-", " ")
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    }
  },
  computed: {
    config() {
      return config;
    },
    ogImageUrl() {
      return `${
        this.config.siteUrl
      }/images/fullstack-angular-laravel-docker.png`;
    }
  }
};
</script>

<page-query>
query Tag ($path: String!, $page: Int) {
  tag (path: $path) {
    id
    title
    path
    belongsTo (page: $page, perPage: 6) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ...on Post {
            id
            title
            datetime: date (format: "YYYY-MM-DD HH:mm:ss")
            path
            content
            excerpt
            description
            author {
              id
              title
              path
            }
          }
        }
      }
    }
  }
}
</page-query>
