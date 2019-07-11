---
title: 'Tailwindcss com Gridsome gerador de site estático'
slug:
description: 'Como instalar o TailwindCSS no gerador de site estático Gridsome'
date: 2019-07-11 10:25:59
xrelated: Gridsome
tags: [Front-end]
keys: [Gridsome, VUEJS, TailwindCSS]
cover: https://placeimg.com/1220/900/tech
fullscreen: true
---

Há pouco tempo em quanto pesquisava sobre o gerador de site estático **Gridsome**, me deparei com um framework de CSS muito, mas muito interessante chamado TailwindCSS, como seu próprio website menciona um _utility first framework_ e achei muito sensacional. [Aqui](https://tailwindcss.com/) você encontra o [link](https://tailwindcss.com/docs/installation/) para conhecer um pouco mais. Além disso este blog é feito com TailwindCSS e eu não precisei escrever nada de CSS.

Aqui vou mostrar como você pode adicionar o TailwindCSS a uma instalação limpa com o Gridsome, isso quer dizer que você não precisa utilizar um starter-kit já pronto e muitas vezes complicado demais para o que você precisa.

Vamos lá.

## Instalando o Gridsome

```
npm install --global @gridsome/cli
```

## Criando um blog simples

```
gridsome create gridsome-tailwindcss
```

## Instalando TailwindCSS no Gridsome

```
npm install tailwindcss
```

## Configurando TailwindCSS dentro do Gridsome

Agora a parte mais interessante, se você já leu um pouco sobre o TailwindCSS, percebeu que pode apenas incluir a folha de estilo hospedada em um CDN e pronto, já pode usar. Nos poderíamos fazer isso aqui também, embora não teríamos como utilizar o principal recurso oferecido pelo framework a directiva **@apply** dentro da nossa folha de estilo. Vamos ver como isso funciona.

Abra o arquivo `gridsome.config.js` e adicione o seguinte código logo abaixo da tag **plugns**:

```js
chainWebpack: config => {
  config.module
    .rule('css')
    .oneOf('normal')
    .use('postcss-loader')
    .tap(options => {
        options.plugins.unshift(
            ...[
                require('postcss-import'),
                require('postcss-nested'),
                require('tailwindcss'),
            ]
        );

        if (process.env.NODE_ENV === 'production') {
            options.plugins.push(
                ...[
                    require('@fullhuman/postcss-purgecss')({
                        content: [
                            'src/assets/**/*.css',
                            'src/**/*.vue',
                            'src/**/*.js',
                        ],
                        extractors: [
                            {
                                extractor: TailwindExtractor,
                                extensions: ['css', 'vue', 'js'],
                            },
                        ],
                        whitelistPatterns: [/shiki/],
                    }),
                ]
            );
        }

        return options;
    });
};
```

A configuração acima utiliza o **postcss-purgecss** para remover de nossa aplicação todo CSS que não esta sendo utilizado em nenhum lugar, e isso nos da uma grande vantagem na hora de fazer o build e colocar nosso site no ar, ganhamos bastante performance.
Além disso, por trás dos panos o Gridsome utiliza o **Webpack** que é outra vantagem para configurações mais complexas.

Mas note que vamos precisar de algumas ferramentas como: **postcss-import**, **postcss-nested** entre outras, mais adiante vamos adiciona-las ao projeto.

Agora acima da função `module.export={}` adicione o seguinte código:

```js
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}
```

## Criando o arquivo de configuração do TailwindCSS

Dentro da raiz do projeto, crie um arquivo chamado `tailwind.config.js` e adicione o seguinte código:

```js
module.exports = {
    prefix: '',
    important: false,
    separator: ':',
    theme: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        transparent: 'transparent',
  
        black: '#22292f',
        white: '#fff',
  
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
          codeblock: '#fbfcfd',
        },
        red: {
          100: '#fff5f5',
          200: '#fed7d7',
          300: '#feb2b2',
          400: '#fc8181',
          500: '#f56565',
          600: '#e53e3e',
          700: '#c53030',
          800: '#9b2c2c',
          900: '#742a2a',
        },
        orange: {
          100: '#fffaf0',
          200: '#feebc8',
          300: '#fbd38d',
          400: '#f6ad55',
          500: '#ed8936',
          600: '#dd6b20',
          700: '#c05621',
          800: '#9c4221',
          900: '#7b341e',
        },
        yellow: {
          100: '#fffff0',
          200: '#fefcbf',
          300: '#faf089',
          400: '#f6e05e',
          500: '#ecc94b',
          600: '#d69e2e',
          700: '#b7791f',
          800: '#975a16',
          900: '#744210',
        },
        green: {
          100: '#f0fff4',
          200: '#c6f6d5',
          300: '#9ae6b4',
          400: '#68d391',
          500: '#48bb78',
          600: '#38a169',
          700: '#2f855a',
          800: '#276749',
          900: '#22543d',
        },
        teal: {
          100: '#e6fffa',
          200: '#b2f5ea',
          300: '#81e6d9',
          400: '#4fd1c5',
          500: '#38b2ac',
          600: '#319795',
          700: '#2c7a7b',
          800: '#285e61',
          900: '#234e52',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        indigo: {
          100: '#ebf4ff',
          200: '#c3dafe',
          300: '#a3bffa',
          400: '#7f9cf5',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
          800: '#434190',
          900: '#3c366b',
        },
        purple: {
          100: '#faf5ff',
          200: '#e9d8fd',
          300: '#d6bcfa',
          400: '#b794f4',
          500: '#9f7aea',
          600: '#805ad5',
          700: '#6b46c1',
          800: '#553c9a',
          900: '#44337a',
        },
        pink: {
          100: '#fff5f7',
          200: '#fed7e2',
          300: '#fbb6ce',
          400: '#f687b3',
          500: '#ed64a6',
          600: '#d53f8c',
          700: '#b83280',
          800: '#97266d',
          900: '#702459',
        },
      },
      spacing: {
        px: '1px',
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
        '72': '18rem',
      },
      backgroundColor: theme => theme('colors'),
      backgroundPosition: {
        bottom: 'bottom',
        center: 'center',
        left: 'left',
        'left-bottom': 'left bottom',
        'left-top': 'left top',
        right: 'right',
        'right-bottom': 'right bottom',
        'right-top': 'right top',
        top: 'top',
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
      },
      borderColor: theme => ({
        ...theme('colors'),
        default: theme('colors.gray.300', 'currentColor'),
      }),
      borderRadius: {
        none: '0',
        sm: '.125rem',
        default: '.25rem',
        lg: '.5rem',
        full: '9999px',
      },
      borderWidth: {
        default: '1px',
        '0': '0',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
      boxShadow: {
        default:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg:
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl:
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
        none: 'none',
      },
      container: {
        center: true,
        padding: '2rem',
      },
      cursor: {
        auto: 'auto',
        default: 'default',
        pointer: 'pointer',
        wait: 'wait',
        text: 'text',
        move: 'move',
        'not-allowed': 'not-allowed',
      },
      fill: {
        current: 'currentColor',
      },
      flex: {
        '1': '1 1 0%',
        auto: '1 1 auto',
        initial: '0 1 auto',
        none: 'none',
      },
      flexGrow: {
        '0': 0,
        default: 1,
      },
      flexShrink: {
        '0': 0,
        default: 1,
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: [
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
        mono: [
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      fontWeight: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      height: theme => ({
        auto: 'auto',
        ...theme('spacing'),
        full: '100%',
        screen: '100vh',
      }),
      inset: {
        '0': 0,
        auto: 'auto',
      },
      letterSpacing: {
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.1em',
      },
      lineHeight: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        code: 1.75,
        loose: 2,
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
      },
      margin: (theme, { negative }) => ({
        auto: 'auto',
        ...theme('spacing'),
        ...negative(theme('spacing')),
      }),
      maxHeight: {
        cover: '32rem',
        full: '100%',
        screen: '100vh',
      },
      maxWidth: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        full: '100%',
      },
      minHeight: {
        '0': '0',
        cover: '32rem',
        full: '100%',
        screen: '100vh',
      },
      minWidth: {
        '0': '0',
        full: '100%',
      },
      objectPosition: {
        bottom: 'bottom',
        center: 'center',
        left: 'left',
        'left-bottom': 'left bottom',
        'left-top': 'left top',
        right: 'right',
        'right-bottom': 'right bottom',
        'right-top': 'right top',
        top: 'top',
      },
      opacity: {
        '0': '0',
        '25': '.25',
        '50': '.5',
        '75': '.75',
        '100': '1',
      },
      order: {
        first: '-9999',
        last: '9999',
        none: '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
      },
      padding: theme => theme('spacing'),
      stroke: {
        current: 'currentColor',
      },
      textColor: theme => theme('colors'),
      transitionDelay: {
        none: '0ms',
      },
      transitionDuration: {
        default: '250ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      transitionProperty: {
        color: 'color',
        'border-color': 'border-color',
        bg: 'background-color',
        opacity: 'opacity',
        transform: 'transform',
      },
      transitionTimingFunction: {
        default: 'ease-out',
      },
      width: theme => ({
        auto: 'auto',
        ...theme('spacing'),
        '1/2': '50%',
        '1/3': '33.33333%',
        '2/3': '66.66667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.66667%',
        '2/6': '33.33333%',
        '3/6': '50%',
        '4/6': '66.66667%',
        '5/6': '83.33333%',
        '1/12': '8.33333%',
        '2/12': '16.66667%',
        '3/12': '25%',
        '4/12': '33.33333%',
        '5/12': '41.66667%',
        '6/12': '50%',
        '7/12': '58.33333%',
        '8/12': '66.66667%',
        '9/12': '75%',
        '10/12': '83.33333%',
        '11/12': '91.66667%',
        full: '100%',
        screen: '100vw',
      }),
      zIndex: {
        auto: 'auto',
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
      },
      willChange: {
        opacity: 'opacity',
        transform: 'transform',
      },
    },
    variants: {
      alignContent: ['responsive'],
      alignItems: ['responsive'],
      alignSelf: ['responsive'],
      appearance: ['responsive'],
      backgroundAttachment: ['responsive'],
      backgroundColor: ['responsive', 'hover', 'focus'],
      backgroundPosition: ['responsive'],
      backgroundRepeat: ['responsive'],
      backgroundSize: ['responsive'],
      borderCollapse: ['responsive'],
      borderColor: ['responsive', 'hover', 'focus'],
      borderRadius: ['responsive'],
      borderStyle: ['responsive'],
      borderWidth: ['responsive'],
      boxShadow: ['responsive', 'hover', 'focus'],
      cursor: ['responsive'],
      display: ['responsive'],
      fill: ['responsive'],
      flex: ['responsive'],
      flexDirection: ['responsive'],
      flexGrow: ['responsive'],
      flexShrink: ['responsive'],
      flexWrap: ['responsive'],
      float: ['responsive'],
      fontFamily: ['responsive'],
      fontSize: ['responsive'],
      fontSmoothing: ['responsive'],
      fontStyle: ['responsive'],
      fontWeight: ['responsive', 'hover', 'focus'],
      height: ['responsive'],
      inset: ['responsive'],
      justifyContent: ['responsive'],
      letterSpacing: ['responsive'],
      lineHeight: ['responsive'],
      listStylePosition: ['responsive'],
      listStyleType: ['responsive'],
      margin: ['responsive'],
      maxHeight: ['responsive'],
      maxWidth: ['responsive'],
      minHeight: ['responsive'],
      minWidth: ['responsive'],
      objectFit: ['responsive'],
      objectPosition: ['responsive'],
      opacity: ['responsive'],
      order: ['responsive'],
      outline: ['responsive', 'focus'],
      overflow: ['responsive'],
      padding: ['responsive'],
      pointerEvents: ['responsive'],
      position: ['responsive'],
      resize: ['responsive'],
      stroke: ['responsive'],
      tableLayout: ['responsive'],
      textAlign: ['responsive'],
      textColor: ['responsive', 'hover', 'focus'],
      textDecoration: ['responsive', 'hover', 'focus'],
      textTransform: ['responsive'],
      transitionDelay: ['responsive'],
      transitionDuration: ['responsive'],
      transitionProperty: ['responsive'],
      transitionTimingFunction: ['responsive'],
      userSelect: ['responsive'],
      verticalAlign: ['responsive'],
      visibility: ['responsive'],
      whitespace: ['responsive'],
      width: ['responsive'],
      willChange: ['responsive'],
      wordBreak: ['responsive'],
      zIndex: ['responsive'],
    },
    corePlugins: {},
    plugins: [
      require('tailwindcss-transitions')(),
      function({ addBase, config }) {
        addBase({
          h1: { fontSize: config('theme.fontSize.2xl') },
          h2: { fontSize: config('theme.fontSize.xl') },
          h3: { fontSize: config('theme.fontSize.lg') },
        });
      },
    ],
  };
```

Esse arquivo gigantesco tem todas as configurações do TailwindCSS para você customizar da maneira que preferir e esta é uma das vantagens de não utilizar um CDN.
Já estamos quase lá, agora vamos as dependências.

## Adicionando as dependências do TailwindCSS

Abra seu Terminal e digite o seguinte comando:

```
npm install @fullhuman/postcss-purgecss postcss-import postcss-nested tailwindcss-transitions --save-dev
```

> Não se assuste com o tamanho da linha acima, apenas estamos instalando as 4 dependências em um único comando.

Feito isso estamos quase lá, só precisamos criar a folha de estilo e importar os arquivos do TailwindCSS dentro do nosso site.

## Criando a folha de estilo

Precisamos agora adicionar o CSS ao Gridsome.

Abra o arquivo: `src/layouts/Default.vue` e substitua a tag **style** pelo seguinte código:

```html
<style src="~/assets/css/main.css"></style>
```

Caso você não tenha notado, nos ainda não temos as pastas mencionadas acima, então vamos criar agora.

Dentro da pasta `src` adicione uma pasta chamada de `assets` e dentro de **assets**  a pasta `css`.

Agora vamos criar o arquivo de CSS chamado `main.css` dentro da pasta: `src/assets/css` e adicionar o seguinte código:

```css
/*! purgecss start ignore */
@import 'tailwindcss/base';
/*! purgecss end ignore */

@import 'tailwindcss/components';

@import 'tailwindcss/utilities';

/* Simples exemplo de como utilizar as directivas do TailwindCSS */
.active--exact {
  @apply text-teal-500 font-bold;
}
```

Pronto agora temos o **Gridsome** funcionando com **TailwindCSS** em uma instalação limpa, ou seja você pode começar a criar suas aplicações sem aquela complexidade todo que a maioria dos starter-kits propõe.

A última dica e adicionar algumas classes ao markup do arquivo `src/layouts/Default.vue` para ter um alinhamento visual agradável, para isso substitua o código da tag `<template>` pelo código a seguir:

```html
<template>
  <div class="layout">
    <header class="container mx-auto flex py-2">
      <div class="brand flex-1">
        <strong>
          <g-link to="/">{{ $static.metaData.siteName }}</g-link>
        </strong>
      </div>
      <nav class="nav flex-1 text-right">
        <g-link class to="/">Home</g-link>
        <g-link class="ml-4" to="/about">About</g-link>
      </nav>
    </header>
    <section class="container mx-auto h-full min-h-screen py-8 -mb-20">
      <slot />
    </section>
    <footer class="relative w-full">
      <div class="container mx-auto">
        <a
          class="mr-4"
          href="https://gridsome.org/docs"
          target="_blank"
          rel="noopener"
        >Gridsome Docs</a>
        <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
      </div>
    </footer>
  </div>
</template>
```

Agora temos um resultado bacana, como a imagem abaixo:

![Gridsome and TailwindCSS](/images/posts/gridsome-tailwind.png)

[Aqui tem](https://github.com/newaeonweb/gridsome-blog-example) um projeto legal utilizando essa técnica e [aqui tem](https://barbadev.netlify.com/articles/comecando-com-gridsome-vue-js-e-graph-ql/) um post com algumas dicas para criar páginas e templates, além de utilizar Ajax para carregar conteúdo externo.

Se gostou, compartilha!
