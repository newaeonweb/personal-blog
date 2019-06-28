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
          title:
            "Hands-On Full Stack Web Development with Angular 6 and Laravel 5",
          description:
            "This book gives you practical knowledge of building modern full-stack web apps from scratch using Angular with a Laravel Restful back end. The book begins with a thorough introduction to Laravel and Angular and its core concepts like custom errors messages, components, routers, and Angular-cli, with each concept being explained first, and then put into practice in the case-study project. You will learn how to create secure web application with Angular and Laravel using token based authentication. Finally, you will learn all about progressive web applications and build and deploy a complete fullstack application using Docker and Docker-compose."
          // features: ["Lindo", "MarAVILHOSO"]
        },
        {
          image: "node.JS-6.x-blueprints.jpg",
          title: "Node.js 6.x Blueprints",
          description:
            "Node.js is the most popular framework for creating server-side applications today. Be it web, desktop, or mobile, Node.js comes to your rescue to create stunning real-time applications and Restfull API's. This book will teach you the MVC design pattern while developing a Twitter-like application using Express.js, Passport and MongoDB. You will learn to create database driven website as a consumer feedback app. How to using stream API to upload and manipulate images and video files. Once you're warmed up, we'll move on to more complex projects, such, an store locator using Geospatial Query, 2dspheres indexes with MongoDB and Google Maps, a real-time chat app with Socket.io, and a blog using Keystone.js and how to create Restfull API's with Loopback.io. Finally, we’ll explore frontend build processes using Node Package Manager, building Node applications with Docker, tests and continuous delivery. By the end of book, you will be comfortable working with Node.js applications and will know the best tools and frameworks for building highly scalable cloud applications."
        },
        {
          image: "angularJS-directives-cookbook.jpg",
          title: "AngularJS Directives Cookbook",
          description:
            "This cookbook demonstrates how to take greater control over HTML elements on your web pages using directives – they ‘direct’ Angular’s HTML compiler to behave in the way you want it to. Packed with an extensive range of solutions and tips that AngularJS developers shouldn’t do without, you’ll find out how to make the most of directives. You’ll find recipes demonstrating how to build a number of different user interface components with directives and also how directives can simplify the way you work by creating reusable directives – by customizing them with Yeoman you can be confident that you’re application has the robust architecture that forms the bedrock of the best user experiences. You’ll also find recipes that will help you learn how to unit test directives, so you can be confident in the reliability and performance of your application. Extend the capabilities of AngularJS and build dynamic web applications by creating customized directives with this selection of more than 30 recipes. "
        },
        {
          image: "learning-single-page-web-application-development.jpg",
          title: "Learning Single-page Web Application Development",
          description:
            "Learning Single-page Web Application Development is a journey through application development using the MEAN stack with JavaScript on the server side and client side, covering concepts such as RESTful, authentication and session on SPA. You will build large-scale applications. You will use a JavaScript environment with Node.js on the server, MongoDB as the database, and AngularJS on the frontend. Everything is integrated with the Bower dependency manager, Yeoman, and other modern tools to speed up your development process. You will deploy your application to the cloud and learn how to prepare your directory structure to scale and grow. Learning Single-page Web Application Development will give you an overview of AngularJS and RESTful APIs, and guide you in learning how to leverage single page development tools to create efficient and effective applications. "
        },
        {
          image: "HTML5-responsive-table-design.jpg",
          title: "HTML5 Responsive Table Design",
          description:
            "Instant HTML5 Responsive Table Design How-to will help you with powerful responsive design techniques that allow you to present your data in the best way depending on the device. This practical guide uses the latest web development techniques to construct and deconstruct tables. Taking you from basic table markup, this book will walk you through semantics tags, and the new features of CSS3 that will improve your tables to look pixel perfect on any device.Use practical recipes to understand responsive design techniques in relation to data tables. Advance your knowledge of tables and learn how to handle large volumes of data, apply filters to columns, hide less important data, and load content dynamically. No matter how big the data and how small the device, by the end of this book it won't matter. "
        },
        {
          image: "node-projects-video.jpg",
          title: "Node Projects Video",
          description:
            "This video takes a project-based approach, where every project will build up your Node.js skillset. By the end of the video, you will be able to create your own server-side applications using Node.js."
        },
        {
          image: "nodejs-creating-applications-from-scratch.jpg",
          title: "Node.js: Creating Applications from Scratch",
          description:
            "This course takes you from a newbie to a comfortable Node.js developer. It starts with the basics and in no time takes the project-specific approach. This course combines some of the best that Packt has to offer in one complete, curated package. It includes content from the following Packt products: Node.js 6.x Blueprints by Fernando Monteiro, Node.js Projects [Video] by Fernando Monteiro, The Complete Guide to Node.js [Video] by Joshua Johanan, Building Scalable Apps with Redis and Node.js by Joshua Johanan, Master the Express framework and build a complete site with a real database Deploying Node.js by Sandro Pasquali "
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
