---
title: "Angular v12 e o futuro que você não esperava"
slug:
description: "Há dois anos atrás eu fiz um post sobre como utilizar o Angular como o Vue.js, ou seja utilizando apenas um arquivo `.ts` para o template e a folha de estilo, algumas pessoas acharam estranho, mas... Preparencem para o que vem por ai."
date: 2021-05-30 10:19:04
xrelated: Angular
tags: [Front-end]
keys: [Angular, Angular-Cli, Angular12]
cover: "/images/posts/bg_master_head.jpeg"
fullscreen: true
---

Sim isso parece ser um assunto um pouco controverso, mas em um futuro breve você vai ouvir alguns termos como: **SFC (Single File Component)**, **Less Angular**, **ngModule optional** e mais alguns outros, se ainda não sabe o que é isso, vamos lá...

## A transição do AngularJS para Angular2

Quando o AngularJS surgiu, conquistou a comunidade de desenvolvimento web muito rapidamente e uma das principais razões para isso foi a simplicidade de utilização do ferramenta/framework e o **two way** data binding, que apesar de existir em outros framework JS como KendoUI não era muito comum, não se falava em TypeScript e a curva de aprendizado não era tão íngrime.

Com o fim da versão: 1.7.x do chamado AngularJS para a versão Angular 2, o framework passou por uma reformulação gigantesca e acabou perdendo terreno para outras ferramentas, pois além da complexidade bem alta ainda tinha o **TypeScript**, que apesar de anunciarem como não obrigatório, eu sinceramente nunca vi uma aplicaçao Angular2 escrita em JS puro.

Essa transição impulsionou muitos desenvolvedores a seguir caminhos alternativos como **React** e **Vue**, pelo simples fato de manterem aquela certa facilidade de desenvolvimento e curva de aprendizado baixa, afinal o desenvolvimento web é muito dinâmico e muitos devs não querem perder tempo lendo documentação muito extensa.

Eis que então, agora com a versão Angular 12 algumas mudanças serão introduzidas em um futuro bem próximo buscando resgatar aquela facilidade/simplicidade perdida no decorrer dos anos.

## Single File Component

O conceito de **SFC** é bem simples como o próprio nome remete, componentes em um unico arquivo, é isso mesmo, lembra do post que mencionei acima? Ele esta [aqui](https://barbadev.netlify.app/articles/aplicacao-angular-no-estilo-vue-js/) é um exemplo bem simples e um comparativo da mesma aplicação utilizando as duas ferramentas com request HTTP e um filtro.

E sim, agora a partir da versão 12 isso vai ser fortemente encorajado, por dois motivos: suporte para **SCSS** na _tag style_ do componente e syntax highlight na _tag template_, já que uma das razões da separação em arquivos: HTML, SCSS e TS eram as limitações dos editores de código, e não o tão falado separação de conteúdo, uma vez que cada uma dessas coisas esta em um lugar do arquivo. E lembrando que eram opcionais e já era completamente possível criar um componente utilizando o Angular Schematics com style e template inline.

## Less Angular

Agora outra coisa que pode soar estranho aos ouvidos ao primeiro momento é **menos Angular** e o que isso quer dizer?

Isso é outra prática que vai ser encorajada pela comunidade Angular, ou seja o novo caminho do framework é simplificar as coisas, reduzir a complexidade e tornar algumas coisas opicionais como **NgModules**, **HttpClient**, Injeção de dependências entre outras.

O Angular quer retornar a simplicidade de tempos atrás, reduzindo a complexidade do framework e possibilitando que você utilize ferramentas como **AXIOS** para requisições HTTP e Interceptors, ou mesmo Fetch API, e substitua serviços com injeção de dependência por simples classes (import/export) sem a utilização de decorators @inject.

Além disso a nova versão permite que vc utilize qualquer framework para testes **end to end** como **Cypress** e não impõem mais o uso do **Protractor**.

Eu acredito que em pouco tempo isso se extenda para testes unitários também.

Essa é a ideia, fornecer um solução que pode ser utilizada em camadas sem forçar você a um determinado caminho de implementação, um exemplo disso e poder utilizar o AXIOS para as requisições HTTP uma prática que já existe com React e Vue.

É de fato um bom argumento para atrair os desenvolvedores de volta, tipo: _Olha você pode utilizar a nossa ferramenta de componente e rotas, e tudo mais que você já esta acostumado a colocar nas suas aplicações como: Lodash, AXIOS e por ai vai..._.

A nova versão também trás uma extensão para o browser, uma especie de Augury, porém criado pelo próprio time do Angular e pelo pouco que vi parece muito bom e com certeza vai ser muito útil nesse novo caminho que vem em breve.

Vou deixar alguns links interessantes, para você que assim como eu quer acompanhar o futuro do Angular:

-   [Angular next](https://next.angular.io)
-   [Atualização da versão 12](https://next.angular.io/guide/updating-to-version-12)
-   [Angular Roadmap](https://next.angular.io/guide/roadmap)
-   [Angular Devtools](https://next.angular.io/guide/devtools)
