---
title: "Angular Material Mat-table server side pagination"
slug:
description: "Um problema muito comum que encontramos ao utilizar Angular Material é que as docs, por muitas vezes não são muito claras para determinadas situações, e isso impede de utilizarmos todo potencial de alguns componentes, como é o caso do Mat-table."
date: 2021-10-05 10:19:04
xrelated: Angular
tags: [Front-end]
keys: [Angular, Angular-Cli, Angular12, AngularMaterial]
cover: "https://placeimg.com/1220/900/tech"
fullscreen: true
---

Um problema muito comum que encontramos ao utilizar Angular Material é que a documentação por muitas vezes não são muito claras para determinadas componentes, e isso impede de utilizarmos todo potencial de alguns componentes, como é o caso do Mat-table que pode ser utilizado sem um template de tabela, por exemplo.

Nesse artigo, vou demonstrar como podemos utilizar paginação server-side, com `MatTableDataSource`, um campo de busca utilizando RXJS, um filtro e também como passar dados para o componente de modal com MatDialog(essa parte vou deixar um link para o código de exemplo no final, já que a documentação é bem exploratória nessa parte).

Apesar do exemplo não utilizar a estrutura de tabela conforme a implementação mais utilizada com `td`, `tr` e etc..., como no exemplo abaixo:

```
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  <!-- Template de colunas -->
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef> No. </th>
    <td mat-cell *matCellDef="let element"> {{element.position}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
```

Ainda assim conseguimos manter todas as funcionalidades oferecidas pelo `MatTableDataSource`como ordenação, paginação, filtros etc. Já que no exemplo que vamos utilizar aqui, utilizamos um simple `*ngFor` para exibir as informações utilizando `mat-card`.

A seguir vamos ver como fica essa implementação.

## Criando um DataSource

1. Iniciando as propriedade:

```
  characters$: Observable<Character[]>;
  characterDataSource: MatTableDataSource<Character>;
  characterDatabase = new HttpDatabase(this.httpClient);
```

2. Criando um serviço/classe para fazer o request na API. Nesse exemplo vamos utilizar o https://rickandmortyapi.com/ API.

```
export class HttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term) =>
        this.getCharacters(term).pipe(
          catchError(() => {
            // vc pode fazer o tratamento de erro aqui e enviar para um ErrorHandler
            return of({ info: null, results: null });
          })
        )
      )
    );
  }

  getCharacters(
    name: string = '',
    status: string = '',
    page: number = 0
  ): Observable<HttpRequest> {
    const apiUrl = 'https://rickandmortyapi.com/api/character';
    return this._httpClient.get<HttpRequest>(apiUrl, {
      params: new HttpParams()
        .set('name', name)
        .set('status', status)
        .set('page', (page + 1).toString()),
    });
  }
}

Voce deve estar imaginando; porque não utilizamos um Service aqui, certo?

Sim poderíamos utilizar, mas essa é uma das varias maneiras de estruturar sua app.
```

## Carregando os dados.

```
  loadData() {
    this.characterDatabase
      .search(this.searchTerm$)
      .subscribe((response: HttpRequest) => {
        if (!response.info || !response.results) {
          this.resultsEmpty$.next(true);
          return;
        }
        this.resultsEmpty$.next(false);
        this.resultsLength = response.info?.count;
        this.characterDataSource = new MatTableDataSource(
          response.results as Character[]
        );
        this.characterDataSource.paginator = this.paginator;
        this.characters$ = this.characterDataSource.connect();
      });
  }
```

> Note que aqui estamos utilizando o `subscribe()` diretamente na chamada do endpoint, mas poderíamos delegar isso para o template utilizando Pipe Async, como veremos mais adiante.

Essa é a linha: `this.characters$ = this.characterDataSource.connect();` é que faz a ponte do `dataSource` e nosso `Observable()` que vamos usar no template.

## Montando o template HTML

Aqui sim utilizamos o Pipe Async: `*ngFor="let char of characters$ | async"` para fazer a atualização dos dados:

```
  <div class="flex-container">
    <mat-card class="flex-item card mat-elevation-z2" *ngFor="let char of characters$ | async">
      <mat-card-header>
        <mat-card-title>{{char.name}}</mat-card-title>
        <mat-card-subtitle>{{char.species}} | <span [style.color]="setStatusColor(char.status)">{{char.status}}</span>
        </mat-card-subtitle>
      </mat-card-header>
      <img mat-card-image src="{{char.image}}" alt="{{char.name}}">
      <mat-card-content>
        <p><strong> Origin:</strong> {{char.origin.name}}</p>
        <p><strong>Last known location:</strong> {{char.location.name}} </p>
      </mat-card-content>
      <mat-card-actions>
        <a (click)="openDialog(char)" mat-stroked-button color="primary">Episodes</a>
      </mat-card-actions>
    </mat-card>
  </div>
  <mat-paginator [length]="resultsLength" [pageSize]="20" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons>
  </mat-paginator>
```

## Aplicando o filtro e reset na paginação

```
applyFilter() {
    const filterValue = this.status;
    this.characterDataSource.filter = filterValue.trim().toLowerCase();
    this.characterDataSource.paginator = this.paginator;
    if (this.characterDataSource.paginator) {
      this.characterDataSource.paginator.firstPage();
    }
  }
```

Como estamos utilizando a paginação vindo do backend, sempre que um novo filtro for aplicado, precisamos voltar a primeira pagina.

```
  <div class="flex-container">
    <mat-form-field>
      <mat-label>Filter</mat-label>
      <mat-select (selectionChange)="applyFilter()" [(ngModel)]="status">
        <mat-option [value]="''">Todos</mat-option>
        <mat-option *ngFor="let status of ['dead', 'alive', 'unknown']" [value]="status">
          {{status}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </div>
```

Pronto agora temos nossa paginação funcionando sem a utilização de uma tabela, e antes que voce se pergunte: não deveríamos utilizar um `unsubscribe()` na chamada do `this.characterDatabase.search()`?, a resposta é que não é necessário já que se trata de um Cold Observable.

Entretanto utilizamos o `this.characterDataSource.disconnect();` quando o componente é desmontado.

Aqui segue o código de exemplo completo no [Stackblitz](https://stackblitz.com/edit/angular-material-serverside-pagination-and-rxjs-search?embed=1&file=src/app/app.component.ts)

<iframe src="https://stackblitz.com/edit/angular-material-serverside-pagination-and-rxjs-search?embed=1&file=src/app/app.component.ts" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Mais alguns exemplos úteis com Angular Material

### Mat-tabs com http request utilizando iTunes Api

<iframe src="https://stackblitz.com/edit/angular-material-tabs-with-serverside-data?embed=1&file=src/app/app.component.ts" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Mat-table utilizando adapter e removendo linhas da tabela

<iframe src="https://stackblitz.com/edit/angular-mat-table-remove-row-and-adapters?embed=1&file=src/app/user.service.ts" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
