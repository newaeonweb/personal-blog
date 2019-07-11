---
title: "Começando com Gridsome, VueJs e GraphQl"
slug:
description: "
Neste post vou falar um pouco da minha experiência ao migrar me blog do **Jekyll** para o Gridsome, um gerador de site estático com VueJS e GraphQl muito inspirado pelo **Gatsby** que utiliza React."
date: 2019-07-10 14:50:15
xrelated: Gridsome
tags: [Front-end]
keys: [Gridsome, VUEJS]
cover: https://placeimg.com/1220/900/tech
fullscreen: true
---

Neste post vou falar um pouco da minha experiência ao migrar me blog do **Jekyll** para o **Gridsome**, um gerador de site estático com **VueJS** e **GraphQl** muito inspirado pelo **Gatsby** que utiliza React.

Antes de iniciarmos, o que me chamou a atenção foi a flexibilidade de escolha para o formato do conteúdo, entre eles, por aceitar **markdown**, já que todos os meus posts do antigo blog estavam neste formato.
Mas além disso é possível utilizar conteúdo em requisições Ajax externas, que vamos ver mais a fundo nos próximos passos.

Você pode dar uma olhada em como o **Gridsome** funciona [neste link](https://gridsome.org/docs/how-it-works).

## Iniciando o projeto

Neste exemplo, vamos construir um site bem simples, utilizando uma API externa, sobre o desenho **Ricky&Morty**.

Se você ainda não instalou o **Gridsome** na sua maquina, rode o seguinte comando no seu Terminal:

```
npm install --global @gridsome/cli
```

Agora estamos prontos para cria o site, ainda em seu Terminal, digite o seguinte comando:

```
gridsome create ricky-morty-site
```

A estrutura básica se parece com o seguinte formato:

```
.
├── package.json
├── gridsome.config.js
├── gridsome.server.js
├── static/
└── src/
    ├── main.js
    |── components/
    ├── layouts/
    │   └── Default.vue
    ├── pages/
    │   ├── Index.vue
    │   └── About.vue
    └── templates/
        └── BlogPost.vue
```

Até ai sem novidade certo?.

## Criando uma nova pagina

Agora dentro da pasta `pages` crie um novo arquivo chamado `src/pages/Characters.vue` e adicione o seguinte código:

```js
<template>
  <Layout>
    <div class="mb-8">
      <h1>Characters</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>

      <div class="flex flex-wrap -mx-2 mt-5">
        <div
          class="w-full sm:w-1/3 md:w-1/4 px-2"
          v-for="edge in $page.posts.edges"
          :key="edge.node.id"
        >
          <div class="rounded overflow-hidden shadow-lg mb-4">
            <g-image class="w-full" :src="edge.node.image" :alt="edge.node.image" srcset />
            <div class="px-6 py-4">
              <h2 class="text-center">
                <g-link
                  class="text-teal-500"
                  :to="`characters/${edge.node.id}`"
                >{{ edge.node.name }}</g-link>
              </h2>
            </div>
            <div class="px-6 py-4 text-center">
              <span
                class="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >{{ edge.node.status}}</span>
              <span
                class="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >{{ edge.node.species}}</span>
              <span
                class="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
              >{{ edge.node.gender}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Characters"
  }
};
</script>
```

> Note que as classes que estamos utilizando em nosso markup são do framework **TailwindCSS**, se você não conhece, aqui no blog já tem post sobre como adiciona-lo no Gridsome.

## Criando um data source

Vamos criar agora o data source que vai compor a nossa camada de **GraphQl** e onde poderemos popular o template criado acima, vamos lá.

Abra o arquivo: `grisome.server.js` na raiz do projeto e adicione o seguinte código:

```js
api.loadSource(async store => {
    const { data } = await axios.get(
      'https://rickandmortyapi.com/api/character/'
    );

    const contentType = store.addContentType({
      typeName: 'BlogPosts',
      route: '/characters/:id',
    });

    for (const item of data.results) {
      console.log(data);
      contentType.addNode({
        id: item.id,
        name: item.name,
        status: item.status,
        species: item.species,
        type: item.type,
        gender: item.gender,
        origin: item.origin,
        location: item.location,
        image: item.image,
        episode: item.episode,
        url: item.url,
        created: item.created,
      });
    }
  });
```
> Note que estamos utilizando o **axios** para fazer o request, então precisamos adiciona-lo no projeto.

Ainda no Terminal, digite o seguinte comando;

```
npm install axios --save
```

Agora adicione a linha a seguir no inicio do arquivo `gridsome.server.js`:

```
const axios = require('axios');
```

Fácil certo? A sacada aqui é você deve criar um template para que essa queries que vamos fazer possa ser exposta ao seu front-end com o VueJS.

Note que definimos a rota para a pagina que criamos alguns passos antes, juntamente com uma tag `typeName`, pois bem, essa string `BlogPosts` determina o nome que vamos utilizar no arquivo de template e também o nome da nossa coleção no **GraphQl**.

```
typeName: 'BlogPosts',
route: '/characters/:id',
```

Dentro da pasta: `src/templates/`, crie um arquivo chamado: `BlogPosts.vue` e adicione o seguinte código:

```js
<template>
  <Layout>
    <div>
      <h1>Character Detail</h1>

      <div class="w-72 mx-auto rounded overflow-hidden shadow-lg mb-4 mt-4">
        <g-image class="w-full" :src="$page.blogPosts.image" :alt="$page.blogPosts.name" />
        <div class="px-6 py-4">
          <h2 class="text-center">{{ $page.blogPosts.name }}</h2>
        </div>
        <div class="px-6 py-4 text-center">
          <h2>Episodes</h2>
          <ul v-for="(ep, index ) in $page.blogPosts.episode" :key="index">
            <li>Episode: {{ index + 1}}</li>
          </ul>
        </div>
        <div class="px-6 py-4 text-center">
          <span
            class="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >{{ $page.blogPosts.status}}</span>
          <span
            class="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >{{ $page.blogPosts.species}}</span>
          <span
            class="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
          >{{ $page.blogPosts.gender}}</span>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Character"
  }
};
</script>
```

Você deve estar se perguntando, mas de onde vem essa variável **$page** que se repete de maneiras diferentes em ambos arquivos que criamos, certo?

Vamos a elas, cada tipo de arquivo criado, note criamos um **Page** e um **Template** eles se comportam de maneiras diferentes e utilizam um tipo de query especifico.

## Criando queries no GraphQL

Vamos adicionar as queries em cada página, abra o arquivo `src/pages/Characters.vue` e ao final do arquivo adicione o seguinte bloco de código:

```js
<page-query>
query BlogPosts {
  posts: allBlogPosts (sortBy: "id", order: ASC) {
    edges {
      node { 
        id
        name
        status
        species
        type
        gender
        origin {
          name
          url
        }
        location {
          name
          url
        }
        image
        episode
        url
        created
      }
    }
  }
}
</page-query>
```

Agora, abra o arquivo `src/templates/BlogPosts.vue` e ao final do arquivo adicione o seguinte bloco de código:

```js
<page-query>
query BlogPost($path: String) {
  blogPosts(path: $path) {
    id
    name
    status
    species
    type
    gender
    origin {
      name
      url
    }
    location {
      name
      url
    }
    image
    episode
    url
    created
  }
}

</page-query>
```

Dentro do diretório raiz, abra seu Terminal e digite o seguinte comando:

```
gridsome develop
```

Ao final do comando, você vai ver uma mensagem similar a isso:

```bash
  Site running at:          http://localhost:8080/
  Explore GraphQL data at:  http://localhost:8080/___explore
```

Acesse o segundo link, esta é a interface do nosso cliente **GraphQL**, vamos montar aqui as queries que iremos utilizar em cada página.

Copie a primeira query e cole no lado esquerdo do editor, depois pressione o botão de play, e você vai ter um resultado similar a imagem abaixo:

![Grisome](/images/posts/gridsome-1.png)

Incrível né, o **Gridsome** gerou nosso **GraphQL** e agora podemos fazer qualquer tipo de query nesta interface, claro respeitando as limitações do Gridsome.

Agora você pode navegar até a raiz do site e conferir o resultado final: [http://localhost:8080/characters](http://localhost:8080/characters).

![Grisome](/images/posts/gridsome-2.png)

Bem simples de criar e muito fácil de escalar, na minha opinião ganhou do **Jekyll**, apenas por ser relativamente novo não existem muitos plugins para ele ainda, mas isso é questão de tempo. É também uma alternativa ao seu concorrente direto: **[Gatsby](https://www.gatsbyjs.org/)** que já possui um ecossistema um pouco melhor.

Aqui esta o [link](https://github.com/newaeonweb/gridsome-blog-example) do projeto no **Github**.
