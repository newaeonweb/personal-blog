---
title: Setemasters Design Responsivo.
description: "Post sobre a palestra de Design Responsivo do imasters.com.br."
tags: [Front-end]
date: 2015-08-26
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: true
---

Os slides da palestra podem ser encontrados no seguinte [link](http://newaeonweb.com.br/talks/7master-design-responsivo.html), e mais sobre o evento pode ser visto neste link: [Setemasters edição Design Responsivo.](http://setemasters.imasters.com.br/edicoes/design-responsivo).

> Post para os participantes do evento do imasters edição Design Responsivo.

![Design Responsivo, além do Grid e das Colunas](/images/posts/slide-1.png)

Para quem não foi ou ficou sabendo do evento, o mesmo aconteceu em 26 de Agosto e contou com 7 especialistas no assunto.

## Falando o que todos já sabem.
É muito comum hoje em dia o termo Responsive Design ainda ser encarado de uma maneira totalmente atrasada, muita gente fala apenas sobre grids e colunas, otimização para videos, imagens responsivas e media queries (breakpoints).
Temos uma infinidade de plugins e frameworks que facilitam nosso trabalho, mas realmente precisamos de tudo isso?

A resposta é **Sim**, ainda precisamos de tudo isso e mais um pouco, não esquecendo que muitos ditos sites responsivos, não atendem a todos os dispositivos e tão pouco se preocupam com **TEXTO**, isso mesmo, já visitei diversos sites que não renderizam o texto de forma adequada em todos os tamanhos de tela.

Além de tudo isso, deveríamos pensar mais em como otimizar com responsabilidade a maneira que o usuário interage com nossas aplicações. Utilizar grids e colunas para compor um layout é ótimo, mas a pergunta é:

Se o seu layout esta preparado para dispositivos moveis, como fica a velocidade da sua aplicação com tantos recursos utilizados ao mesmo tempo?

![Design Responsivo, além do Grid e das Colunas](/images/posts/slide-2.png)


### Design Responsivo em Single Page Web Applications.
Muitos podem responder a pergunta anterior em poucas palavras, uns diriam:

1- **Cancatenando e comprimindo JS e CSS**.

2- **Utilizando um CDN para imagens e arquivos estáticos**.

3- **Gzip**.

E por ai vai a lista é extensa. E tudo isso ajuda, mas quando falamos de SPA as coisas são um pouco diferentes.

Uma vez que single page app, não confundir com one page websites, utilizam templates para injetar conteúdo em uma espécie de master page com um único header e um único footer, se levarmos ao pé da letra o conceito de single pages app é claro.

Sim, podemos incluir um header e um footer diferente em um template, mas além de nada elegante, se utilizar **nested views** dentro de nested views isso vai ser um fracasso.

Imagine uma aplicação utilizando **AngularJS** em que temos algo próximo da imagem a seguir.

![Design Responsivo, além do Grid e das Colunas](/images/posts/slide-3.png)

As coisas já começam a não ser tão simples assim, mesmo utilizando todas as técnicas citadas acima ainda precisamos cobrir e suportar uma grande quantidade de tamanho e resoluções de telas.

Imagine utilizar breakpoints, pensando em **mobile first**, vamos do menor tamanho para o maior, adicionando todos os tamanhos necessários, para facilitar ainda podemos utilizar um [pre processador de CSS](http://newaeonweb.com.br/articles/2013/11/28/SASS-for-webdesigners/) para deixar isso tudo o mais dinâmico possível.

> SASS possui um excelente recurso de MAP que é extremamente útil para estes casos.

Agora, pense implementar isso em todos os seguintes breakpoints:

![Design Responsivo, além do Grid e das Colunas](/images/posts/slide-4.png)

Com os recursos mencionados acima, ainda é uma tarefa relativamente simples, até mesmo para uma equipe de **Front-ends**, com um guia de estilo bem definido é claro. Já que quando trabalhamos sozinhos é muitos mais simples manter a consistência e o padrão do código.

## Ai começam os problemas...
Depois de tudo isso implementado na aplicação acima, uma rápida consulta ao web inspector nos mostra um resultado um pouco assustador, como podemos observar na imagem abaixo:

{% include image.html url='/assets/images/slide-5.png' alt='Design Responsivo, além do Grid e das Colunas' caption='89% da Folha de Estilo, não esta em uso' %}

![Design Responsivo, além do Grid e das Colunas](/images/posts/slide-5.png)

Exatamente 89% das regras em nossa folha de estilo, não esta sendo utilizada pela página atual, isso significa que:

1- Em aplicações SPA, isso vai ocorrer 100% do tempo em todas as páginas (Views/Templates), já que toda mudança que acontece, acontece no miolo/template da aplicação.

2- Mesmo com **mobile first** o resultado é quase sempre o mesmo.

> Lembre-se, estamos falando de aplicações SPA com AngularJS.

Apesar de extremamente otimiza a aplicação, possuímos 3 folhas de estilo em seu header, sem contar com os JS que estão no footer e levando em conta que esta não é uma aplicação tão grande assim.

## Uma maneira inteligente de lidar com este problema.
A solução que encontramos e que foi de longe a melhor e mais robusta de todas, foi a utilização do **ocLazyLoad**, um modulo em AngularJS para carregar não só arquivos de JS mas de CSS também.

Como podemos ver na seguinte imagem em um modulo de cadastro:

{% include image.html url='/assets/images/slide-6.png' alt='Design Responsivo, além do Grid e das Colunas' caption='Utilizando apenas o necessário' %}

![Design Responsivo, além do Grid e das Colunas](/images/posts/slide-6.png)

Desta maneira, como já utilizamos [OOCSS e SMACCS](http://newaeonweb.com.br/front-end/2014/07/14/css-modular-com-smacss/)  nas folhas de estilo, podemos injetar apenas a folha relacionada com o modulo especifico e seus respectivos widgets.

Ou seja em uma tela de cadastro, é injetado apenas as libs de forms e validação, sem a necessidade de todo o conteúdo como, tabelas, cards, abas, e outras.

Assim cada `view/template` utiliza 89% do CSS ao invés do contrário.

Uma solução simples que leva o Design Responsivo em SPA ao um caminho de sucesso e velocidade adequada para sua aplicação.

> Visite o link [official ](https://oclazyload.readme.io/), para este modulo.
