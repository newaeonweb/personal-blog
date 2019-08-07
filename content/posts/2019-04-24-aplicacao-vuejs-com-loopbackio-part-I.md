---
title: Aplicação Restful VueJS com Loopback.io. Part I
description: "Este artigo/projeto é um pequeno exemplo de como criar incriveis aplicações com VueJS no front-end e loopback.io no back-end com uma API Restful."
date: 2019-04-24
xrelated: Loopback
tags: [Back-end]
keys: [Loopback, VUEJS]
cover: https://placeimg.com/1220/900/tech
fullscreen: true
---

Este artigo/projeto é um pequeno exemplo de como criar incriveis aplicações com VueJS no front-end e loopback.io no back-end com uma API Restful. **Mas você pode utilizar qualquer framework para SPA**. Nesta serie nos vamos ver:

- Instalando e configurando Loopback.
- Instalando e configurando VueJS.
- Como rodar VueJS e Loopbback juntos utilizando a mesma porta.
- Back-end:
  - Loopback modelos e relacionamentos.
  - Como criar uma carga de dados inicial.
  - Customização de erros.
  - Como utilizar filtros e parametros de url.
  - Autenticação e autorização.
- Front-end:
  - Como organizar uma aplicaçao em VueJS.
  - Como adicionar bibliotecas de terceiros.
  - Utilizar o Element-ui para construir a interface.
  - Validação de formulários com Vee-validation.
  - XmlHttpRequest com Axios.
- Build and Deploy.
- Integração continua com Codeship e Heroku.

> Lembrece você pode utilizar a lista de front-end com qualquer um desses frameworks: **Angular**, **React**, **Ember**, **jQuery** etc...

Você encontra mais informações sobre os frameworks utilizados neste artigo aqui:  [VueJS](https://vuejs.org/), e aqui: [LoopBack.io](http://loopback.io).

## Iniciando
Como primeiro passo, se você ainda não tem instalado, vamos instalar nossas ferramentas. Este artigo assume que você já tem instalado o NodeJS em sua maquina e um bom entendimento sobre **SPA**, e desenvolvimento **web** em geral, além é claro de **JavaScript**, **HTML**

## Instalando o loopback e o VueJS em sua maquina.

1- Esse projeto foi criado utilizando o **loopback-cli**, então instale com o seguinte comando:

```
npm install -g loopback-cli
```

> O comando executado acima vai instalar o **LoopBack v3** em sua maquina.

2- O próximo passo é instalar o **vue-cli**, utilise o seguinte comando:

```
npm install -g @vue/cli
```

> O comando executado acima vai instalar o **VueJS v3** em sua maquina.

**Notas importantes sobre VueJS.**

_O nome do pacote mudou de **vue-cli*** para **@vue-cli**. Se você tem a versão anteriror **vue-cli** (1.x or 2.x) instalado globalmente, você previsa desinstalar com: `npm uninstall vue-cli -g` ou `yarn global remove vue-cli`._

**Requerimentos para versão do NodeJS.**

_Vue-cli* requer Node.JS versão **8.9** ou superior (**8.11.0+** recomendado). Você pode gerenciar mutiplas versões do NodeJS na mesma maquina com **nvm** ou **nvm-windows**._

## Criando uma nova aplicação back-end

Neste passo nos vamos criar uma simples API utilizando o **loopback-cli**. Então vamos ver como fazemos.

3- Para criar uma aplicação do zero com **LoopBack cli** utilise o seguinte comando em seu Terminal:

```
lb
```

4- Siga as questões com as seguintes respostas:

```
App name: example
Project directory: example
Loopback version: 3.x (Current)
Kind of application do you have in mind: api-server
```

No final do Terminal, você deverá ver algo assim:

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

> Note a criação do diretório **client**, é ai que vamos colocar nosso código front-end.

## Criando uma aplicação front-end dentro do loopback

Existem várias maneiras de adicionar código front-end em uma aplicação loopback, entretanto algumas maneiras sugerem a utilização de builds e servidores/portas separadas até mesmo em outro diretório.

Eu prefiro utilizar o mesmo servidor e porta, neste caso a default do loopback 3000, até mesmo porque depois para separar o código não é tão complicado e como essa é uma aplicação simples vamos manter assim.

Vejamos como manter a mesma porta para ambas aplicações. Mãos a obra.

5- Dentro do diretório `example`, use o seguinte comando:

```
vue create client
```

Sim, nos já temos um diretório chamado `client` na raiz da pasta `example`, então vejamos o que fazer:

#### Utilize a opção merge:

```
Vue CLI v3.5.5
? Target directory /example/client already exists. Pick an action:
  Overwrite
❯ Merge
  Cancel
```

#### Selecione manualmente as seguintes opções:

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

> Note que escolhemos YES para primeira questão: **Use history mode for router? (Requires proper server setup for index fallback in production) Yes**. Mais a frente nesse tutorial veremos como utilizar o fallback para history API dentro de uma aplicação loopback.

No final do comando você vai ver algo similar a menssagem:

```
🎉  Successfully created project client.
👉  Get started with the following commands:

 $ cd client
 $ npm run serve
```

Bem, parabéns nos temos uma aplicaçao VueJS criada com sucesso.

## Configurando o loopback para servir arquivos estáticos.

Agora vamos ajustar nosso back-end para servir a aplicação VueJS, mas antes de seguirmos em frente, vamos ver umas notas importantes sobre o processo de build.

#### Nota importante sobre o processo de build:

Neste momento se executarmos o comando sugerido pelo Vue-cli e rodarmos o comando `npm run serve` dentro do diretório **client** nossa aplicação vai rodar na porta 8080 padrão do VueJS. Mas lembre-se **nos não queremos isso**.

Como nos todos sabemos toda aplicaçõe **VueJS** vem por padrão com alguns scripts de comando para iniciar o servidor, linting e buid da aplicação, como nos podemos ver na tag **scripts** do arquivo **package.json**:

```json
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  }
```

Mas no nosso caso nos vamos mover os **scripts** para o arquivo `package.json` do loopback.

### Editado o arquivo middleware.json.
Agora vamos fazer uns ajustes no arquivo `middleware.json` para configurar a pasta client e servir nossa aplicação VueJS.

6- Dentro da pasta **server**, abra o arquivo: `middleware.json` e adicione as seguintes linhas de código dentro da tag **files**:

```json
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

**Note que a segunda rota é o fallback para o arquivo index.html, esse é o truque para podermos utilizar o History Browser API sugerido pelo VueJS na criação das rotas.**

Você provavelmente notou que nos adicionamos um novo diretório dentro da pasta `client` certo? A pasta `dist` é onde o VueJS coloca os arquivos de build e nos vamos trabalhar diretemente nessa pasta.

7- Agora remova o arquivo `root.js` dentro da pasta `server/boot`. Não tenha medo, não vamos utiliza-lo.

O próximo passo é adicionar as alterações no arquivo `package.json` dentro da pasta `server`, sim nos vamos utilizar apenas um `package.json`, conforme já comentamos anteriormente.

8- Substitua o conteúdo do arquivo `server/package.json` pelo seguinte código:

```json
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

> Não esqueça de executar o comando `npm install` na raiz do projeto para instalar as novas dependências do arquivo `package.json`.

Esta linha de código é onde acontece a mágica:

`"start": "parallelshell 'npm run build-client' 'npm run nodemon-start'"`

Nos estamos utilizando duas tarefas ao mesmo tempo, uma para fazer o build da aplicação VueJS e com a flag `--watch` ativada, para sempre que algum arquivo for alterado, o projeto será recompilado e atualizado dentro do diretório **dist**.

`"build-client": "cd client && vue-cli-service build --watch"`

A outra tarefa é para rodar o servido utilizando o **nodemon**.

`"nodemon-start": "nodemon"`

Mais uma alteração importante é adicionar a seguinte configuração:

```json
  "nodemonConfig": {
    "ignore": [
      "client/*"
    ],
    "delay": "2500"
  }
```

Isto faz com que o **nodemon** seja ativado apenas no diretório **server**, trabalhando apenas em cima dos arquivos do LoopBack.

A última alteração que vamos adicionar é no arquivo `.eslintrc` na raiz do diretório do projeto:

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

E graças ao pacote `parallelshell`. Nos podemos rodar mais de uma tarefa ao mesmo tempo: `"start": "parallelshell 'npm run build-client' 'npm run nodemon-start'"`.

Bem, nos vimos uma grande quantidade de código até aqui, agora vamos fazer uma pausa e em breve partimos para o segundo artigo, onde mergulhamos mais a fundo no loopback.

Esse post tem uma versão em Inglês [aqui](/articles/how-to-build-a-vue-js-app-with-loopback-io-rest-api).
