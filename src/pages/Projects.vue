<template>
  <Layout>
    <main class="max-w-4xl mx-auto px-4 py-8 md:p-8">
      <page-header
        title="Projects"
        description="OpenSource: Angular, React, NodeJS, Laravel, Docker"
      />
      <article class="flex flex-wrap -mx-4">
        <project-display
          v-for="project in projects"
          :key="project.id"
          :image="project.image"
          :title="project.title"
          :description="project.description"
          :features="project.features"
        />
      </article>
    </main>
  </Layout>
</template>

<script>
import config from "~/.temp/config.js";
import PageHeader from "@/components/PageHeader";
import ProjectDisplay from "@/components/ProjectDisplay";

// Import projects data
import projects from "~/data/projects.json";

export default {
  components: {
    PageHeader,
    ProjectDisplay
  },
  mounted() {
    import("medium-zoom").then(mediumZoom => {
      this.zoom = mediumZoom.default("img");
    });
  },
  data: function() {
    return {
      projects
    };
  },
  metaInfo() {
    return {
      title: "Projects",
      meta: [
        {
          key: "description",
          name: "description",
          content:
            "OpenSource projects and boilerplate codes: Angular, React, Laravel, Docker, ..."
        },

        { property: "og:type", content: "Projects" },
        { property: "og:title", content: "Projects" },
        {
          property: "og:description",
          content:
            "OpenSource projects and boilerplate codes: Angular, React, Laravel, Docker, ..."
        },
        { property: "og:url", content: `${this.config.siteUrl}/projects/` },
        {
          property: "og:image",
          content: "/images/fullstack-angular-laravel-docker.png"
        },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Projects" },
        {
          name: "twitter:description",
          content:
            "OpenSource projects and boilerplate codes: Angular, React, Laravel, Docker, ..."
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
