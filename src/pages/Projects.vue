<template>
  <Layout>
    <main class="max-w-4xl mx-auto px-4 py-8 md:p-8">
      <page-header
        title="Projects"
        description="OpenSource: Angular, React, NodeJS, Laravel, Docker"
      />
      <article>
        <project-display
          v-for="project in projects"
          :key="project.id"
          :image="project.image"
          :title="project.title"
          :description="project.description"
          :stack="project.stack"
        />
      </article>
    </main>
  </Layout>
</template>

<script>
import config from "~/.temp/config.js";
import PageHeader from "@/components/PageHeader";
import ProjectDisplay from "@/components/ProjectDisplay";

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
      projects: [
        {
          image: "responsiveboilerplatecover.jpg",
          title: "Responsive Boilerplate",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quod laboriosam atque commodi aperiam aliquam consequuntur, error cumque perspiciatis quas expedita corporis dolorem vero libero incidunt necessitatibus vel eligendi nemo.",
          stack: "HTML5, CSS3, JavaScript"
        },
        {
          image: "newaeonserver.png",
          title: "JWT NewAeonServer",
          description:
            "Fake back-end Restful API powered by JsonWebToken, Json-Server and ApiDoc. A small deadly simple server, including endpoints to: Signup, Login, Refresh Token, Chance Profile Password, Reset Password and User Roles.",
          stack: "JavaScript, NodeJS, JsonServer, JsonWebToken, APIDoc, Chota"
        },
        {
          image: "trellometrics.png",
          title: "TrelloMetrics",
          description:
            "The easiest way for teams to track their work and results when working with Trello boards. Using Trello API and authentication to view your team boards, projects and members, including a lot of graphics.",
          stack:
            "AngulaJS 1.5, ChartJS, C3JS, D3JS, Satelizer, Bootstrap, Heroku, CodeShip"
        },
        {
          image: "genomeasy.png",
          title: "Genomeasy",
          description:
            "Genomeasy is a browser-based genome viewer. It is designed to facilitate the investigation of evidence for genomic variants within larger web applications.",
          stack: "React, Bootstrap, JQuery, PileupJS, Heroku, Circle CI"
        },
        {
          image: "frontendboilerplate.png",
          title: "Frontend Boilerplate",
          description:
            "Frontend Boilerplate is a simple Gruntfile and directory structure for an easy starting point with web applications using: Grunt and Bower. It is designed to give you a quick and organized way to start developing web apps with best practices in mind.",
          stack: "GruntJS, Bower, Sass, Less, HTML5, Yeoman"
        },
        {
          image: "generator-angm.png",
          title: "ANGM-Generator",
          description:
            "AngularJS Yeoman Generator to help you getting started with a new project based on AngularJS and Angular Material to build large scale applications. ",
          stack: "AngularJS, Angular-Material, Yeoman"
        },
        {
          image: "responsiveaeoncover.jpg",
          title: "ResponsiveAeon CSS Grid",
          description:
            "Lightweight Responsive CSS Grid System, build to be Simple Fast and Intuitive, only 1kb minified.",
          stack: "HTML5, CSS3"
        }
      ]
    };
  },
  metaInfo() {
    return {
      title: "Projects",
      meta: [
        {
          key: "description",
          name: "description",
          content: "OpenSource projects built with Angular, HTML5, CSS3, React."
        },

        { property: "og:type", content: "Projects" },
        { property: "og:title", content: "Projects" },
        {
          property: "og:description",
          content: "OpenSource projects built with Angular, HTML5, CSS3, React."
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
          content: "OpenSource projects built with Angular, HTML5, CSS3, React."
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
