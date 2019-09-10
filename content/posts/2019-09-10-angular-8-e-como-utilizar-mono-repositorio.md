---
title: "Angular 8 e como utilizar mono-repositórios"
slug:
description: "Já se deparou com um projeto grande, grande mesmo? Não um CMS ou Ecommerce. Digo algo grande, com 5 ou 6 times trabalhando nele? Pensou em implementar Angular mas não sabe onde começar? Esse guia vai te ajudar a escolher a melhor forma de organizar o seu projeto e te ajudar nisso."
date: 2019-09-09 16:19:04
author: barba
xrelated: Angular
tags: [Front-end]
keys: [Angular, Angular-Cli, Monorepo]
cover: "/images/posts/bg_master_head.jpeg"
fullscreen: true
---

Mono repositório é um assunto um pouco controverso, muitos tem falado bem e muitos falado mau, mas como tudo no ecossistema do Angular já é meio controverso por natureza, nada melhor do que você ter um conhecimento mais profundo para saber se realmente isso pode te ajudar ou se vai complicar ainda mais a sua vida.

A grande sacada aqui é você ter maturidade suficiente como desenvolvedor de software web, ter uma experiência boa em todas as etapas do ciclo de vida de uma aplicação; estrutura de código, controle de versão, como lidar com pull-request para bug fix, features etc..., além é claro de testes, deploy e upload para produção.

E sabe por que isso é importante? Porque se você não estiver bem seguro na sua decisão e não souber organizar a sua aplicação, com certeza o "monorepo" vai lhe trazer mais dificuldades do que benefícios.

O conceito de **monorepo** é muito utilizado no google e também nos últimos tempos tem sido extremamente explorado pela comunidade, e como já mencionei nem sempre você vai encontrar coisas boas a respeito, já vi inúmeros artigos mostrando varias característica ruins, mas repito, isso é reflexo da falta de conhecimento mais profundo. Muitas vezes você precisa apenas de uma biblioteca compartilhada(Shared Lib) entre seus projetos e não efetivamente de um mono-repositório.

Simplificando o conceito você vai ter um diretório raiz como uma espécie de namespace e abaixo dele você vai ter todos os seus projetos, exemplo:

```html
<project>
  <app-1>
  <app-2>
  <app-3>
  .package.json
  .angular.json
```

>Note no exemplo acima que o repositório contém apenas um `package.json` e um `angular.json` dessa maneira todos as aplicações utilizam a mesma versão tanto do Angular como de todas as dependências do `node_modules`. É claro que no mundo real isso só funciona bem se você estiver começando do zero.

## Criando o mono-repositório

A partir da versão 7 do **Angular-Cli** ele já incorpora comandos que nos permite criar essa estrutura automaticamente, como: `ng g application <nome da app>`.

Então vejamos, vamos criar um exemplo de projeto.

1- Abra seu Terminal e digite:

```
ng new ExampleApp --routing=true
```

2- Agora vamos criar dois projetos dentro dessa aplicação:

```
ng g application admin
```

```
ng g application dashboard
```

No final nosso arquivo `angular.json` vai ter a seguinte estrutura:

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "monorepo-angular-boilerplate": {...},
    "dashboard": {...},
    "admin": {...}
    
  },
  "defaultProject": "monorepo-angular-boilerplate"
}
```

>Aqui você pode notar que nosso projeto base(defaultProject) foi o primeiro que criamos, no meu caso utilizei o nome **monorepo-angular-boilerplate**, então no seu arquivo se você seguiu o passo um, ele se chama example-app.

Em código nossa estrutura ficou como a imagem abaixo:

![angular-monorepo](/images/posts/monorepo_1.png)

## Gerenciando build e testes

Até aqui nada de muito especial, apenas a organização dos projetos. 

Mas é importante notar que cada um deles funciona de forma independente, isso é, para cada um você precisa executar os comandos de test, build e deploy, bem como o comando para ativar o servidor em desenvolvimento.

Então nosso arquivo: `package.json` possui os seguintes scripts:

```js
"start": "ng serve", // Serve a aplicação base
"dashboard:serve": "ng serve dashboard -o --port 3001", // Serve o dashboard na porta 3001
"admin:serve": "ng serve admin -o --port 3002", // Serve o admin na porta 3002
```

>Note que o exemplo acima ilustra apenas o comando `ng serve` para cada uma das apps. Então para todos os outros comandos(test, build, deploy), precisamos cria-los do zero, porém não é nada complicado.

Uma ferramenta muito útil que podemos utilizar é o [Angular-Console](https://nrwl.io/products), que nada mais é do que uma interface gráfica para executar os comandos do **Angular-Cli** que você não precisa decorar.

A imagem abaixo, mostra os projetos do nosso **workspace**:

![Angular-Console](/images/posts/monorepo_2.png)

Desse jeito fica bem fácil de executar os projetos, além disso fica mais simples criar módulos e componentes na aplicação correta, como podemos ver na imagem abaixo:

![Angular-Console](/images/posts/monorepo_3.png)

>Nas imagens estou utilizando uma extensão para vscode, mas você pode baixar o app para sua plataforma, caso não utilize o vscode.

## Escalando uma aplicação mono-repositório

É importante entender nesse momento que, tomando como base a aplicação que estamos criando, nos temos um app base, um app admin e um app dashboard, vamos imaginar que para cada app nos temos um time/squad diferente tocando cada projeto, algo assim:

| Aplicação | Módulos | Squad | 
|--|--|--|
| Core/Base | Auth/Navbar | Time Gondor |
|Admin| Painel Usuário| Time Mordor |
|Dashboard| Gráficos | Time Rohan |

Então por sua vez, cada time/squad escreve seus próprios scripts, e todos eles no mesmo `package.json`. Isso a principio parece ruim, vejamos 3 times com 2 ou 4 devs de front-end, que muitas vezes não dividem o mesmo escritório mexendo no mesmo arquivo.

Uma dica simples é, manter apenas comandos genéricos nesse arquivo, exemplo:

```js
"start": "ng serve",
"dashboard:serve": "ng serve dashboard -o --port 3001",
...
"admin:build": "cd projects/admin && node .bin/scripts.js",
"dashboard:build": "cd projects/dashboard && node .bin/scripts.js", 
```

Dessa maneira centralizamos em cada app/time os scripts que rodam dentro de cada app, sem precisar alterar o `package.json` da aplicação principal com frequência.

Outra dica, que muitos não gostam talvez por pouco conhecimento, mas é super útil, é utilizar **submodulos do git** para cada projeto, permitindo assim commits e deploys para cada app separado.

Assim cada app pode evoluir separadamente ou em conjunto com o Core, fica a decisão aos times/squads de qual será a melhor forma.

**Apenas não esquecer que o branch/master que abriga o Core da aplicação aponta para commits específicos nos outros branchs e não para o master de cada um. Então o app base precisa rodar algo que faça essa atualização. Sempre que houver mudança no branch filho, o branch pai deve apontar para o último commit.**

Se você esquecer isso, você vai quebrar a aplicação com certeza.

## Compartilhando services/libs/components entre aplicação.

### Services
Pensando que a app **Core** comanda as demais (**Admin**, **Dashboard**), no nosso caso, ela controla a autenticação e a barra de navegação da aplicação, nos podemos utilizar **services**, dessa maneira os outros time/squads utilizam os serviços criados pelo time do Core app. Dessa mesma forma os outros times podem criar seus **services** e compartilhar com o Core.

Entretanto nesse modelo, nos dependemos de terceiros quando precisamos alterar ou atualizar alguma coisa no serviço que estamos utilizando, lembre-se cada time tem o gerenciamento seu repositório e em determinado momento decidiram que cada time commit apenas no seu repositório.

### Libraries
Então aqui a melhor maneira de compartilhar código, será utilizando **libraries**. Vejamos o que diz o site do angular:

>An Angular library is an Angular project that differs from an app in that it cannot run on its own. A library must be imported and used in an app.

Dessa forma todos os times podem manter e desenvolver funcionalidades em comum entre eles e todos podem commitar no mesmo branch.

### Components

Aqui podemos utilizar **Angular Custom Elements**, que nada mais são do que componentes auto-contidos que são transformados em web componentes, não vou entrar em detalhes sobre isso nesse artigo, mas você pode encontrar facilmente na internet ou na documentação do Angular.


Esse artigo fica por aqui, foi apenas uma breve dica de como organizar o código, nada muito profundo, mas [aqui](https://github.com/newaeonweb/angular-monorepo-boilerplate) você encontra um projeto utilizando parte dessas dicas, porém incluindo autenticação por JWT, gerenciamento de estado com NGRX@Store e mais algumas coisas já preparadas.
