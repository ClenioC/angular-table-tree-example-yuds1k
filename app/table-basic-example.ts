import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

interface FoodNode {
  name: string;
  count?: number;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple', count: 10 },
      { name: 'Banana', count: 20 },
      { name: 'Fruit loops', count: 30 },
    ],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli', count: 10 },
          { name: 'Brussel sprouts', count: 20 },
        ],
      },
      {
        name: 'Orange',
        children: [
          { name: 'Pumpkins', count: 30 },
          { name: 'Carrots', count: 40 },
        ],
      },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  count: number;
  level: number;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
})
export class TableBasicExample {
  // Define as colunas que serão exibidas na tabela
  displayedColumns: string[] = ['name', 'count'];

  // Função que transforma um nó da árvore em um objeto com as propriedades que serão exibidas na tabela
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0, // Verifica se o nó possui filhos para serem expandidos
      name: node.name, // Nome do nó
      count: node.count, // Contagem do nó
      level: level, // Nível do nó
    };
  };

  // Define o controle da árvore, que será responsável por expandir e recolher os nós
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level, // Função que retorna o nível do nó
    (node) => node.expandable // Função que verifica se o nó é expansível
  );

  // Define o "achatador" da árvore, que transforma a árvore em um array linear de nós
  treeFlattener = new MatTreeFlattener(
    this.transformer, // Função transformadora definida acima
    (node) => node.level, // Função que retorna o nível do nó
    (node) => node.expandable, // Função que verifica se o nó é expansível
    (node) => node.children // Função que retorna os filhos do nó
  );

  // Define a fonte de dados da tabela, que é um objeto MatTreeFlatDataSource que recebe o controle e o "achatador" da árvore
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // Define o construtor do componente, que atribui os dados da árvore à fonte de dados da tabela
  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  // Função que verifica se o nó tem filhos e é, portanto, expansível
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
