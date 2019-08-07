---
title: "Criando API Restful com Loopback 4"
# slug: "Criando API com Loopback4"
description: "Apresentando a nova versão do Loopback, agora ainda mais poderoso utilizando alguns conceitos muito bacana como repositórios e decorators, neste post vamos ver como criar uma aplicação completa com poucas linhas de código"
date: 2019-08-06 17:36:33
xrelated: Loopback
tags: [Back-end]
keys: [Loopback, VUEJS]
cover: "/images/posts/bg_master_head.jpeg"
fullscreen: false
---

Caso você ainda não tenha a nova CLI instalada, instale agora. Esse post é basicamente uma atualização [deste artigo](http://localhost:8080/articles/aplicacao-restful-vue-js-com-loopback-io-part-i) e também [deste arquivo](http://localhost:8080/articles/aplicacao-restful-vue-js-com-loopback-io-part-ii), onde ambos utilizavam a versão **3** do Loopback. Além disso, é uma jeito descomplicado de criar API, seguindo uma determinada ordem de passos que **não consta na documentação oficial**.

## Iniciando o projeto

Um detalhe importante nessa nova versão é a utilização de **@decorators**, nos vamos ver a frente como isso é utilizado. O ponto fraco é que para quem estava acostumado com a versão 3, nesta versão 4 vai ter que escrever um pouco mais de código para conseguir fazer as mesmas coisas. Mas por hora, vamos deixar isso de lado.

Abra seu Terminal e digite o seguinte comando:

```
lb4 app
```

Digite o nome: **example-loopback4**, e siga as instruções

```
? Project name: example-loopback4
? Project description: Sample Restful API with Loopback4
? Project root directory: example-loopback-4
? Application class name: ExampleLoopback4Application
? Select features to enable in the project (Press <space> to select, <a> to toggle all, <i> to invert selection)Enabl
e tslint, Enable prettier, Enable mocha, Enable loopbackBuild, Enable vscode, Enable docker, Enable repositories, Ena
ble services
```

Até aqui sem novidade, certo? Até porque isso esta na documentação oficial. Então daqui para frente vamos seguir criando tudo na mão.

## Criando os endpoints da aplicação

Se você seguir o exemplo da documentação na página principal do loopback, vai notar que o comando seguinte ao criar a aplicação, seria criar o seu controller, porém o exemplo trata de um controller simples, no nosso caso vamos criar um controller com a opção **REST Controller with CRUD functions**, entretanto para que isso seja possível, o CLI necessita que alguns outros arquivos existam em sua aplicação, que são eles:

```
src/repositories/*.repository.ts
src/models/*.model.ts
src/datasources/*.datasource.ts
```

## Passo 1: Criando o model
Então antes de gerar o controller, vamos criar o nosso model, o CLI nos ajuda com isso, abra seu Terminal e digite o código abaixo:

```
lb4 model
```

Utilize as seguintes informações:

```
? Model class name: Band
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? Yes
```

E as seguintes propriedades abaixo:

```
? Enter the property name: id
? Property type: number
? Is id the ID property? Yes
? Is it required?: No
? Default value [leave blank for none]:

? Enter the property name: name
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

? Enter the property name: description
? Property type: string
? Is it required?: No
? Default value [leave blank for none]:

? Enter the property name: Releases
? Property type: array
? Type of array items: string
? Is it required?: No
? Default value [leave blank for none]:

? Enter the property name: country
? Property type: string
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Band
Enter an empty property name when done
```

Ao final de todos esses comandos, vamos ter algo parecido com isso:

```js
import {Entity, model, property} from '@loopback/repository';

@model({settings: {"strict":false}})
export class Band extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  Releases?: string[];

  @property({
    type: 'string',
  })
  country?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Band>) {
    super(data);
  }
}
```

Agora vamos criar mais um model, ainda no Terminal, repita o comando anterior e adicione as seguintes informações:

```
? Model class name: Release
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? Yes

? Enter the property name: id
? Property type: number
? Is id the ID property? Yes
? Is it required?: No
? Default value [leave blank for none]:

? Enter the property name: title
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

? Enter the property name: year
? Property type: string
? Is it required?: No
? Default value [leave blank for none]:

? Enter the property name: tracks
? Property type: number
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Release
Enter an empty property name when done
```

Ao final de todos esses comandos, vamos ter algo parecido com isso:

```js
import {Entity, model, property} from '@loopback/repository';

@model({settings: {"strict":false}})
export class Release extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  year?: string;

  @property({
    type: 'number',
  })
  tracks?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Release>) {
    super(data);
  }
}

```

### Criando relacionamento entre os models
Agora, vamos a uma das principais diferença da versão 3 para esta 4, nos vamos criar o relacionamento entre os modelos utilizando um **decorator** chamado `@belongsTo()`.

No arquivo `src/models/release.model.ts` adicione estes dois trechos de código, o primeiro na sessão de imports:

```js
import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Band} from './band.model';
```

Note ai o `@belongsTo` e também o model Band.

Logo abaixo da propriedade tracks, adicione:

```js
  @belongsTo(() => Band)
  bandId: number;
```

vamos fazer o mesmo para o arquivo: `src/models/band.model.ts`.

```js
import {Release} from './release.model';
```

E na propriedade release, utilize o seguinte código:

```js
  @property({
    type: 'array',
    itemType: 'string',
  })
  @hasMany(() => Release)
  releases: Release[];
```


Agora nossos modelos estão prontos, apesar de diferente, ainda continua fácil adicionar os relacionamentos, não?

Então até agora nos temos apenas os models criados e configurados com seu relacionamento. Ou seja nos temos uma lista de bandas(Band model) e seus lançamentos(Release model).

## Passo 2: Adicionando um datasource

Vamos adicionar um datasource, que continua simples como na versão anterior. No seu Terminal digite o seguinte comando:

```
lb4 datasource
```

Utilize as seguintes opções:

```
? Datasource name: memoryDB
? Select the connector for memoryDB: In-memory db (supported by StrongLoop)
? window.localStorage key to use for persistence (browser only): n
? Full path to file for persistence (server only): ./data/db.json
```

No campo nome, você pode utilizar o que preferir, eu coloquei memoryDB, apenas por uma questão de gosto.

Ao final desse comando, nos teremos o seguinte output:

```
create src/datasources/memory-db.datasource.json
   create src/datasources/memory-db.datasource.ts
   update src/datasources/index.ts

Datasource memoryDB was created in src/datasources/
```

Estamos quase lá, mas como você deve ter notado, nosso último comando menciona `./data/db.json`, então vamos criar isso agora.

Na raiz da app, crie uma pasta chamada **data** e dentro dela um arquivo chamado **db.json** com o seguinte código:

```json
{
  "ids": {
    "Band": 4,
    "Release": 7
  },
  "models": {
    "Band": {
      "1": "{\"name\":\"Venom\",\"description\":\"Black Metal band\",\"country\":\"England\",\"id\":1}",
      "2": "{\"name\":\"iron Maiden\",\"description\":\"NWBOH band\",\"country\":\"England\",\"id\":2}",
      "3": "{\"name\":\"Slayer\",\"description\":\"Best Thrash metal band\",\"country\":\"USA\",\"id\":3}"
    },
    "Release": {
      "1": "{\"title\":\"Welcome to Hell\",\"year\":\"1980\",\"tracks\":10,\"bandId\":1,\"id\":1}",
      "2": "{\"title\":\"Black Metal\",\"year\":\"1981\",\"tracks\":10,\"bandId\":1,\"id\":2}",
      "3": "{\"title\":\"Piece of Mind\",\"year\":\"1983\",\"tracks\":10,\"bandId\":2,\"id\":3}",
      "4": "{\"title\":\"Power Slave\",\"year\":\"1985\",\"tracks\":10,\"bandId\":2,\"id\":4}",
      "5": "{\"title\":\"Seventh son of a seventh son\",\"year\":\"1988\",\"tracks\":10,\"bandId\":2,\"id\":5}",
      "6": "{\"title\":\"Reign in Blood\",\"year\":\"1996\",\"tracks\":10,\"bandId\":3,\"id\":6}"
    }
  }
}
```

Esse arquivo já contem alguns relacionamentos que eu havia criado para um workshop, então vamos utiliza-lo aqui também.

## Passo 3: Adicionando repositórios

Antes de seguirmos em frente, vamos dar uma recapitulada em tudo que fizemos até agora;

1. Criamos a aplicação utilizando o comando básico do loopback.
2. Adicionamos o model Band e o model Release.
3. Configuramos o relacionamento entre eles utilizando o **decorators**.
4. Criamos nosso datasource e adicionamos algum conteúdo.

Você pode estar se perguntando, porque estamos seguindo essa sequência de passos? E eu lhe digo: *esta é a melhor maneira de criar aplicações seguindo um padrão Restful, utilizando a versão 4 do loopback, porque a documentação atual, não é lá essas coisas*.

Então agora, vamos criar nosso repositório, no seu Terminal, digite o seguinte comando:

```
lb4 repository
```

Agora nesse passo, fica um pouco mais claro do porque, seguimos essa ordem ao criar os arquivos, como você vai anotar a seguir o comando **repository** descobre os models e o datasource da aplicação. Como podemos ver no output do Terminal abaixo:

```
? Please select the datasource MemoryDbDatasource
? Select the model(s) you want to generate a repository Band, Release
? Please select the repository base class DefaultCrudRepository (Legacy juggler bridge)
   create src/repositories/band.repository.ts
   create src/repositories/release.repository.ts
   update src/repositories/index.ts
   update src/repositories/index.ts

Repositories BandRepository,ReleaseRepository was created in src/repositories/
```

## Passo 4: Criando Controllers

Agora vamos criar os **controllers** da aplicação, na versão 4 eles são responsáveis pelas rotas e métodos HTTP que vamos utilizar.

No Terminal digite o seguinte comando:

```
lb4 controller
```

Utilize as seguintes informações:

```
? Controller class name: Band
? What kind of controller would you like to generate? REST Controller with CRUD functions
? What is the name of the model to use with this CRUD repository? Band
? What is the name of your CRUD repository? BandRepository
? What is the type of your ID? number
? What is the base HTTP path name of the CRUD operations? /bands
   create src/controllers/band.controller.ts
   update src/controllers/index.ts

Controller Band was created in src/controllers/
```

>Note que o próprio comando **controller** identifica os modelos e repositórios, e se você tentar utilizar a opção: **REST Controller with CRUD functions** e não tiver esses arquivos criados, vai dar erro.

Agora se você rodar o comando: `npm start` e navegar até: http://localhost:3000/explorer/#/BandController

Vai ver o seguinte resultado, totalmente funcional:

![Loopback Explores](/images/posts/loopback4_1.png)

Hora de criarmos mais um controller, desta vez para Release, utilize o mesmo comando do passo anterior e as seguintes informações:

```
? Controller class name: Release
? What kind of controller would you like to generate? REST Controller with CRUD functions
? What is the name of the model to use with this CRUD repository? Release
? What is the name of your CRUD repository? ReleaseRepository
? What is the type of your ID? number
? What is the base HTTP path name of the CRUD operations? /releases
   create src/controllers/release.controller.ts
   update src/controllers/index.ts

Controller Release was created in src/controllers/
```

Ótimo, se executar o `npm start` novamente, vai ter mais um endpoint criado no **loopback-explorer**, incluindo os dois schemas de nossos models, conforme a imagem abaixo:

![Loopback Explores](/images/posts/loopback4_2.png)

Feito isso, vamos precisar de um controller intermediário, para interpretar nosso relacionamento entre os modelos **Band** e **Releases**, afinal de contas queremos um endpoint para lista um banda com todos os seus lançamentos, não é?

Pois bem, vamos aos comandos:

```
? Controller class name: BandReleases
? What kind of controller would you like to generate? Empty Controller
   create src/controllers/band-releases.controller.ts
   update src/controllers/index.ts

Controller BandReleases was created in src/controllers/
```

Note que criamos um **controller** vazio, então vamos adicionar o conteúdo abaixo, abra o arquivo: `src/controllers/band-releases.controller.ts` e adicione o código:

```js
import {post, get, param, requestBody} from '@loopback/rest';
import {BandRepository} from '../repositories/';
import {Band, Release} from '../models/';
import {repository, Filter} from '@loopback/repository';

export class BandReleasesController {
  constructor(
    @repository(BandRepository)
    protected bandRepository: BandRepository,
  ) {}

  @post('/bands/{id}/releases')
  async createRelease(
    @param.path.number('id') bandId: typeof Band.prototype.id,
    @requestBody() releaseData: Release,
  ): Promise<Release> {
    return await this.bandRepository.releases(bandId).create(releaseData);
  }

  @get('/bands/{id}/releases')
  async findReleases(
    @param.path.number('id') bandId: typeof Band.prototype.id,
    @param.query.string('filter') filter?: Filter,
  ): Promise<Release[]> {
    const releases = await this.bandRepository
      .releases(bandId)
      .find(filter, {strictObjectIDCoercion: true});
    return releases;
  }
}
```

>Note, se você estiver utilizando o **vscode** vai receber um aviso de que a propriedade releases não existe `BandRepository`, não se assuste, vamos chegar nessa parte.

Aqui vemos mais uma vez o poder dos **decorators** eles estão por toda parte no loopback4.

## Ajustando os repositórios

Agora vamos fazer os ajuste necessários nos repositórios, mãos a obra.

Abra o arquivo: `src/repositories/band.repository.ts` e substitua o código, pelo seguinte:

```js
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Band, Release} from '../models';
import {ReleaseRepository} from './release.repository';
import {MemoryDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class BandRepository extends DefaultCrudRepository<
  Band,
  typeof Band.prototype.id
> {
  public readonly releases: HasManyRepositoryFactory<
    Release,
    typeof Band.prototype.id
  >;

  constructor(
    @inject('datasources.memoryDB') dataSource: MemoryDbDataSource,
    @repository.getter('ReleaseRepository')
    getReleaseRepository: Getter<ReleaseRepository>,
  ) {
    super(Band, dataSource);
    this.releases = this.createHasManyRepositoryFactoryFor(
      'releases',
      getReleaseRepository,
    );
  }
}

```

Faço o mesmo para o arquivo: `src/repositories/release.repository.ts`:

```js
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {Release, Band} from '../models';
import {BandRepository} from '../repositories';
import {MemoryDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class ReleaseRepository extends DefaultCrudRepository<
  Release,
  typeof Release.prototype.id
> {
  public readonly band: BelongsToAccessor<Band, typeof Release.prototype.id>;

  constructor(
    @inject('datasources.memoryDB') dataSource: MemoryDbDataSource,
    @repository.getter('BandRepository')
    bandRepositoryGetter: Getter<BandRepository>,
  ) {
    super(Release, dataSource);
    this.band = this.createBelongsToAccessorFor('band', bandRepositoryGetter);
  }
}
```

## Testando os endpoints

Ao final da etapa anterior, nos completamos a tarefa de criar uma API Restful com relacionamento entre modelos, utilizando um datasource. O mesmo que criamos [nesse post](https://barbadev.netlify.com/articles/aplicacao-restful-vue-js-com-loopback-io-part-i/), e [nesse](https://barbadev.netlify.com/articles/aplicacao-restful-vue-js-com-loopback-io-part-ii/), utilizando a versão loopback 3:

Agora na raiz da aplicação, digite o comando: `npm start`.
Abra o navegador em: [http://localhost:3000/explorer/#/](http://localhost:3000/explorer/#/) e pronto, vamos ter a seguinte imagem:

![Loopback Explores](/images/posts/loopback4_3.png)

Agora temos o endpoint para consultar os lançamentos de uma determinada banda com seu ID, no caso: `http://localhost:3000/bands/2/releases` onde nosso resultado, será os lançamentos do Iron Maiden, conforme abaixo:

```json
[
  {
    "id": 3,
    "title": "Piece of Mind",
    "year": "1983",
    "tracks": 10,
    "bandId": 2
  },
  {
    "id": 4,
    "title": "Power Slave",
    "year": "1985",
    "tracks": 10,
    "bandId": 2
  },
  {
    "id": 5,
    "title": "Seventh son of a seventh son",
    "year": "1988",
    "tracks": 10,
    "bandId": 2
  }
]
```

Então é isso, agora você tem um guia simples, mas um pouco mais pratico para seguir.
