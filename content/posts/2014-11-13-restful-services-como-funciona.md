---
title: Restful Service, porque voce faz errado?
description: "Entendendo como funciona o Restful de verdade."
tags: [Back-end]
date: 2014-11-13
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: false
---

É muito comum hoje em dia desenvolvedores **front-end** serem questionados sobre como consumir API's utilizando Restful, porém muitos não sabem os fundamentos por trás desta **arquitetura**, e muitas vezes aquilo que voce imagina ser um Restful, não passa de um retorno em Json ou XML.
Saiba que Restful é muito mais do que isso e voce deve começar a utiliza-lo da maneira correta.

# Restful e as restrições.

O padrão Restful implica 6 restrições a sua arquitetura, e por sua vez define os padrões de utilização de uma API restful. São elas:

• Uniform Interface
• Stateless
• Cacheable
• Client-Server
• Layered System
• Code on Demand

Cada um desses pilares deve ser respeitado e utilizado, apenas o último é opcional, e é nele que voce desenvolvedor **front-end** trabalha! Isso mesmo pois esta é a camada do cliente e geralmente manipulada através do uso de JavaScript e as famosas bibliotecas MVC como **Angularjs**, **Emberjs** entre outras.

Não sabia? estude mais um pouco, mas não se preocupe, muitos dev back-end também não sabem disso.

Não vou detalhar uma a uma, mas todas elas são:

- Uniform Interface define a interface base acesso entre o cliente e o servidor, que por sua vez possui 4 princípios extremamente importantes:

    - Baseado em recursos (Resource Based) ou seja URI de acesso.
    - Manipulação de recursos utilizando representações (Manipulation of Resources Through Representations) ou seja manipular dados utilizando os verbos HTTP.
    - Mensagens auto descritivas (Self-descriptive Messages) ou seja cada mensagem inclui informações suficientes para descrever como processar a mensagem.
    - Hypermedia as the Engine of Application State (HATEOAS) este é um dos secredos, **cliente** envia informações via: body content, query-string parameters, request headers e caminho do recurso (URI), o **servidor** por sua vez envia as informações via: body content, response codes, and response headers.

_HATEOS também significa que, se necessário, o retorno pode conter links no cabeçalhos (headers) para fornecer a URI uma maneira de recuperar o objeto em si ou objetos relacionados._

    HTTP/1.1 201 CREATED
    Status: 201
    Connection: close
    Content-Type: application/json; charset=utf-8
    Location: http://api.newaeonweb.com.br/posts/32

Neste exemplo, podemos ver claramente o link para o objeto recém criado por uma operação POST na URI http://api.newaeonweb.com.br/posts. Onde facilmente podemos acessar o post pelo seu ID.
Mais adiante veremos algumas recomendações para utilizar nomes em URI's.

- Stateless define que a ação desejada(Metodo HTTP ou Verbo) esta dentro do próprio pedido, seja como parte da URI, parâmetros query-string, corpo(Content Body) ou cabeçalhos(Heders). Como é muito comum vermos em aplicações Restful utilizando **Node.js** e **Express Framework**:

    POST-http://api.newaeonweb.com.br/posts (Insere um post no blog).
    GET-http://api.newaeonweb.com.br/posts (Recupera todos os posts do blog).
    PUT-http://api.newaeonweb.com.br/posts/32 (Atualiza o post com ID 32).
    DELETE-http://api.newaeonweb.com.br/posts/32 (Deleta o post com ID 32).

Embora para quem já esta acostumado com Restful a simplicidade do uso de URI é declarado, ainda vemos API's desta maneira:

    http://api.newaeonweb.com.br/posts?operation=update_post&id=32&format=json

    ou

    http://api.newaeonweb.com.br/update_post/32

O segundo exemplo, não é muito bonito e pouco descritivo, uma vez que voce deverá adivinhar qual a URI para inserir e deletar o post, desta maneira deixando a **Uniform Interface** de lado. E deixando de ser Restful.

# Empacotando Respostas (Wrapped Responses).

O servidor têm a oportunidade de retornar os códigos de status HTTP juntamente com um corpo(Content body) na resposta. Apesar de não muito evidentes na utilização de frameworks MVC JavaScript onde os devs não se preocupam em mostrar a mensagem de retorno, e existem muitas mensagens, mais conhecidos como StatusCode.

Na prática, deveríamos empacotar todas (não confundir empacotar com JSONP) as respostas regulares com as seguintes propriedades:

• Código - contém o código de status de resposta HTTP como um inteiro.
• Estado - contém o texto: "sucesso", "falha" ou "erro". Onde "falha" é para valores de resposta de status HTTP 500-599, o "erro" é para status 400-499, e "sucesso" é para tudo o resto (por exemplo 1XX, 2xx e 3xx respostas).
• Mensagem - usado apenas para "falha" e status "erro" para conter a mensagem de erro. Para internacionalização (i18n), este pode conter um número ou código de mensagem, quer isoladamente ou contidos por delimitadores.
• Dados - que contém o corpo da resposta. No caso de "erro" ou "falha", este contém a causa, ou o nome de exceção que ocorreu no momento da requisição.

Uma resposta de sucesso é um retorno como este mostrado abaixo:

    {"code":200,"status":"success","data": {"lacksTOS":false,"invalidCredentials":false,"authToken":"4ee683baa2a3332c3c86026d"}}

E um retorno em que ocorreu algum imprevisto, pode ser desta forma:

    {"code":401,"status":"error","message":"token is invalid","data":"UnauthorizedException"}

Note que aqui a API retornou que o token enviado na requisição não é válido.

# Requisiçöes de outros domínios (Ativando CORS).

Muito comum na utilização de API Restful é que as requisições são disparadas de diferentes domínios, afinal de contas esta é o maior trunfo na opção de utilizar uma arquitetura Restful para sua API, porque o próprio nome API já diz tudo.

Então é muito importante que o servidor esteja preparado para responder as solicitações de diferentes domínios. No caso de uma API particular, é possível configurar apenas um domínio especifico para responder, exemplo: Uma aplicação roda no servidor A e somente receberá requisições do servidor B.

    Access-Control-Allow-Origin: http://exemplo.com:8080 http://forum.exemplo.com
    Access-Control-Allow-Credentials: true

Mas lembre-se, apenas as URLs que acessadas de diferentes domínios precisam ter o CORS habilitado. Este ponto não leva em conta a configuração do servidor, exponho aqui apenas a arquitetura Restful da API, cada servidor tem a sua maneira de ser configurado.
Para isso viste este [link](http://enable-cors.org/).

Outro detalhe importante é que sua API deve estar preparada para receber solicitações com JSONP. É interessante notar que quando utilizamos JSONP para as requisições o servidor interpreta o conteúdo da mensagem como parâmetros query-string e não como conteúdo do corpo(content body) da requisição. E para suportar os protocolos HTTP: PUT, POST, DELETE, GET é preciso enviar o método no início da query-string.

Para suportar JSONP no lado do servidor, quando o parâmetro query-string JSONP é passado, a resposta deve ser manipulada:

*1. O corpo da resposta deve ser acondicionada como parâmetro para a função, no parâmetro jsonp (por exemplo jsonp_callback ("<body resposta JSON>")).
*2. Sempre retornar status HTTP 200 (OK) e retornar o status real como parte da resposta JSON.

Além disso, também é frequentemente necessário incluir cabeçalhos como parte do corpo da resposta. Isso permite que ao método de retorno de chamada JSONP, tomar decisões sobre a manipulação de resposta com base no corpo da requisição.

# Conclusão.

É extremamente importante entender o conceito da arquitetura Restful para evitar perda de tempo na construção da API, facilitando assim a vida do seu amigo front-end que pode estar do outro lado do mundo tentando consumir a sua API. Além disso APIs que sofrem alterações constantes e mudam de versão a todo momento dificultam ainda mais a comunicação, mas isso é tema para outro post.

Até.
