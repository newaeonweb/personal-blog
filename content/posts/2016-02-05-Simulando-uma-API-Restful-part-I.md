---
layout: post
title: Simulando uma API Restful parte I
description: "Como simular um API Restful para utilizar em qualquer framework de front-end como; AngularJS, Vue.js, Ember.js e outros"
tags: [Front-end]
date: 2016-02-05
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: true
---

Já precisou testar seu código Front-end ou aquele novo framework MVVM e interagir com uma API?
Já teve que configurar um servidor em Node.js ou escrever monte de código para simular uma API.

Salvar os dados em um arquivo local ou ainda configurar um MongoDB só para realizar alguns testes ou modelar uma API e interagir com os verbos HTTP:
1. GET
2. POST
3. PUT
4. DELETE
5. OPTIONS

Felizmente temos uma alternativa para isso, com pouquíssimas linhas de código podemos simular um API Restful e interagir com ela, não apenas utilizando o método **GET** mas todos os outros, sem configurar um banco de dados.

Vamos ver como isso é possível neste primeiro post sobre o assunto.

## Instalando as ferramentas necessárias!

Abra seu Terminal/Shell e digite:

    npm install -g json-server

Agora instale a extensão do Chrome para testes de HTTP/REST/Client [neste link](https://chrome.google.com/webstore/detail/dhc-resthttp-api-client/aejoelaoggembcahagimdiliamlcdmfm).

Neste momento já temos o necessário para esta primeira parte, então mãos a obra.

## Iniciando o projeto API de testes.

Crie uma nova pasta onde preferir e abra seu Terminal/Shell nela.

Agora, crie um arquivo chamado `db.json` e insira o seguinte código:

```json

{
  "band": [
    {
      "name": "Metallica",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "active": true,
      "id": 0
    }
  ]
}
```

Este código vai funcionar como uma espécie de **Model** algo similar ao que faríamos utilizando o **mongoose**.

## Iniciando o servidor.

Agora, vamos iniciar o servidor e ver o resultado.

Abra seu Terminal/Shell e digite:

    json-server db.json

Abra seu navegador e acesse a url [localhost:3000/band](http://localhost:3000/band).

Você vai ver o resultado abaixo:

![Servidor Rodando](/images/posts/json-view.png)

> Esta formatação do browser é devido ao  **jsonview** uma extenção do Chrome para facilitar e visualização de arquvios JSON.

## Adicionando Registros.
Para adicionar registros em nosso arquivo, você pode utilizar qualquer REST/Client, mas neste exemplo vamos utilizar o que instalamos logo acima.

Então abra o **dhc-resthttp-api-client** e vamos inserir os seguintes dados, conforme a imagem:

![DHC RestClient](/images/posts/dhc-restclient.png)

> Note: que adicionei um campo para imagem.

Você pode notar que após clicar no botão **Send**, logo abaixo já tem o resultado da requisição:

![DHC RestClient](/images/posts/dhc-restclient-success.png)

Agora é só alterar o verbo para **GET** e enviar novamente para ver o resultado:

![DHC RestClient](/images/posts/dhc-restclient-get.png)

Ou ir direto no browser e acessar: [localhost:3000/band](http://localhost:3000/band).

## Consultando Registros.
Além de toda essa facilidade, podemos consultar registros individualmente e altera-los.

No exemplo anterior, podemos ver dois registros, um com imagem e outro sem, então vamos adicionar uma imagem ao registro `0`.

Altere o verbo para **PUT**.

Passe o `id` no final do endpoint: `localhost:3000/band/0`.

Adicione o campo **picture** e o link para imagem: `http://placehold.it/350x150`.

Clique em **Send**.

Logo após o envio você já pode conferir o resultado, no console logo abaixo.

No próximo post, mostro como inserir mais dados de uma forma diferente.
