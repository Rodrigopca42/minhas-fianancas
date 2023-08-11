import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from '../../service/categoria.service';

export interface Categoria {
  nome: string;
  descricao: string;
  id: number;
}



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['nome', 'descricao'];
  dataSource = new MatTableDataSource<Categoria>();
  categorias: Categoria[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private categoriaService: CategoriaService){

  }
  ngOnInit(): void {
    this.categoriaService.getCategorias()
    .subscribe((categorias: Categoria[])=>{
      this.categorias = categorias;
      this.dataSource.data = this.categorias;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
