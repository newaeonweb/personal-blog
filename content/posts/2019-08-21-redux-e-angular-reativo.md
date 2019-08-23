---
title: "Angular, Redux e NGRX Store"
slug:
description: "Como aplicar o conceito Redux em aplicação Angular utilizando NGRX Store e Redux DevTools."
date: 2019-08-21 23:01:05
xrelated: Angular
tags: [Front-end]
keys: [Angular, Redux, NGRX]
cover: "/images/posts/bg_master_head.jpeg"
fullscreen: false
---

Como aplicar o conceito Redux em aplicação Angular utilizando NGRX Store e Redux DevTools. Esse não é um artigo passo a passo mas sim uma abordagem pratica da utilização do Redux e algumas ferramentas de debug.

Tenho visto muito comentário sobre gerenciamento de estado em aplicações Angular, um dos problemas que ferramentas como o **Redux/Flux/Mobx** ajuda a resolver no React é algo conhecido como *props drilling*, mais comum quando você precisa compartilhar informações entre diferentes componentes do seu UI e evita de ficar passando tudo como uma cascata abaixo, herdando props de props de pros...

No Angular as coisas são diferentes e podemos fazer isso com **Services/EventEmitter** ou até mesmo com **@input** e **@output** diretamente no componente, mas.... como muita gente anda falando que o padrão Redux faz parte do mundo React, resolvi criar esse artigo que mostra um pouco de como podemos fazer a mesma coisa com Angular ou qualquer outra biblioteca.

>Como o próprio site do Redux menciona: **Redux works with any UI layer, and has a large ecosystem of addons to fit your needs.**

## Atualizando o Angular/CLI para a versão: 8.2.2

Antes de mais nada, atualize o seu **angular/cli**, no seu Terminal digite: `ng --version` e compara com esse output:

```
Angular CLI: 8.2.2
Node: 10.16.0
OS: darwin x64
Angular: 
... 

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.802.2
@angular-devkit/core         8.2.2
@angular-devkit/schematics   8.2.2
@schematics/angular          8.2.2
@schematics/update           0.802.2
rxjs                         6.4.0
```

Nesta data 2019-08-21 essa é a versão estável mais recente. Caso queira atualizar utilize os comandos abaixo:

```
npm uninstall -g @angular/cli
```

```
npm install -g @angular/cli
```

## Criando um app básico

Vamos criar um código básico (porem nem tanto) e bem organizado para entender como funciona o Redux no Angular.

```
ng new angularRedux --style=scss --routing --skip-install -g -p ngr
```

Entre dentro do novo diretório: `cd angularRedux` e digite os seguintes comandos:

```
ng g module pages/home --routing
```

```
ng g module pages/cartoon --routing
```

Agora os componentes:

```
ng g component pages/home/home --flat -t -s --module=home
```
```
ng g component pages/cartoon/character-list -t -s --module=cartoon
```
```
ng g component pages/cartoon/character-detail -t -s --module=cartoon
```

**Se você não conhece esses comandos acima, da uma olhada [nesse post]().**

> Imagina se o React-scripts tivesse o mesmo poder desse CLI do Angular, quanta repetição de código seria evitada.

Ajustando as rotas:

`cartoon-routing.module.js`
```
  {
    path: 'characters',
    component: CharacterListComponent
  },
  {
    path: 'character/:id',
    component: CharacterDetailComponent
  },
```

`home-routing.module.js`
```
{ path: '', component: HomeComponent },
```

> Não esquece de adicionar o `import` desses componentes. Tanto nas rotas como no modulo.

Adicione os módulos: **HomeModule** and **CartoonModule** ao AppModule(`app.module.ts`).

Agora é só instalar as dependências do projeto:


```
npm install
```

No final do output, você deve ver algo parecido com isso:
```
npm notice created a lockfile as package-lock.json. You should commit this file.
added 1349 packages from 1064 contributors and audited 17096 packages in 554.438s
found 0 vulnerabilities
```

Agora é só rodar: `npm start` na raiz do projeto. Entrar na url: [http://localhost:4200/](http://localhost:4200/) e pronto, vai ver a mensagem: **home works!** logo abaixo das informações do Welcome screen do Angular.

Rápido heim? Estrutura modular, robusta e bem organizada em poucos minutos, afinal foram criados:

* Uma aplicação
* Dois módulos
* Três componentes
* Três rotas

Pronto, agora já temos o necessário para adicionar o Redux. Nos vamos utilizar o NGRX e os pacotes:

```json
"@ngrx/core": "^1.2.0",
"@ngrx/effects": "^8.2.0",
"@ngrx/store": "^8.2.0",
"@ngrx/store-devtools": "^8.2.0",
"ngrx-store-logger": "^0.2.3",
```

**Então instale esses pacotes no seu projeto.**

## Adicionando NGRX-Store e construindo o fluxo do Redux

Na pasta: `src/app` nos vamos criar um nova pasta chamada: **app-store** é aqui que vamos guardar todos os arquivos relacionados ao estado da nossa aplicação.


Crie um arquivo chamado: `app-store.module.ts` e adicione o seguinte código:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

// NGRX Dependencies
import { StoreModule, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Store Devtools/Logger
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeLogger } from 'ngrx-store-logger';

// App Global State
import { AppState } from './state/app.state';
import { appReducers } from './reducers/app.reducer';

// App Store modules
import { CartoonStoreModule } from '../pages/cartoon/_cartoon-store/cartoon-store.module';

// Logger state
export function logger(reducer: ActionReducer<AppState>): any {
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CartoonStoreModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 25,
        })
      : [],
  ],
})
export class AppStoreModule {}
```

No arquivo acima apenas criamos a função para gerenciar o **Logger**, onde poderemos ver no console do browser a mudança de um estado para outro e habilitamos o **Devtools** para utilizar o plugin do **Redux** no browser.

> Isso(*Logger/Devtools*) é totalmente opcional, entretanto eu recomendo fortemente que você utilize para debugar seu código e também entender melhor o funcionamento do estado na sua aplicação. Ele é o mesmo utilizando no **React**.

Agora como você observou acima, precisamos criar mais dois arquivos:

1- `src/app/app-store/reducers/app.reducer.ts`, adicione o seguinte código:

```ts
import { ActionReducerMap } from '@ngrx/store';
// App state
import { AppState } from '../state/app.state';
// App modules
import { cartoonReducers } from 'src/app/pages/cartoon/_cartoon-store/cartoon.reducer';
// All app reducers goes here
export const appReducers: ActionReducerMap<AppState, any> = {
  cartoon: cartoonReducers,
};
```

**No momento não se preocupe com o modulo: cartoonReducers, mais a frente nos vamos cria-lo.**


2- `src/app/app-store/state/app.state.ts`, adicione o seguinte código:

```ts
import {
  CartoonState,
  initialCartoonState,
} from '../../pages/cartoon/_cartoon-store/cartoon.state';

// Import app states inside the main AppState interface
export interface AppState {
  cartoon: CartoonState;
}

// Setup the initial AppState
export const initialAppState: AppState = {
  cartoon: initialCartoonState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
```

Neste momento estamos no meio do caminho, então não tente rodar a aplicação, com certeza não vai funcionar, ainda precisamos criar os arquivos ausentes, mas em linhas gerais a base do gerenciamento de estados esta pronta.

Como opção pessoal eu prefiro organizar tudo em módulos, se você acompanha meus artigos já sabe disso. É muito simples trabalhar dessa maneira com Angular, para remover uma feature por exemplo, é só remover o import do modulo e pronto, ***lembrando sempre que todas as features devem ser auto-contidas/encapsuladas em seu próprio funcionamento***.

Agora voltamos a módulo cartoon e vamos criar os arquivos que faltaram.

## Adicionando State ao módulo Cartoon.

Dentro de `src/app/pages/cartoon/` Crie um pasta chamada: `_cartoon-store`, dentro dela vamos adicionar os seguintes arquivos:

1- `src/app/pages/cartoon/_cartoon-store/cartoon.state.ts`, adicione o código abaixo:

```ts
import { Character } from '../models/character';
import { Info } from '../models/info';

export interface CartoonState {
  info: Info;
  characters: Character[];
  selectedCharacter: Character;
}

export const initialCartoonState: CartoonState = {
  info: null,
  characters: null,
  selectedCharacter: null,
};
```

> Como você notou acima, estou utilizando models para tipar as propriedades da interface, mais uma vez isso é apenas gosto particular e uma grande ajuda a IDE, caso você esteja utilizando VSCODE, vai ter o seu auto-complete de propriedades, toda vez que precisar percorrer um objeto.

**No momento vamos manter o arquivo assim mesmo.**

2- `src/app/pages/cartoon/_cartoon-store/cartoon.reducer.ts`, adicione o código abaixo:

```ts
import { CharacterActionsType, CharacterActions } from './cartoon.actions';
import { CartoonState, initialCartoonState } from './cartoon.state';

export const cartoonReducers = (
  state = initialCartoonState,
  action: CharacterActions
): CartoonState => {
  switch (action.type) {
    case CharacterActionsType.GetAllCharactersSuccess: {
      return {
        ...state,
        info: action.payload.info,
        characters: action.payload.results,
      };
    }

    case CharacterActionsType.GetOneCharacterSuccess: {
      return {
        ...state,
        selectedCharacter: action.payload,
      };
    }

    default:
      return state;
  }
};
```

Até aqui já deu para ver que estamos tendo um grande trabalho apenas para configurar o Redux certo?

Não se engane, no React é a mesma coisa, da o mesmo trabalho, isso porque estamos adicionando mais uma camada na aplicação. Mas a boa noticia é que você vai poder tirar suas próprias conclusões sobre gerenciamento de estado no Angular depois de criar esse simples exemplo.


3- Crie o arquivo: `src/app/pages/cartoon/_cartoon-store/cartoon.actions.ts`, e adicione o código abaixo:

```ts
import { Action } from '@ngrx/store';
import { Character } from '../models/character';
import { CharacterHttp } from '../models/characterHttp';

export enum CharacterActionsType {
  GetAllCharacters = '[Character] Get All Characters',
  GetAllCharactersSuccess = '[Character] Get All Characters success',
  GetOneCharacter = '[Character] Get One Character',
  GetOneCharacterSuccess = '[Character] Get One Character Success',
}

export class GetAllCharacters implements Action {
  public readonly type = CharacterActionsType.GetAllCharacters;
}

export class GetAllCharactersSuccess implements Action {
  public readonly type = CharacterActionsType.GetAllCharactersSuccess;
  constructor(public payload: CharacterHttp) {}
}

export class GetOneCharacter implements Action {
  public readonly type = CharacterActionsType.GetOneCharacter;
  constructor(public payload: number) {}
}

export class GetOneCharacterSuccess implements Action {
  public readonly type = CharacterActionsType.GetOneCharacterSuccess;
  constructor(public payload: Character) {}
}

export type CharacterActions =
  | GetAllCharacters
  | GetAllCharactersSuccess
  | GetOneCharacter
  | GetOneCharacterSuccess;

```

4- Crie o arquivo: `src/app/pages/cartoon/_cartoon-store/cartoon.effects.ts`, adicione o código abaixo:

```ts
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { CartoonService } from '../services/cartoon.service';
import { CharacterHttp } from '../models/characterHttp';

import { AppState } from '../../../app-store/state/app.state';
import * as fromCartoon from './cartoon.actions';

import { selectCartoonList } from './cartoon.selectors';


@Injectable()
export class CartoonEffects {
  constructor(
    private cartoonService: CartoonService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect()
  getAllCharacters$ = this.actions$.pipe(
    ofType<fromCartoon.GetAllCharacters>(
      fromCartoon.CharacterActionsType.GetAllCharacters
    ),
    switchMap(() => this.cartoonService.getAllCharacters()),
    switchMap((characterHttp: CharacterHttp) =>
      of(new fromCartoon.GetAllCharactersSuccess(characterHttp))
    )
  );

  @Effect()
  getOneCharacter$ = this.actions$.pipe(
    ofType<fromCartoon.GetOneCharacter>(
      fromCartoon.CharacterActionsType.GetOneCharacter
    ),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectCartoonList))),
    switchMap(([id, characters]) => {
      if (characters) {
        const selectedCharacter = characters.filter(
          charct => charct.id === +id
        )[0];
        return of(new fromCartoon.GetOneCharacterSuccess(selectedCharacter));
      } else {
        return this.cartoonService
          .getOneCharacter(id)
          .pipe(
            map(character => new fromCartoon.GetOneCharacterSuccess(character))
          );
      }
    })
  );
}
```

5- Crie o arquivo:  `src/app/pages/cartoon/_cartoon-store/cartoon.selectors.ts`, adicione o código abaixo:

```ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartoonState } from './cartoon.state';
import { Character } from '../models/character';

const selectCharacters = createFeatureSelector<CartoonState>('cartoon');

export const selectCartoonList = createSelector(
  selectCharacters,
  (state: CartoonState) => state.characters
);

export const selectCartoonInfo = createSelector(
  selectCharacters,
  (state: CartoonState) => state.info
);

export const selectSelectedCharacter = createSelector(
  selectCharacters,
  (state: CartoonState) => state.selectedCharacter
);
```

6- Agora por último vamos criar o módulo: `src/app/pages/cartoon/_cartoon-store/cartoon-store.modules.ts`, adicione o código abaixo:


```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { cartoonReducers } from './cartoon.reducer';
import { CartoonEffects } from './cartoon.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('cartoon', cartoonReducers),
    EffectsModule.forFeature([CartoonEffects]),
  ],
  providers: [CartoonEffects],
})
export class CartoonStoreModule {}
```

## Criando models(Interfaces)
Agora é hora de criar os modelos que estão ausentes em alguns imports do nosso código acima.

Dentro de: `src/pages/cartoon/` adicione a pasta: `models` e os seguintes arquivos:

1- Crie o arquivo: `src/pages/cartoon/models/character.ts`, com o código:

```ts
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: [];
  url: string;
  created: string;
}
```

2- Crie o arquivo: `src/pages/cartoon/models/characterHttp.ts`, com o código:

```ts
import { Character } from './character';
import { Info } from './info';

export interface CharacterHttp {
  info: Info;
  results: Character[];
}
```

3- Crie o arquivo: `src/pages/cartoon/models/info.ts`, com o código:

```ts
export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
```

Com isso feito e se você estiver utilizando o VSCODE, e eu espero que esteja, rsrsrs. Os erros de import sumiram, quase todos, ficou apenas o **service** que é importado no arquivo: `cartoon.effects.ts`.

## Criando HTTP service

Vamos criar o serviço que faltou, dentro de `src/app/pages/cartoon/` crie uma pasta `service` e adicione um arquivo chamado: `cartoon.service.ts` com o seguinte código:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Character } from '../models/character';
import { CharacterHttp } from '../models/characterHttp';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CartoonService {
  characterApi = `${environment.cartoonApi}/character`;

  constructor(private http: HttpClient) {}

  getAllCharacters(): Observable<CharacterHttp> {
    return this.http
      .get<CharacterHttp>(this.characterApi)
      .pipe(tap(res => console.log(res)));
  }

  getOneCharacter(id: number): Observable<Character> {
    return this.http
      .get<Character>(`${this.characterApi}/${id}`)
      .pipe(tap(res => console.log(res)));
  }

}
```

Agora execute esses três passos:

1- Adicione o endpoint da api no arquivo: `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  cartoonApi: 'https://rickandmortyapi.com/api/',
};
```

2- Adicione o módulo **HttpClientModule**, no arquivo: `src/app/app.module.ts`.

3- Adicione o módulo **AppStoreModule**, no arquivo: `src/app/app.module.ts`.

Viu como é simples adicionar e remover módulos?

Então no seu Terminal digite o comando: `npm start` e abra seu navegador em [http://localhost:4200/](http://localhost:4200/). Você vai ter uma imagem similar a esta:

![alt](/images/posts/ngr_1.png)

>Note que a imagem acima esta com a tab console selecionada, e isso que você esta vendo é o Logger em ação. Ele registra a mudança de estado mostrando qual action esta sendo ativada e qual o estado antes e depois da action.

Nessa outra imagem abaixo, podemos ver o painel do Redux (Devtools) aberto:

![alt](/images/posts/ngr_2.png)

Neste momento o estado esta vazio, porque ainda não utilizamos nenhum component para carregar os dados. Mas isso extremamente simples, vamos ver como carregar a lista de cartoons.

Dentro do arquivo: `src/app/pages/cartoon/cartoon-list.component.ts`, adicione o seguinte código:

```ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// NgRx State Management
import { AppState } from 'src/app/app-store/state/app.state';
import { Store, select } from '@ngrx/store';
import { GetAllCharacters } from '../_cartoon-store/cartoon.actions';
// characters selectors
import {
  selectCartoonList,
  selectCartoonInfo,
} from 'src/app/pages/cartoon/_cartoon-store/cartoon.selectors';

@Component({
  selector: 'ngr-character-list',
  template: `
    <p>
      character-list works!
    </p>
  `,
  styles: []
})
export class CharacterListComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  characters$ = this.store.pipe(select(selectCartoonList));
  info$ = this.store.pipe(select(selectCartoonInfo));

  ngOnInit() {
    this.store.dispatch(new GetAllCharacters());
  }

  navigateTo(id: number) {
    this.router.navigate(['character', id]);
  }
}
```

>Aqui você pode notar que ao invés de utilizar o **cartoon.service** diretamente em nosso **component** para fazer a requisição HTTP e carregar os dados, nos utilizamos a função `dispatch()` e disparamos uma **action**, que pos sua vez vai fazer a chamada HTTP, enviar ao **reducer** o resultado e o **reducer** vai atualizar o estado da aplicação.

Agora se você navegar até: [http://localhost:4200/characters](http://localhost:4200/characters), vai ver o resultado similar a imagem abaixo:

![alt](/images/posts/ngr_3.png)

E para finalizar o código vamos ajustar o component: `src/app/pages/cartoon/cartoon-detail.component.ts`:

```ts
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-store/state/app.state';
import { ActivatedRoute } from '@angular/router';
import { selectSelectedCharacter } from '../_cartoon-store/cartoon.selectors';
import { GetOneCharacter } from '../_cartoon-store/cartoon.actions';

@Component({
  selector: 'ngr-character-detail',
  template: `
    <p>
      character-detail works!
    </p>
  `,
  styles: []
})
export class CharacterDetailComponent implements OnInit {

  character$ = this.store.pipe(select(selectSelectedCharacter));

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new GetOneCharacter(this.route.snapshot.params.id));
  }

}
```

Nosso estado **cartoon** agora armazena o resultado da requisição HTTP realizada pelo service que esta sendo disparada do arquivo de actions.

Parece complicado, mas na realidade não é. Basta você prestar atenção as peças que mudaram em relação a aplicação tradicional do Angular, vejamos:

1- Sem utilizar o Redux, o fluxo de uma requisição HTTP segue o seguinte modelo:

-> Component(chama) -> service(Request HTTP) -> Component(Resultado do service).

2- Utilizando o conceito do Redux e simplificando, o fluxo fica assim:

-> Component(chama) -> effects(Request HTTP) -> reducer(Resultado do request) -> state(Atualiza o estado). Entre essas ações nos temos as **actions** que determinam o que deve ser feito, ex: sucesso, falha etc...

A ideia do artigo é apenas ilustrar a complexidade de utilizar o **Redux** e não entrar muito afundo nos conceitos. Você pode ler mais sobre conceito [aqui](https://redux.js.org/introduction/core-concepts).

Eu sinceramente não utilizaria esse conceito em qualquer aplicação, pelo menos com Angular que resolve uma porção de coisas utilizando injeção de dependências e outros recursos, como já comentei anteriormente. Sem contar que o estado da sua aplicação não sobrevive ao poderoso **F5**.

Você pode ver como resolver esse contratempo de refresh na página com uma nova action que check se o seu usuario esta logado por exemplo, e dependendo da resposta você atualiza o estado do seu app.

Nesse boilerplate: [angular-monorepo-boilerplate](https://github.com/newaeonweb/angular-monorepo-boilerplate) onde utilizo o conceito de Redux, multi-projetos e autenticação via token, voce pode ver como isso é feito.
