---
title: Simulando uma API Restful parte II
description: "Como simular um API Restful para utilizar em qualquer framework de front-end como; AngularJS, Vue.js, Ember.js e outros"
tags: [Front-end]
keys: [NodeJS, Angular]
date: 2016-02-11
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: true
---

No post anterior criamos um simples arquivo **JSON** para simular nosso banco de dados, neste post vamos ver como podemos gerar uma massa de dados e interagir com uma interface.

> Este post é continuação da parte I que você encontra [aqui](http://newaeonweb.com.br/restful/2016/02/05/Simulando-uma-API-Restful-part-I/).

## Instalando as ferramentas necessárias!

Abra seu Terminal/Shell e digite:

    npm install faker underscore

Vamos utilizar o **faker** para gerar nossos dados e o **underscore** em nossa função.
Você encontra mais informações sobre o faker [aqui](https://github.com/FotoVerite/Faker.js).
Com ele você pode gerar todo tipo de dado, endereços, imagens, datas, entre outras coisas.

## Criando o arquivo gerador da API.

Continuando com a mesma pasta do exemplo [anterior](http://newaeonweb.com.br/restful/2016/02/05/Simulando-uma-API-Restful-part-I/#iniciando-o-projeto-api-de-testes), vamos criar o arquivo que vai gerar nossa API.

Dentro desta pasta, crie um arquivo chamado `fakerdb.json` e insira o seguinte código:

```js

module.exports = function() {
    var faker = require('faker');
    var _ = require('underscore');

    return {
        band: _.times(10, function (number) {
            return {
                id: number,
                name: faker.random.arrayElement(["Ozzy", "Metallica", "Rush", "Marillion"]),
                description: faker.lorem.paragraph(),
                active: true,
                picture: faker.image.imageUrl('g','350','150')
            }
        })
    }
}

```

> Note que a função `times()` determina a quantidade de registro que vamos gerar, neste exemplo 10, mas você pode passar o quanto quiser.

## Iniciando o servidor.

Agora, vamos iniciar o servidor e ver o resultado.

Abra seu Terminal/Shell e digite:

    json-server fakerdb.json

Abra seu navegador e acesse a url [localhost:3000/band](http://localhost:3000/band).

Você vai ver o resultado abaixo:

```js
    [{
    "id": 0,
    "name": "Marillion",
    "description": "Non voluptas quam voluptas voluptate.\nSit expedita dolores voluptas voluptas harum minus.\nEaque magnam rerum cum.\nId aspernatur et.\nEius quo voluptas.",
    "active": true,
    "picture": "http://lorempixel.com/g/350/150"
    }, {
    "id": 1,
    "name": "Ozzy",
    "description": "Commodi eaque nulla molestiae dolore omnis dicta.\nSunt nihil doloribus quo dolor et.\nOmnis voluptatum unde porro officia nobis.",
    "active": true,
    "picture": "http://lorempixel.com/g/350/150"
    }, {
    "id": 2,
    "name": "Marillion",
    "description": "Ut consectetur mollitia.\nVelit laboriosam aut mollitia quidem voluptas.\nQuam voluptatem earum harum ea qui veniam eum aut.\nAsperiores non reprehenderit ut.\nConsequatur ut impedit sit harum.\nPossimus et corporis necessitatibus dolor eveniet odio quia.",
    "active": true,
    "picture": "http://lorempixel.com/g/350/150"
    }, {
    "id": 3,
    "name": "Ozzy",
    "description": "Quia voluptatum et esse.\nDolorum quia a est voluptatem.\nOptio consequatur eos excepturi fugiat.\nEst rem qui iste nesciunt eius quis omnis explicabo.\nConsequatur nemo culpa placeat.\nFuga minus fugiat et animi dolores magnam temporibus delectus aperiam.",
    "active": true,
    "picture": "http://lorempixel.com/g/350/150"
    }, {
    "id": 4,
    "name": "Ozzy",
    "description": "Eligendi quo at.\nOmnis nobis perspiciatis a eum accusantium qui.\nDolorum optio nostrum.",
    "active": true,
    "picture": "http://lorempixel.com/g/350/150"
    }, {
    "id": 5,
    "name": "Marillion",
    "description": "Deserunt aut voluptatibus ex fuga placeat inventore veniam sint.\nSunt voluptate voluptas nobis sapiente et.\nDolores quia ab officiis ut molestias.\nEaque quis quibusdam vel qui.",
    "active": true,
    "picture": "http://lorempixel.com/g/350/150"
    }, {
    "id": 6,
    "name": "Metallica",
    "description": "Molestiae autem assumenda ut sit doloremque eligendi voluptas dolorum consequatur.\nCorrupti impedit numquam ut eum rerum placeat.\nMollitia possimus consequatur quod ab dolores excepturi corporis numquam.\nNecessitatibus ullam aut eum.",
    "active": true,
    "picture": "http://lorempixel.com/g/350/150"
    }, {
    "id": 7,
    "name": "Rush",
    "description": "Necessitatibus ut et culpa corporis quam.\nAdipisci earum est nam veritatis sed dolore.\nFuga assumenda dolor commodi enim repellendus enim doloremque.",
    "active": true,
    "picture": "http://lorempixel.com/g/350/150"
    }, {
    "id": 8,
    "name": "Rush",
    "description": "Assumenda impedit aut accusantium rerum sit possimus.\nVoluptatem inventore et.\nIusto tempora est distinctio sit nostrum vitae omnis quibusdam.\nIn quisquam velit commodi quae sed.\nId fuga et fugiat est tenetur quasi.",
    "active": true,
    "picture": "http://lorempixel.com/g/350/150"
    }, {
    "id": 9,
    "name": "Metallica",
    "description": "Sed omnis enim cum illo laboriosam enim laborum sit facilis.\nLibero quidem culpa inventore.\nVoluptatum necessitatibus iste temporibus modi est.\nEaque totam quibusdam.\nEarum et sit doloremque dolores vel similique aliquam.",
    "active": true,
    "picture": "http://lorempixel.com/g/350/150"
    }]

``` 

Pronto, agora você pode facilmente interagir com esta API e criar o seu front end.

## Utilizando AngularJS para consumir a API.

Vamos utilizar AngularJS para criar nossa aplicação, e aproveitar a facilidade do **json-server** para criar um HTML e consumir os dados da API.

No diretório raiz, crie um arquivo HTML e utilize o código abaixo:
```html
    <!doctype html>
    <html class="no-js" lang="">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>AngularJS API</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <!-- cdnjs -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
        </head>
        <body ng-app="api">
            <!--[if lt IE 8]>
                <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
            <![endif]-->

            <!-- Add your site or application content here -->


            <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-animate.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-resource.min.js"></script>
            <script src="js/main.js"></script>
        </body>
    </html>
```

Feito isso, vamos criar nosso arquivo JS, crie um diretório chamado **JS** e dentro dele um arquivo `mais.js` com o código abaixo:

```js
    (function () {
        'use strict'

            angular
                .module('api', ['ngResource'])
                .factory('apiService', apiService)
                .controller('getBands', getBands);

        apiService.$inject = ['$resource'];
        function apiService($resource) {

            return $resource('./band/:bandId', { bandId: '@bandId' }, {
                get: { method: 'GET', isArray: false },
                update: { method: 'PUT' }
            })

        }

        getBands.$inject = ['apiService'];
        function getBands(apiService) {
            var vm = this;

            vm.listBands = apiService.query();
            
        }

    })();
``` 

> Note que por ser um exemplo básico, estou utilizando tudo no mesmo arquivo. Não faça isso em produção.

Agora vamos adicionar o código HTML para renderizar os dados da API, utilize o código abaixo e insira logo após o comentário do arquivo `index.html`.
```html
    <div class="container" ng-controller="getBands as vm">
        <p>Consumindo a API</p>

        <div class="card card-block" ng-repeat="item in vm.listBands">
            <img class="card-img-top" ng-src="{{item.picture}}" alt="{{item.name}}">
            <div class="card-block">
                <h4 class="card-title">{{item.name}}</h4>
                <p class="card-text">{{item.description}}</p>
                <a href="band/{{item.id}}" class="btn btn-primary">Editar</a>
            </div>
        </div>
    </div>
```
O resultado pode ser visto em [http://localhost:3000/](http://localhost:3000/), conforme a imagem abaixo:

![Consumindo a API](/images/posts/card-api.png)

No próximo post, vamos adicionar o ui-router e criar o HTML para editar e adicionar mais dados.
