---
title: Aplicação Restful VueJS com Loopback.io. Part II
slug: aplicacao-restful-vue-js-com-loopback-io-part-ii
description: "Continuando o post anterior vamos ver como criar um **datasource** para guardar as informações de conexão com nosso banco de dados, para esse exemplo vamos utilizar o MongoDB. Então assumimos que você já tenha instalado em sua maquina."
date: 2019-04-28
author: Barba
tags: [Back-end]
keys: [Loopback, VUEJS]
cover: https://placeimg.com/1220/900/tech
fullscreen: true
---

Continuando o [post anterior](/aplicacao-restful-vue-js-com-loopback-io-part-i/) vamos ver como criar um **datasource** para guardar as informações de conexão com nosso banco de dados, para esse exemplo vamos utilizar o MongoDB.

Então assumimos que você já tenha instalado o MongoDB em sua maquina.

1- Abra o seu Terminal dentro da pasta do projeto e digite o seguinte comando:

```
lb datasource
```

Utilize as seguintes respostas:

```
? Insira o nome da origem de dados: mongoDB
? Selecione o conector para mongoDB: MongoDB (suportado por StrongLoop)
? Connection String url to override other settings (eg: mongodb://username:password@hostname:port/database):
? host: localhost
? port: 27017
? user:
? password:
? database: example_vuejs_loopback
? Instalar loopback-connector-mongodb@^1.4 Yes
```
E depois disso nosso arquivo `server/datasources.json` tem a configuração necessária:

```json
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mongoDB": {
    "host": "localhost",
    "port": 27017,
    "url": "",
    "database": "example_vuejs_loopback",
    "password": "",
    "name": "",
    "user": "",
    "connector": "mongodb"
  }
}
```
> Atenção em produção você deve utilizar um usuário e senha para proteger o seu banco de dados.

2- Agora vamos editar o arquivo `server/model-config.json` para os modelos já existentes: **User**, **ACL**, **AccessToken**, **RoleMapping** e **Role** utilizarem o mesmo banco de dados:

```json
  "User": {
    "dataSource": "mongoDB"
  },
  "AccessToken": {
    "dataSource": "mongoDB",
    "public": false
  },
  "ACL": {
    "dataSource": "mongoDB",
    "public": false
  },
  "RoleMapping": {
    "dataSource": "mongoDB",
    "public": false,
    "options": {
      "strictObjectIDCoercion": true
    }
  },
  "Role": {
    "dataSource": "mongoDB",
    "public": false
  }
```

Muito simples heim? Em poucos segundos já temos a conexão com o banco de dados pronta para utilizarmos na aplicação toda.

## Criando um novo modelo

Os modelos da aplicação são criados também através da linha de comando do loopback-cli, vamos ver como é simples.

3- No Terminal utilize o seguinte comando:

```
lb model
```

Use as seguntes respostas:

```
? Insira o nome do modelo: Discography
? Selecione a origem de dados para a qual conectar o Discography: mongoDB (mongodb)
? Selecione a classe base do modelo PersistedModel
? Expor Discography por meio da API REST? Yes
? Formulário plural customizado (usado para construir REST URL):
? Modelo comum ou apenas servidor? comum
```

Em seguida vamos adicionar algumas propriedades/campos para nosso modelo:

```
? Nome da Propriedade: title
   invoke   loopback:property
? Tipo de propriedade: string
? Necessário? Yes
? Valor padrão [deixe em branco para nenhum]:

? Nome da Propriedade: year
   invoke   loopback:property
? Tipo de propriedade: string
? Necessário? Yes
? Valor padrão [deixe em branco para nenhum]:

? Nome da Propriedade: tracks
   invoke   loopback:property
? Tipo de propriedade: number
? Necessário? No
? Valor padrão [deixe em branco para nenhum]:
```

Pronto, nosso primeiro modelo esta criado.

4- Ainda no Terminal vamos repetir o comando acima (Passo 3) e utilizar as seguintes respostas:

```
? Insira o nome do modelo: Band
? Selecione a origem de dados para a qual conectar o Band: mongoDB (mongodb)
? Selecione a classe base do modelo PersistedModel
? Expor Band por meio da API REST? Yes
? Formulário plural customizado (usado para construir REST URL):
? Modelo comum ou apenas servidor? comum
Vamos incluir algumas propriedades Band agora.

Insira um nome de propriedade em branco ao concluir.
? Nome da Propriedade: name
   invoke   loopback:property
? Tipo de propriedade: string
? Necessário? Yes
? Valor padrão [deixe em branco para nenhum]:

Vamos incluir outra propriedade Band.
Insira um nome de propriedade em branco ao concluir.
? Nome da Propriedade: description
   invoke   loopback:property
? Tipo de propriedade: string
? Necessário? No
? Valor padrão [deixe em branco para nenhum]:

Vamos incluir outra propriedade Band.
Insira um nome de propriedade em branco ao concluir.
? Nome da Propriedade: country
   invoke   loopback:property
? Tipo de propriedade: string
? Necessário? No
? Valor padrão [deixe em branco para nenhum]:
```

Agora vamos dar uma olhada para ver como ficou nosso Swagger. No Terminal digite; `node .`. Agora visite: [seu localhost porta 3000/explorer](http://localhost:3000/explorer) e você vai ver algo similar a esta imagem:

![swagger view](/images/posts/loopback_1.png)

Parabéns agora nos temos dois modelos criados e o melhor de tudo é que o loopback cria todos os metodos HTTP que precisamos para nossa API Restful.

Como nos podemos ver nessa imagem:

![swagger view](/images/posts/loopback_2.png)

## Relacionamento entre os modelos

Nesse tutorial nos vamos abordar dois tipos de relacionamento: **hasMany** e **belongsTo**, são os mais simples e também largamente utilizado em praticamente toda aplicação com banco de dados.

Graças ao **loopback-cli** nos podemos criar os relacionamentos diretamente utilizando a linha de comando. Mas antes de iniciarmos vamos entender o que vamos fazer, olhando a imagem abaixo:

![swagger view](/images/posts/loopback_3.png)

## Criando o relacionamento hasMany

Neste passo nos vamos dizer que o modelo **Band** pode ter muitas Discographies.

5- No Terminal digite o seguinte comando:

```
lb relation
```

Responda as próximas perguntas com as seguintes respostas:

```
? Selecione o modelo a partir do qual criar o relacionamento: Band
? Tipo de relação: has many
? Escolha um modelo com o qual criar um relacionamento: Discography
? Insira o nome da propriedade para a relação: discographies
? Opcionalmente, insira uma chave estrangeira customizada:
? Requerer um modelo completo? Yes
? Escolha um modelo completo: Discography
? Permitir que a relação seja aninhada nas APIs de REST: Yes
? Impedir que a relação seja incluída: No
```

## Criando o relacionamento belongsTo

Aqui dizemos que o modelo Discography pertence a uma Band

```
lb relation
```

Responda as próximas perguntas com as seguintes respostas:

```
? Selecione o modelo a partir do qual criar o relacionamento: Discography
? Tipo de relação: belongs to
? Escolha um modelo com o qual criar um relacionamento: Band
? Insira o nome da propriedade para a relação: band
? Opcionalmente, insira uma chave estrangeira customizada: bandId
? Permitir que a relação seja aninhada nas APIs de REST: Yes
? Impedir que a relação seja incluída: No
```

Apesar de muito simples o relacionamento entre ambos, a ideia aqui é mostrar a versatilidade do **loopback** para criar API's de forma rápida e intuitiva.

A imagem abaixo mostra os novos endpoints adicionados ao Swagger:

![swagger view](/images/posts/loopback_4.png)

## Adicionando uma carga de dados inicial

Para as coisa ficarem mais interessantes vamos criar alguns dados para podermos dar continuidade ao nosso tutorial.

Antes disso, vamos fazer duas pequenas alterações em nossos modelos.

6- Abra o arquivo `common/models/discography.json` e adicione a seguinte linha de código dentro da tag **properties**:

```json
    "id": {
      "type": "Number",
      "id": true,
      "description": "Discography ID"
    },
```

7- Abra o arquivo `common/models/band.json` e adicione a seguinte linha de código dentro da tag **properties**:

```json
    "id": {
      "type": "Number",
      "id": true,
      "description": "Band ID"
    },
```

> Note que esse não é um passo obrigatório, nos vamos utilizar um id pré-definido apenas para ilustrar os relacionamento entre os modelos. Em um ambiente real você pode utilizar os ids gerados pelo seu banco de dados ou outro critério seu.

8- Crie um novo arquivo chamado: `init.js` dentro da pasta `server/boot` e adicione o seguinte conteúdo:

```javascript
'use strict';

module.exports = (app) => {

  const mongoDS = app.dataSources.mongoDB;

  mongoDS.automigrate('Band', function(err) {
    if (err) return cb(err);

    var Band = app.models.Band;

    Band.replaceOrCreate([
      {
        "id": 1,
        "name": "Judas Priest",
        "description": "Heavy Metal band",
        "country": "England"
      },
      {
        "id": 2,
        "name": "Motorhead",
        "description": "Rock and Roll band",
        "country": "England"
      },
      {
        "id": 3,
        "name": "Slayer",
        "description": "Thrash Metal band",
        "country": "USA"
      },

    ], function cb(err, band) {
      if (err) console.log('ERROR', err);
      console.log('Created band:', band);
    });

  });

  mongoDS.automigrate('Discography', function(err) {
    if (err) return cb(err);

    var Discography = app.models.Discography;

    Discography.replaceOrCreate([
      {
        "id": 1,
        "title": "March or Die",
        "year": "1992",
        "tracks": 10,
        "bandId": 2
      },
      {
        "id": 2,
        "title": "Season in the Abyss",
        "year": "1991",
        "tracks": 10,
        "bandId": 3
      },
      {
        "id": 3,
        "title": "Painkiller",
        "year": "1991",
        "tracks": 10,
        "bandId": 1
      },
      {
        "id": 4,
        "title": "Screaming for Vegeance",
        "year": "1980",
        "tracks": 10,
        "bandId": 1
      },

    ], function cb(err, discography) {
      if (err) console.log('ERROR', err);
      console.log('Created discographys:', discography);
    });

  });
}
```

Toda vez que o servidor é iniciado (quando rodamos o comando `npm start` ou `node .` ) nos gravamos esses dados no MongoDB. Além disso podemos obscervar no Terminal o log abaixo:

```
Web server listening at: http://localhost:3000
Browse your REST API at http://localhost:3000/explorer
Created band: [ { id: 1,
    name: 'Judas Priest',
    description: 'Heavy Metal band',
    country: 'England' },
  { id: 2,
    name: 'Motorhead',
    description: 'Rock and Roll band',
    country: 'England' },
  { id: 3,
    name: 'Slayer',
    description: 'Thrash Metal band',
    country: 'USA' } ]
Created discographys: [ { id: 1,
    title: 'March or Die',
    year: '1992',
    tracks: 10,
    bandId: 2 },
  { id: 2,
    title: 'Seasons in the Abyss',
    year: '1991',
    tracks: 10,
    bandId: 3 },
  { id: 3, title: 'Painkiller', year: '1991', tracks: 10, bandId: 1 },
  { id: 4,
    title: 'Screaming for Vegeance',
    year: '1980',
    tracks: 10,
    bandId: 1 } ]
```

Agora nos já temos alguns dados para seguir em frente, você pode testar a aplicação executando o comando `node .` na raiz do projeto.

No próximo artigo veremos como utilizar os endpoints fornecidos pelo **loopback** e explorar a utilização de filtros.
