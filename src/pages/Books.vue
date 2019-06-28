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
          pages: "420",
          release: "2018",
          title:
            "Hands-On Full Stack Web Development with Angular 6 and Laravel 5",
          description:
            "Become  fluent in both Front-end and Back-end web development with Docker, Angular and Laravel. By the end of this book, you'll gain a solid understanding of Angular 6 and Laravel 5.x.",
          features: [
            "Explore the core features of Angular.",
            "Build an off-line-first application using service-worker.",
            "Deal with token based authentication.",
            "Deploy using Docker and Docker-compose.",
            "How to use Laravel Resources and Eloquent ORM."
          ]
        },
        {
          image: "node.JS-6.x-blueprints.jpg",
          pages: "376",
          release: "2016",
          title: "Node.js 6.x Blueprints",
          description:
            "Create stunning web applications and Restful APIs from start to finish with Express, Mongoose, Satelizer, Loopback, MongoDB, and MySQL using this definitive guide will know the best tools and frameworks for building highly scalable cloud applications.",
          features: [
            "Explore MVC design pattern in Node.js.",
            "Master the Express framework and build a complete application with a real database.",
            "Build solid architectures by following test-driven development.",
            "Build, Deploy, Docker, and continuous delivery.",
            "MongoDB and Geospatial Query."
          ]
        },
        {
          image: "angularJS-directives-cookbook.jpg",
          pages: "206",
          release: "2015",
          title: "AngularJS Directives Cookbook",
          description:
            "Extend the capabilities of AngularJS and build dynamic web applications by creating customized directives with this selection of more than 30 recipes.",
          features: [
            "Build reusable directives for Large AngularJS applications",
            "How to use jQuery events and manipulate the DOM.",
            "Extend directives to use dynamic templates.",
            "Write unit test for directives using the Karma.",
            "Jasmine’s behavior-driven development framework."
          ]
        },
        {
          image: "learning-single-page-web-application-development.jpg",
          pages: "214",
          release: "2014",
          title: "Learning Single-page Web Application Development",
          description:
            "Build powerful and scalable single-page web applications using a full stack JavaScript environment with Node.js, MongoDB, AngularJS, and the Express framework.",
          features: [
            "Use the new features of Express 4.",
            "Set up user authentication and store sessions.",
            "Configure an AngularJS application using modules.",
            "Event-driven development and the event loop.",
            "Test AngularJS applications with Karma and Protractor."
          ]
        },
        {
          image: "HTML5-responsive-table-design.jpg",
          pages: "110",
          release: "2013",
          title: "HTML5 Responsive Table Design",
          description:
            "Taking you from basic table markup, this book will walk you through semantics tags, and the new features of CSS3 that will improve your tables to look pixel perfect on any device. No matter how big the data and how small the device, by the end of this book it won't matter. ",
          features: [
            "Responsive design techniques in relation to data tables.",
            "How to handle large volumes of data.",
            "Apply filters to columns, hide less important data.",
            "How to load content dynamically.",
            "Converting tables into charts on mobile devices."
          ]
        },
        {
          image: "node-projects-video.jpg",
          pages: "2 Hours",
          release: "2016",
          title: "Node Projects Video",
          description:
            "A project based practical guide to create dynamic server-side applications.",
          features: [
            "Explore design patterns in Node.js.",
            "Build solid architectures by following test-driven development.",
            "Develop SPA using Node.js with AngularJS, Ember.js, and Backbone.js.",
            "Create a real-time chat application with Socket.IO",
            "Create three-four complete projects from scratch"
          ]
        },
        {
          image: "nodejs-creating-applications-from-scratch.jpg",
          pages: "4 Hours",
          release: "2016",
          title: "Node.js: Creating Applications from Scratch",
          description:
            "This video takes a project-based approach, you will be able to create your own server-side applications using Node.js.",
          features: [
            "Explore the Node.js module system.",
            "Build your custom middleware for Express.",
            "Integrate Socke.io with Express.",
            "Use Redis and Socket.io to make dynamic sites.",
            "By the end of this course, you’ll be a skilled Node.js developer."
          ]
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
