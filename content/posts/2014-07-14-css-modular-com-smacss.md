---
title: CSS Modular, SMACSS e OOCSS.
description: "Modularizando o css de maneira inteligente. Entenda o que é BEM, SMACSS e OOCSS"
tags: [Front-end]
date: 2014-07-15
author:
cover: /images/posts/smacss.jpg
fullscreen: false
---

Recentemente tenho visto muita discussão a cerca de SMACSS, BEM, OOCSS e CSS modular, qual o melhor padrão?, qual a melhor syntax? e por ai vai.
Sinceramente, acho tudo isso uma perda de tempo, nunca um padrão será ou terá a mesma utilidade e dinamismo para todos. É importante notar que; _você deve entender e absorver os conceitos de cada padrão de design (design patterns)_ e é claro utilizar aquele que melhor se adapta a sua necessidade.

> SMACSS - Scalable and Modular Architecture for CSS. É um ótimo ponto de partida para separação de estrutura e aparência.

# SMACSS

Preza pela utilização de diferentes diretórios para cada tipo de folha de estilo:


- Base
- Layout
- Module
- State
- Theme

Além de uma serie de dicas muito valiozas para performance e regras ineficientes como:

```css
    div#content > h3
    div#content:hover
``` 

[Aqui](https://smacss.com/book/selectors), você pode ler mais sobre isso.

# OOCSS

É um conceito que visa a separação da estrutura e aparência no CSS, para tornar o seu código reutilizável, imagine um arquivo como este:

```css
    #button {
        width: 200px;
        height: 50px;
        padding: 10px;
        border: solid 1px #ccc;
        background: linear-gradient(#ccc, #222);
        box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
    }

    #label {
        width: 400px;
        overflow: hidden;
        border: solid 1px #ccc;
        background: linear-gradient(#ccc, #222);
        box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
    }
``` 

Este é um exemplo de código ruim e nada modular, além de utilizar ID para seletores naturais, não permite reaproveitamento no HTML.

Agora utilizando o principio de orientação a objeto em css (OOCSS), conseguimos modularização, separando estrutura de aparência:

```css
    button {
        width: 200px;
        height: 50px;
        padding: 10px;
    }

    label {
        width: 400px;
        overflow: hidden;
    }

    .aparencia {
        border: solid 1px #ccc;
        background: linear-gradient(#ccc, #222);
        box-shadow: rgba(0, 0, 0, .5) 2px 2px 5px;
    }
``` 

Podemos utilizar a classe `.aparencia` em qualquer elemento `button` ou `label` e retuliza-lo quantas vezes for necessário em nosso HTML.

[Aqui](https://github.com/stubbornella/oocss), você pode ler mais sobre isso.

# Qual o melhor?

Pessoalmente costumo utilizar uma mistura de SMACCS com BEM e OOCSS, para quem não conhece [BEM](http://newaeonweb.com.br/articles/conceito-bem-com-css-e-less/), há algum tempo já escrevi sobre isso.
SMACSS para organização de diretórios e divisão de responsabilidades e BEM para nomenclatura e OOCSS para estruturar as classes, tudo isso com **LESS**.

Esta é a estrutura que adoto em projetos de larga escala:
![less]({{ site.url }}/assets/images/less-modular.jpg "SMACSS com LESS")

- Base - Ficam todos os arquivos com seletores que não utilizam classes, fonts e resets.
- Component - Todos os modulos em arquivos individuais.
- Icon - Font-face para todos os icones do sistema em SVG.
- KendoUI - Arquivos que utilizamos da lib kendoui
- Layout - Formatação, espaços etc...
- Responsive - Grids baseadas em **em** e **%**
- Theme - Cores dos temas

O diretório LESS conta com aproximadamente 27 arquivos individuais e ainda crescendo.
A manutenção é extremamente prática e confortável inclusive para novos membros da equipe.

Além destes diretórios, ainda tem as funções e as variáveis, estes dois arquivos tem em media 300 linhas cada um, tudo é variável, absolutamente tudo, inclusive caminho de imagens, medidas, escala de cores etc...

```css
    @image-folder: "../images/";
    @texture: none;
    @tooltip-texture: url('../images/highlight.png');
    @fallback-texture: url('../images/highlight.png');
``` 

Enfim, CSS modular é aquele que você consegue individualizar todos os componentes de interface e fazer com que eles se comportem da mesma maneira em todos os lugares.

Já o conceito BEM é aplicado na nomeclatura dos modificadores, estes por sua vez ficam no diretório **Theme**, exemplo:

```css
    .msg {}
        .sucesso {
            background-color: @successBackground;
            border-color: @successBorder;
            color: @successText;
        }
        .-grande {
            font-size: @baseFont + 0.5em;
            margin: ((@baseLineHeight / 2) - 1) 1px;
        }
``` 

Este é o estilo que adoto em meus projetos, é bem organizado e limpo. Um pouco de cada conceito para dar flexibilidade e forma a uma escrita bem estruturada.
