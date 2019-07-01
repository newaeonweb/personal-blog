---
layout: post
title: Karma Testing in five minutes on AngularJS applications.
description: "Aprenda como executar testes unitários em aplicações AngularJS em cinco minutos utilizando Angm-Generator"
tags: [Front-end]
keys: [Angular, Karma Runner]
date: 2015-11-29
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: true
---

Neste post vou mostrar como é fácil e rápido realizar testes unitários em uma aplicação AngularJS utilizando o gerador: [generator-angm](https://github.com/newaeonweb/generator-angm).

## Karma, Jasmine e Karma Runner.
Se você é iniciante pode querer saber mais sobre instalação e configuração das ferramentas que utilizarei para rodar os testes, estas informações podem ser encontradas nos links abaixo:

* [Karma](http://karma-runner.github.io/0.12/index.html)
* [Jasmine](http://jasmine.github.io/)

## Criando uma aplicação do zero.
Para esta tarefa vou utilizar a nova versão do gerador: [generator-angm](https://github.com/newaeonweb/generator-angm), que poupa um trabalho e tanto na criação de qualquer aplicação AngularJS.

Se você ainda não possui o gerador instalado, basta clicar no seu Terminal:

    npm install -g yo generator-angm

Pronto, agora você já tem o gerador na sua maquina.

Crie uma nova pasta em qualquer lugar da sua maquina e abra o Terminal.

    cd + "path para pasta que criou"

    yo angm

Siga os passos solicitados pelo instalador.

Como estamos utilizando um gerador, todos os arquivos necessários para rodar os testes já estão configurados, precisamos apenas fazer algumas modificações.

## Configurando os testes.
Vamos examinar o arquivo `karma.conf.js` na raiz da aplicação:

```js
    'use strict';

    // Karma configuration
    module.exports = function(config) {
    config.set({
        // Frameworks to use
        frameworks: ['jasmine'],

        // List of files / patterns to load in the browser
        files: [
            'src/bower_components/jquery/dist/jquery.js',
            'src/bower_components/es5-shim/es5-shim.js',
            'src/bower_components/json3/lib/json3.min.js',
            'src/bower_components/bootstrap/dist/js/bootstrap.js',
            'src/bower_components/angular/angular.js',
            'src/bower_components/angular-resource/angular-resource.js',
            'src/bower_components/angular-mocks/angular-mocks.js',
            'src/bower_components/angular-cookies/angular-cookies.js',
            'src/bower_components/angular-sanitize/angular-sanitize.js',
            'src/bower_components/angular-animate/angular-animate.js',
            'src/bower_components/angular-touch/angular-touch.js',
            'src/bower_components/angular-route/angular-route.js',
            'src/bower_components/angular-ui-router/release/angular-ui-router.js',
            'src/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/app.js',
            'app/modules/home/homeCtrl.js',
            'app/modules/home/homeRoute.js',
            'app/modules/home/home-test.js',
            'app/modules/**/*Ctrl.js',
            'app/modules/**/*Route.js',
            'app/modules/**/*Service.js',
            'app/modules/**/*-test.js'
        ],

        // Test results reporter to use
        // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        //reporters: ['progress'],
        reporters: ['progress'],

        // Web server port
        port: 9876,

        // Enable / disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // If true, it capture browsers, run tests and exit
        singleRun: true
    });
    };

```

Podemos dizer que este arquivo é o responsável por configurar as informações básicas do **Karma**, note a tag **reporter** ela determina o tipo de visualização que teremos durante e após a execução dos testes.

Além disso a tag **browser** indica em qual browser devemos executar o teste, o exemplo padrão vem configurado com o **PhantomJS.**.

É possível utilizar qualquer browser da lista acima, desde que o tenha instalado em sua maquina.

## Executando o teste.
Abra o arquivo `home-test.js` na raiz do projeto e vamos examina-lo:

```js 
    'use strict';

    (function() {
    describe('homeCtrl', function () {
        var controller = null, $scope = null;

        beforeEach(function () {
            module('angmodular');
        });

        beforeEach(inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();
            controller = $controller('HomeCtrl', {
                $scope: $scope
            });
        }));

        it('Should HomeCtrl must be defined', function () {
            expect(controller).toBeDefined();
        });

        it('Should have title', function() {
            expect($scope.title).toBe('Hello, Angm-Generator!');

        });

    });
    })()
``` 

Este arquivo também já vem configurado, mas vamos olhar mais de perto.
A syntax utilizada aqui é a do **Jasmine**, existem desenvolvedores que preferem utilizar a syntax do **Mocha**, eu particularmente utilizo a que estiver a mão, neste caso manteremos o Jasmine.

A função `describe();`, recebe dois parâmetros, um é o nome do teste, a sting "HomeCtrl", o segundo é a função que executa este bloco de teste.

Antes de executar qualquer teste, precisamos importar o modulo da aplicação na função `beforeEach();` e instanciar o controller para ser utilizado no teste.

As funções `it();` determinam os testes que devem ser executados, o primeiro parâmetro é o nome do teste e o segundo a função que executa o teste, neste caso já temos dois testes pré configurados pelo gerador.

Abra o Terminal e digite o código abaixo:

    npm test

Esse é o resultado do nosso teste:

```
    PhantomJS 1.9.8 (Mac OS X 0.0.0): Executed 2 of 2 SUCCESS (0.003 secs / 0.02 secs)
``` 

Nele é possível verificar que ambos os testes passaram, porém essa representação no Terminal não é muito bonita, veremos como melhorar isso adicionando um plugin do Karma para isso.

## Instalando Karma HTML reporter.
Em seu Terminal, digite o comando abaixo:

    npm install karma-htmlfile-reporter --save-dev

Pronto, plugin instalado e pronto para ser utilizado, precisamos apenas configurar o Karma.

Vamos adicionar as linhas abaixo ao arquivo `karma.conf.js`:

```js 
    htmlReporter: {
      outputFile: 'tests/units.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: 'A sample project description'
    }
``` 

Agora podemos visualizar os teste de uma maneira muito melhor:

![Karma HTML reporter](/images/posts/karma-html-reporter.png)
