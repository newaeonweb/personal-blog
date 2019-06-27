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
      title: "Articles",
      meta: [
        {
          key: "description",
          name: "description",
          content:
            "Tech articles about: Angular, React, Vue, NodeJS e fullstack development."
        },

        { property: "og:type", content: "Article" },
        { property: "og:title", content: "Articles" },
        {
          property: "og:description",
          content:
            "Tech articles about: Angular, React, Vue, NodeJS e fullstack development."
        },
        { property: "og:url", content: `${this.config.siteUrl}/articles/` },
        {
          property: "og:image",
          content: "/images/fullstack-angular-laravel-docker.png"
        },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Articles" },
        {
          name: "twitter:description",
          content:
            "Tech articles about: Angular, React, Vue, NodeJS e fullstack development."
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
