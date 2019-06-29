---
layout: post
title: Como encerrar processo Node no OSX.
description: "Como encerrar processo Node no OSX."
tags: [NodeJS]
date: 2015-08-20
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: true
---

Já teve o azar de fechar a janela do Terminal depois de executar um comando para iniciar um server utilizando **Node.js** ou **Grunt.js**?

Tentou abrir uma nova janela e clicar no `control + c`, sem sucesso?

Uma maneira simples de resolver isso é abrir o seu Terminal e digitar o seguinte comando:

```
    lsof -i -P | grep -i "listen"
```

Depois de identificar o processo, basta digitar:

```
    kill -9 node
```

Sim, existem outras maneiras, mas o comando acima, lista apenas as portas utilizadas pelo usuario, geralmente servidores locais. Além disso tem um descritivo bem simples.
