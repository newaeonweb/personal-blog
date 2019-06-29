---
title: Porque utilizar o nvm?.
description: "Uma simples alternativa a quebra de compatibilidade de alguns plugins Node.js."
tags: [NodeJS]
date: 2015-03-01
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: true
---

Recentemente em um projeto que trabalho tivemos um problema bem típico que pode ocorrer frequentemente, ele se chama quebra de compatibilidade, alguns chamam de bug também.
Quando falamos de Node.js isso é bem frequente, então uma alternativa simples para evitar muita dor de cabeça é fazer o gerenciamento das versões que utiliza do Node.

A versão 0.12.0 tem um problema de compatibilidade com as versões mais atuais das libs **grunt-sass** e **node-sass**, isso afetou alguns frameworks que utilizam estes plugins como dependências. Então até que seus autores corrijam esse contra-tempo, precisamos manter os projetos em evolução, certo?

## Gerenciando as versões do Node.
Como sabem, o Node ainda não tem a sua versão 1.0, e isso quer dizer que evolui muito rapidamente para alcança-la, atualmente estamos na versão 0.12.0.

Então nada mais apropriado do que gerenciar as versões existentes e manter seus projetos evoluindo sem maiores transtornos.

## Instalando o NVM.
É muito simples utilizar esse gerenciador, acesse o site: [nvm](https://github.com/creationix/nvm), e siga as orientações para sua plataforma.

Depois disso é só utilizar a versão que quiser com os comandos abaixo:

Para instalar uma versão:

`nvm install 0.10`

E para utilizar:

`nvm use 0.10`

Desta maneira pode utilizar versão apropriada para seu projeto.
