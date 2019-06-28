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
            "A lightweight (3kb) cross browser grid system, elegant & minimalist, made with only three main classes and 12 columns. Build with mobile first in mind, fits any screen size.",
          features: ["HTML5", "CSS3", "JavaScript"]
        },
        {
          image: "generator-angm.png",
          title: "ANGM-Generator",
          description:
            "AngularJS Yeoman Generator to help you getting started with a new project based on AngularJS and Angular Material to build large scale applications.",
          features: ["AngularJS", "Material UI", "Yeoman"]
        },
        {
          image: "newaeonserver.jpg",
          title: "JWT NewAeonServer",
          description:
            "Fake back-end Restful API powered by JsonWebToken, Json-Server and ApiDoc. Including endpoints to: Signup, Login, Refresh Token, Chance Profile Password, Reset Password and User Roles.",
          features: [
            "JavaScript",
            "NodeJS",
            "JsonServer",
            "JsonWebToken",
            "APIDoc"
          ]
        },
        {
          image: "trellometrics.png",
          title: "TrelloMetrics",
          description:
            "The easiest way for teams to track their work and results when working with Trello boards. Using Trello API and authentication to view your team boards, projects and members, including a lot of graphics.",
          features: [
            "AngulaJS",
            "ChartJS",
            "C3JS/D3JS",
            "Bootstrap",
            "Heroku",
            "CodeShip"
          ]
        },
        {
          image: "genomeasy.png",
          title: "Genomeasy",
          description:
            "A browser-based genome viewer. It is designed to facilitate the investigation of evidence for genomic variants within larger web applications.",
          features: [
            "React",
            "Bootstrap",
            "JQuery",
            "PileupJS",
            "Heroku",
            "Circle CI"
          ]
        },
        {
          image: "frontendboilerplate.png",
          title: "Frontend Boilerplate",
          description:
            "A simple Gruntfile and folder structure. It is designed to give you a quick and organized way to start developing web apps with best practices in mind.",
          features: ["GruntJS", "Bower", "Sass", "Less", "HTML5", "Yeoman"]
        },
        {
          image: "responsiveaeoncover.jpg",
          title: "ResponsiveAeon CSS Grid",
          description:
            "Lightweight Responsive CSS Grid System, build to be Simple Fast and Intuitive, only 1kb minified.",
          features: ["CSS3"]
        },
        {
          image: "sasacover.jpg",
          title: "SASa Grid-Block!",
          description:
            "Modular SCSS components with Typograph and a Grids system, very flexible to create responsive web applications.",
          features: ["SCSS"]
        },
        {
          image: "extensionpack.jpg",
          title: "VsCode Productivity Pack",
          description:
            "VsCode Extension package including uitlities for: Angular, Ruby on Rails, Linters, Converters and much more.",
          features: ["TypeScript"]
        },
        {
          image: "rbuicover.jpg",
          title: "RB UI Components",
          description:
            "Simple LESS components to use with Responsive Boilerplate, buit with Grunt and Yeoman.",
          features: ["HTML5", "LESS", "JavaScript"]
        },
        {
          image: "sasa-jekyllcover.jpg",
          title: "Sasa Jekyll Theme",
          description: "Simple responsive theme for Jekyll static generator.",
          features: ["HTML5", "SASS", "JavaScript"]
        },
        {
          image: "punkipacover.jpg",
          title: "PunkIPA Beer Search",
          description: "Simple beer search app built with PunkIPA API.",
          features: ["Bootstrap", "Angular", "TypeScript"]
        },
        {
          image: "formula1cover.jpg",
          title: "Formula 1 BB",
          description:
            "Races, winners and results search. Including Rounds, Circuits, Drivers and Constructors.",
          features: ["Bootstrap", "Angular", "TypeScript"]
        },
        {
          image: "f7mobileboilerplate.jpg",
          title: "F7 Mobile Boilerplate",
          description:
            "Simple boilerplate for mobile development with Framework 7, Angular and Cordova.",
          features: ["Framework 7", "Angular", "Cordova"]
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
