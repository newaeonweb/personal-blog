---
title: How to build a Vue.js app With Loopback.io Rest API.
description: "This article/project is a simple boilerplate to create awesome front-end apps using VueJS on front-end and Loopback.io on back-end."
date: 2019-04-22
tags: [Back-end]
keys: [Loopback, VUEJS]
cover: https://placeimg.com/1220/900/tech
fullscreen: true
---

# How to build a VueJS application with Loopback.io Rest API.
This article/project is a simple boilerplate to create awesome front-end apps using VueJS on front-end and Loopback.io on back-end. **BUT** *you can follow the same concept to use any SPA(Single Page Application)* framework you. In this series we will see:

- Installing and setup Loopback.
- Installing and setup VueJS.
- How to running VueJS and Loopbback together on same port (One server to rule them all).
- Back-end:
  - Loopback models and relationship.
  - How to add sample data on startup.
  - Custom Error Handler.
  - How to use filter/query params.
  - Authentication and authorization.
- Front-end:
  - VueJS code organization.
  - How to add and use third libraries.
  - Front-end Style with Element-ui.
  - Form validation with Vee-validation.
  - Http requests with Axios.
- Build and Deploy.
- Continuos delivery using Codeship and Heroku.

> Remeber you can apply the front-end list to any framework as: **Angular**, **React**, **Ember**, **jQuery** etc...

You can found more infos about the frameworks we are using in this article:  [VueJS](https://vuejs.org/), and [LoopBack.io](http://loopback.io).

# Getting Started
As our first step, if you don't have yet, let's install our tools. This step assume that you already have NodeJS installed on your machine and you have a good understand about **SPA**, **web development** in general and of course: **JavaScript**, **HTML**.

## Installing LoopBack and Vue on your local machine.

1- The project was created using the **loopback-cli**, so install with the following command;

```
npm install -g loopback-cli
```

> The previous command will install **LoopBack v3** on your machine.

2- The next step, install vue-cli, use the following command:

```
npm install -g @vue/cli
```

> The previous command will install **VueJS v3** on your machine.

### Important notes about Vue.

*The package name changed from **vue-cli** to **@vue/cli**. If you have the previous **vue-cli** (1.x or 2.x) package installed globally, you need to uninstall it first with npm uninstall **vue-cli -g** or yarn global remove **vue-cli**.*

### Node Version Requirement.

*Vue CLI requires Node.js version **8.9** or above (**8.11.0+** recommended). You can manage multiple versions of Node on the same machine with **nvm** or **nvm-windows**.*

## Creating a new back-end application

In this step we will create a simple back-end API using **loopback-cli**. So let's see how to do.

3- To create a new application using the **LoopBack cli** use the following command at your Terminal:

```
lb
```

4- Follow the questions and use the following answers:

```
App name: example
Project directory: example
Loopback version: 3.x (Current)
Kind of application do you have in mind: api-server
```

At the end of Terminal you should see the following output:

```
create .editorconfig
   create .eslintignore
   create .eslintrc
   create server/boot/root.js
   create server/middleware.development.json
   create server/middleware.json
   create server/server.js
   create README.md
   create server/boot/authentication.js
   create .gitignore
   create client/README.md
```

> Note the client directory, is where you must place all your front-end code.

# Create a new front-end application

There are several ways to add the front-end code to a **loopback** application, however some ways suggest using separate builds and serve the code on a different port than the one used by default in **loopback**. In this case the port 3000.

I'd rather use the same port 3000 to serve the entire application, even though we know we can create separate build and deploy scripts. Even for scalability issues this is much better.
But, since this is a simple setup article, let's keep it this way.

So let's see how to useu the same port 3000, for both applications. Let's get our hands dirty.

5- Inside the example folder, type the folloiwng command:

```
vue create client
```

Yes we already have a folder called **client** inside the **example** folder, so let's see what we need to do.

#### Use the merge option:

```
Vue CLI v3.5.5
? Target directory /example/client already exists. Pick an action:
  Overwrite
❯ Merge
  Cancel
```

#### Select the following options manually:

```
? Please pick a preset: Manually select features
? Check the features needed for your project:
❯◉ Babel
 ◯ TypeScript
 ◉ Progressive Web App (PWA) Support
 ◉ Router
 ◯ Vuex
 ◉ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```

```
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with node-sass)
? Pick a linter / formatter config: Basic
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)Lint on save
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In package.json
? Save this as a preset for future projects? (y/N) n
```

> Note that we choose YES for the first question: **Use history mode for router? (Requires proper server setup for index fallback in production) Yes**. Later we need some special adjust on loopback config to accomplish this.

At the end of the previous command, we can see the following message:

```
🎉  Successfully created project client.
👉  Get started with the following commands:

 $ cd client
 $ npm run serve
```

Well congratulations we have a new front-end application with VueJS.

## Setup Loopback to serve the front-end files.

Now let's setup the back-end to serve the Vue application, but before we go further let's see some important note about the Vue building process.

#### Important note about the building process:

At this stage if we follow the previous output command we will running the client application on default Vue port 8080, and remember **we don't want this**.

As we all know, every application using **Vue** comes by default with some commands to start a development server, testing, and build the application. As we can see below in the **scripts tag** of the **package.json** file:

```
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  }
```

But in our case we will move the **scripts** to loopback package.json file, later in this tutorial. For now, let's make some adjusts.

### Edit the middleware.json file.
Let's make some changes on middleware.json file to setup the client folder.

6- Inside the **server** folder, open: `middleware.json` file and add the following lines inside **files** tag:

```
  "files": {
    "loopback#static": [{
        "name": "publicPath",
        "paths": ["/"],
        "params": "$!../client/dist"
      },
      {
        "name": "vueRouter",
        "paths": ["*"],
        "params": "$!../client/dist/index.html",
        "optional": true
      }
    ]
  }
```

**Note the second route, we make a fallback to index.html, this is the special server setup to use the history browser API suggested on Vue router creation**

You probably noticed that we set a new folder inside the **client** directory right? The **dist** folder is where **Vue** place the build files, this mean that we are working directly with the compiled files. Later we will see more about it.

7- Now remove `root.js` file inside `server/boot` folder. Don't be afraid we don't use this file.

The next step is to add some modifications inside the `package.json` at the root **server** folder, yes we are using just one `package.json`, as we mentioned before.

8- Replace the `server/package.json` content with the following code:

```
{
  "name": "example",
  "version": "1.0.0",
  "main": "server/server.js",
  "engines": {
    "node": ">=4"
  },
  "scripts": {
    "lint-server": "eslint .",
    "start-backend": "node .",
    "posttest": "npm run lint",
    "serve-client": "cd client && vue-cli-service serve",
    "build-client": "cd client && vue-cli-service build --watch",
    "lint-client": "cd client && vue-cli-service lint",
    "nodemon-start": "nodemon",
    "start": "parallelshell 'npm run build-client' 'npm run nodemon-start'"
  },
  "dependencies": {
    "compression": "^1.0.3",
    "cors": "^2.5.2",
    "helmet": "^3.10.0",
    "loopback": "^3.19.0",
    "loopback-boot": "^2.6.5",
    "loopback-component-explorer": "^6.0.0",
    "loopback-connector-mongodb": "^1.18.1",
    "nodemon": "^1.18.11",
    "parallelshell": "^3.0.2",
    "serve-favicon": "^2.0.1",
    "strong-error-handler": "^3.0.0"
  },
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-loopback": "^8.0.0",
    "@vue/cli-plugin-babel": "^3.6.0",
    "@vue/cli-plugin-eslint": "^3.6.0",
    "@vue/cli-plugin-pwa": "^3.6.0",
    "@vue/cli-service": "^3.6.0",
    "babel-eslint": "^10.0.1",
    "eslint-plugin-vue": "^5.0.0",
    "node-sass": "^4.9.0",
    "sass-loader": "^7.1.0",
    "vue-template-compiler": "^2.5.21"
  },
  "nodemonConfig": {
    "ignore": [
      "client/*"
    ],
    "delay": "2500"
  },
  "repository": {
    "type": "",
    "url": ""
  },
  "license": "MIT LICENSED",
  "description": "example app"
}
```

> Don't forget to run: `npm install` at the root folder to install the new dependencies added to `package.json` file.

The magic happen right here in one line of code:

`"start": "parallelshell 'npm run build-client' 'npm run nodemon-start'"`

We are using two main tasks inside the **scripts** tag, one to build and watch for changes inside the Vue app, note the use of `--watch` flag. Everytime we change some code, the project will be recompiled and updated the **dist** folder.

`"build-client": "cd client && vue-cli-service build --watch"`

and another to use **nodemon** to start the LoopBack server.

`"nodemon-start": "nodemon"`

Another Important change is to add the **nodemon** config tag:

```
  "nodemonConfig": {
    "ignore": [
      "client/*"
    ],
    "delay": "2500"
  }
```

This means that nodemon will running only when we change files outside **client** folder, ie **server** folder.

The last but not least change needed is to add the following tags on `.eslintrc` file at the root server folder:

```
{
  "extends": "loopback",
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  }
}
```

And a great thanks to `parallelshell` package. Here is where we start both applications at the same time: `"start": "parallelshell 'npm run build-client' 'npm run nodemon-start'"` as mentioned before.

Well, we've seen a lot of content so far, so we'll take a break and soon we'll go to the second article, where we delve deeper into Loopback.
