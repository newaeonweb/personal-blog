---
title: "Angular Material Mat-table dynamic columns"
slug:
description: "Dando continuidade ao post anterior sobre Angular material, mais especificamente o componente MatTable, aqui segue um exemplo de como carregar a sua tabela dinamicamente com dados do servidor."
date: 2021-10-15 09:20:00
xrelated: Angular
tags: [Front-end]
keys: [Angular, Angular-Cli, Angular12, AngularMaterial]
cover: "https://placeimg.com/1220/900/tech"
fullscreen: true
---

Dando continuidade ao post anterior sobre Angular Material, mais especificamente o componente `MatTable`, aqui segue um exemplo de como carregar a sua tabela dinamicamente com dados do servidor utilizando o CDK do Angular.

Se voce ainda não conhece o **Angular CDK(Component Dev Kit)**, é uma poderosa ferramenta para criar components sem a necessidade do Material Theme, ou seja podemos ter toda a funcionalidade do componente do Material, mas sem utilizar o Material Style, ou ainda podemos combinar os dois modos e ter um componente ainda mais customizável.

# Angular Material Mat-table dynamic columns

Então vamos lá, primeiramente voce deve ter instalado em seu projeto o `@angular/cdk`. [Nesse post](https://barbadev.netlify.app/articles/angular-material-mat-table-server-side-pagination/), tem um exemplo da estrutura basica de uma tabela utilizando o `mat-table`, então partindo dai, vamos ver as diferenças entre elas.

## Criando o template HTML:

No exemplo abaixo, podemos notar que temos apenas um único `ng-container` utilizando um loop para mostrar o título das colunas, `*ngFor="let column of columns, let i=index" [cdkColumnDef]="column.columnDef"` note que já estamos utilizando aqui o CDK com a directive: `[cdkColumnDef]`.

```html
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  <ng-container *ngFor="let column of columns, let i=index" [cdkColumnDef]="column.columnDef">
    <mat-header-cell *cdkHeaderCellDef mat-sort-header>{{ column.header }}</mat-header-cell>
    <mat-cell *cdkCellDef="let row">
        <span *ngIf="column.header === 'Id'; else normalCol" [class.truncate-text]="column.header === 'Id'"
            [innerHTML]="column.cell(row) | highlight: dataSource.filter" [matTooltip]="column.cell(row)">
        </span>
        <ng-template #normalCol>
            <span [innerHTML]="column.cell(row) | highlight: dataSource.filter">
            </span>
        </ng-template>
    </mat-cell>
  </ng-container>
  <mat-header-row *matHeaderRowDef="displayedColumnsDynamic"></mat-header-row>
  <mat-row *matRowDef="let row; columns: displayedColumnsDynamic;"></mat-row>
</table>
```

Muito simples né, mas agora imagina uma tabela com muitas colunas, nesse caso teriamos que criar um `ng-container` para cada coluna, conforme o código abaixo.

```html
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef> No. </th>
    <td mat-cell *matCellDef="let element"> {{element.position}} </td>
  </ng-container>
```



## Criando as colunas no componente

Agora a configuração das colunas no componente:

```ts
    columns = [
    { columnDef: 'id', header: 'Id', cell: (element: string | number) => `${element._id}` },
    {
      columnDef: 'Title',
      header: 'Name',
      cell: (element: string) => `${this.uppercase.transform(element.name)}`
    },
    {
      columnDef: 'action',
      header: 'Action',
      cell: (element: string) =>
        `<button mat-raised-button color="primary">View Chapters</button>`
    }
  ];

  displayedColumnsDynamic = this.columns.map(c => c.columnDef);
```

Pode não parecer muita vantagem, porque ainda precisamos configurar as colunas no componente, mas acredite o código do template fica muito mais limpo, e desta maneira podemos criar um componente tabelas, passando apenas as colunas e os dados para serem renderizados.


Aqui segue o código de exemplo completo no [Stackblitz](https://stackblitz.com/edit/angular-mat-table-dynamic-complete?file=src/app/table-pagination-example.html)

<iframe src="https://stackblitz.com/edit/angular-mat-table-dynamic-complete?embed=1&file=src/app/table-pagination-example.html&hideExplorer=1&hideNavigation=1&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Mais alguns exemplos úteis com Angular Material

1. [Mat-tab com navegação e carregamento de dados do servidor.](https://stackblitz.com/edit/angular-material-tabs-with-serverside-data)
2. [Mat-table utilizando adapter e removendo linhas da tabela](https://stackblitz.com/edit/angular-mat-table-remove-row-and-adapters)
