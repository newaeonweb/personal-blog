<template>
  <Layout>
    <main class="max-w-4xl mx-auto px-4 py-8 md:p-8">
      <header>
        <div class="text-center border-b-2 border-dotted pt-12 pb-12">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-2 capitalize"
          >{{ titleCase($page.author.title) }}</h1>
        </div>
      </header>
      <section>
        <post-item
          v-for="edge in $page.author.belongsTo.edges"
          :key="edge.node.id"
          :post="edge.node"
        />
      </section>
      <pagination
        :base="`${$page.author.path}`"
        :info="$page.author.belongsTo.pageInfo"
        v-if="$page.author.belongsTo.pageInfo.totalPages > 1"
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
      title: `Posts written by ${this.titleCase(this.$page.author.title)}`,
      meta: [
        {
          key: "description",
          name: "description",
          content: `Browse posts written by ${this.titleCase(
            this.$page.author.title
          )}`
        },

        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: `Posts written by ${this.titleCase(this.$page.author.title)}`
        },
        {
          property: "og:description",
          content: `Browse posts written by ${this.titleCase(
            this.$page.author.title
          )}`
        },
        {
          property: "og:url",
          content: `${this.config.siteUrl}/${this.$page.author.path}/`
        },
        { property: "og:image", content: this.ogImageUrl },

        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: `Posts written by ${this.titleCase(this.$page.author.title)}`
        },
        {
          name: "twitter:description",
          content: `Browse posts written by ${this.titleCase(
            this.$page.author.title
          )}`
        },
        { name: "twitter:site", content: "@cossssmin" },
        { name: "twitter:creator", content: "@cossssmin" },
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
      return `${this.config.siteUrl}/images/bleda-card.png`;
    }
  }
};
</script>

<page-query>
query Author ($path: String!, $page: Int) {
  author (path: $path) {
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
            tags {
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
