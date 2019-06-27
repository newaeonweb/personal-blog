<template>
  <Layout>
    <main class="max-w-4xl mx-auto px-4 py-8 md:p-8">
      <page-header
        title="Articles"
        description="JavaScript, TypeScript, Angular, Vue, NodeJS, Laravel and more..."
      />
      <section>
        <post-item v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
        <pagination :info="$page.posts.pageInfo" v-if="$page.posts.pageInfo.totalPages > 1"/>
      </section>
    </main>
  </Layout>
</template>

<script>
import config from "~/.temp/config.js";
import PageHeader from "@/components/PageHeader";
import PostItem from "@/components/PostItem";
import Pagination from "@/components/Pagination";

export default {
  components: {
    PageHeader,
    PostItem,
    Pagination
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
<page-query>
  query Home ($page: Int) {
    posts: allPost (page: $page, perPage: 6) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          datetime: date (format: "YYYY-MM-DD HH:mm:ss")
          content
          excerpt
          description
          path
          cover
          tags {
            id
            title
            path
          }
          author {
            id
            title
            path
          }
        }
      }
    }
  }
</page-query>
