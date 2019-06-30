---
title: Aplicação Angular no estilo VueJS.
description: "O desafio é construir uma pequena aplicação utilizando Angular 7, porem utilizando o estilo e estrutura de diretórios sugerida pelo VUEJS, vejamos como o Angular se comporta"
date: 2019-01-07 10:27:52
author:
tags: [Front-end]
cover: /images/posts/bg_master_head_2.jpeg
fullscreen: false
---

O desafio é construir uma pequena aplicação utilizando Angular 7, porem utilizando o estilo e estrutura de diretórios sugerida pelo VUEJS, vejamos como o Angular se comporta.

![Aplicação Angular no estilo VueJS](/images/posts/angular-vue.jpg)

Recentemente tenho visto bastante coisa sobre **VUEJS**, e algumas grandes empresas estão utilizando essa biblioteca, tenho que admitir que isso é muito legal, é difícil uma empresa adotar uma ferramenta que é a terceira na lista de top Front-end frameworks, onde é dominado por **Angular** e **React**, sem entrar no mérito de cada ferramenta, vamos ao que interessa.

Nesse post vamos criar uma pequena aplicação web com um campo de busca, uma lista de itens e um filtro por uma determinada propriedade, é bem simples a idéia mas adiciona alguns componentes triviais no desenvolvimento web. Neste exemplo vamos utilizar a API aberta do PokemonTCG, entretanto para o app VUEJS vamos utilizar a versão **JavaScript** e para o ANGULAR, vamos utilizar a versão **TypeScript**.

Segue os links: 
[PokemonTCG API TYPESCRIPT](https://github.com/PokemonTCG/pokemon-tcg-sdk-typescript),
[PokemonTCG API JAVASCRIPT](https://github.com/PokemonTCG/pokemon-tcg-sdk-javascript)

Aqui esta a interface das duas aplicações e a estrutura de diretórios:

#### VueJS:

![vuejs application](/images/posts/vue-app.png)

#### Angular:

![Angular application](/images/posts/angular-app.png)

## Componentes

Neste exemplo eu utilizei o mesmo tipo de estrutura proposta pelo VUEJS para criar a aplicação em ANGULAR, é possível notar que estou utilizando apenas um arquivo **ts**: `cards.component.ts` com template e estilo inline, dessa maneira conseguimos manter tudo em um arquivo ([aqui você encontra como utilizar o Angular-Cli para gerar sua aplicação.](/articles/angular-applications-done-right-using-angular-cli)), de acordo com a proposta do VUEJS e seus arquivos `.vue`, como podemos abservar em `Cards.vue`, nesse arquivo nos temos: O **HTML**, o **CSS** e o **JavaScript** em um único lugar.

1- Angular: `cards.component.ts`:

```js
import { Component, OnInit } from '@angular/core';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';


@Component({
  selector: 'Cards',
  template: `
    <div class="container">
    <h1>Cards</h1>
    
    <form #cardsForm="ngForm" class="form-inline">
      <input class="form-control mb-2 mr-sm-2" type="text"
        placeholder="pokemon name, ex: Charizard, Pikachu" [(ngModel)]="name" name="name"
      />
      <button (click)="searchByName(name)" class="btn btn-primary mb-2">Search</button>
      <input
        class="form-control ml-3 mb-2 mr-sm-2"
        type="text"
        placeholder="filter for HP" [(ngModel)]="searchText" name="searchText"
      />
    </form>

    <p *ngIf="searchText">You filtered for: {{ searchText }} HP</p>
    <p *ngIf="cardList?.length" class="mt-3">We found: {{ cardList?.length }} cards.</p>
    <ul class="mt-5 list-unstyled row">
      <li class="media col-sm-3 " *ngFor="let item of cardList | cardsFilterBy: searchText">
        <div class="media-body">
          <img src="{{ item.imageUrl }}" alt="Generic placeholder image" />
          <p class="mt-1 mb-3">
            <a (click)="handleGetDetail(item.id);">{{ item.name }} HP: {{ item.hp }}</a>
          </p>
        </div>
      </li>
    </ul>
  </div>
  `,
  styles: ['ul { list-style-type: nonet; padding: 0;} .media img { width: 150px;}']
})
export class CardsComponent implements OnInit {
  name: string;
  searchText: string;
  cardList: any[];

  constructor() { }

  handleGetDetail(i: string) {
    PokemonTCG.Card.find(i)
    .then(result => {
      alert(JSON.stringify(result));
    })
    .catch(error => {
      alert(JSON.stringify(error));
    });
  }

  searchByName(name: string) {
    let params: PokemonTCG.IQuery[] = [{ name: 'name', value: name }];
    PokemonTCG.Card.where(params)
    .then(cards => {
      this.cardList = cards;
    })
    .catch(error => {
      alert(JSON.stringify(error));
    });
  }

  getCards() {
    let params: PokemonTCG.IQuery[] = [{ name: 'name', value: 'Blastoise' }];
    PokemonTCG.Card.where(params)
    .then(cards => {
      this.cardList = cards;
    })
    .catch(error => {
      alert(JSON.stringify(error));
    });
  }

  ngOnInit() {
    this.getCards();
  }

}
```

2- VueJS: `Cards.vue`

```js
<template>
  <div class="container">
    <h1>Cards</h1>
    <form class="form-inline">
      <input
        class="form-control mb-2 mr-sm-2"
        type="text"
        placeholder="pokemon name, ex: Charizard, Pikachu"
        v-model="name"
      />
      <button @click="searchByName" class="btn btn-primary mb-2">Search</button>
      <input
        class="form-control ml-3 mb-2 mr-sm-2"
        type="text"
        placeholder="filter for HP"
        v-model="searchText"
      />
    </form>
    <p v-if="searchText">You filtered for: {{ searchText }} HP</p>
    <p class="mt-3">We found: {{ cardList.length }} cards.</p>
    <ul class="mt-5 list-unstyled row">
      <li
        class="media col-sm-3 "
        v-for="item in filteredList(cardList)"
        :key="item.id"
      >
        <div class="media-body">
          <img :src="item.imageUrl" alt="Generic placeholder image" />
          <p class="mt-1 mb-3">
            <a @click="handleGetDetail(item.id);"
              >{{ item.name }} HP: {{ item.hp }}</a
            >
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Pokemon from "pokemontcgsdk";

export default {
  name: "cards",
  components: {},
  data() {
    return {
      name: "",
      searchText: "",
      cardList: []
    };
  },
  created: function() {
    this.getCards();
  },
  methods: {
    handleGetDetail: function(i) {
      Pokemon.card
        .find(i)
        .then(result => {
          alert(JSON.stringify(result));
        })
        .catch(error => {
          alert(JSON.stringify(error));
        });
    },
    searchByName: function() {
      const self = this;
      this.cardList = [];
      Pokemon.card.all({ name: this.name, pageSize: 1 }).on("data", card => {
        self.cardList.push(card);
      });
    },
    getCards: function() {
      const self = this;
      Pokemon.card.all({ name: "Blastoise", pageSize: 1 }).on("data", card => {
        return self.cardList.push(card);
      });
    },
    filteredList(list) {
      return list.filter(item => {
        if (item.hp) {
          return item.hp.toLowerCase().includes(this.searchText.toLowerCase());
        }
        return list;
      });
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
.media {
  img {
    width: 150px;
  }
}
</style>
```

É possível notar que os dois arquivos são muito semelhantes, destaque para o Angular seria apenas o **TypeScript** e a vantagem de poder tipar as variáveis. O **data-binding** e **loop(for)** são muito similares. Como no exemplo estou utilizando um SDK para as chamadas da API, não precisamos utilizar o **HttpModule** do Angular, nem o **Axios** do VueJS, embora nesse segundo poderíamos utilizar **fetch** também.

## Criando as Rotas

Para as rotas também é tudo muito parecido, em VueJS utilizamos `vue-router` e para Angular `@angular/router`, ambas bibliotecas fazem parte do **core** de cada framework (Ok, eu sei que o VueJS é apenas uma biblioteca), isso é um ponto positivo.

3- Angular: `app-routing.module.ts`

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './views/cards/cards.component';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'cards',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: HomeComponent
  },
    {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'cards',
    children: [
      {
        path: '',
        component: CardsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

4- VueJS: `route.js`

```js
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/cards",
      name: "cards",
      // route level code-splitting
      // this generates a separate chunk (cards.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "cards" */ "./views/Cards.vue")
    }
  ]
});

```

## Utilizando Filtros

Acredito que a maior diferença foi a criação do filtro para os **cards**, que na verdade é bem simples de se criar, mas o Angular por sua arquitetura nos obriga a criar um novo arquivo ao invés de inserir apenas uma função para filtrar a lista, como é possível de se fazer com o VueJS, e também era muito simples com AngularJS.

5- Angular: `card-filter-by.pipe.ts`

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardsFilterBy'
})
export class CardsFilterBy implements PipeTransform {

  transform(items: any, searchText: string, args?: any): any [] {
    if (searchText) {
      searchText = searchText.toLowerCase();
      
      return items.filter((item: any) => {
        if(item.hp) {
          return item.hp.toLowerCase().includes(searchText);
        } else {
          return;
        }
        
      });
    }
    return items;
  }
}
```

Template:

```html
<li class="media col-sm-3 " *ngFor="let item of cardList | cardsFilterBy: searchText">
```

Além disso é preciso injetar o novo filtro ao modulo do Angular para poder utiliza-lo. Já com VueJs é muito mais simples, pode ser adicionado diretamente no componente ou ainda globalmente.

**Note que estamos utilizando uma funcão para filtrar a lista, nos poderiamos utilizar a funcão `filter` do VUE nesse caso também**.

6- VueJS `Cards.vue`, função:

```js
filteredList(list) {
  return list.filter(item => {
    if (item.hp) {
      return item.hp.toLowerCase().includes(this.searchText.toLowerCase());
    }
    return list;
  });
}
```

Template:

```html
<li
  class="media col-sm-3 "
  v-for="item in filteredList(cardList)"
  :key="item.id"
>
```

Bom, agora você pode tirar as suas conclusões, e além disso utilizar o Angular de forma mais simples para pequenas aplicações, ou mesmo utilizar o VueJS, o importante é saber as limitações de cada ferramenta.

Segue o código fonte das apps:

### VueJS:

<iframe src="https://codesandbox.io/embed/rw9yz6nz6m" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


### Angular:

<iframe src="https://stackblitz.com/edit/angular-vue-style?embed=1&file=src/app/views/cards/cards.component.ts&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
