import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Entradas } from '../../models/entradas.models';
import { EntradasService } from '../../service/entradas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  displayedColumns: string[] = ['nome', 'pago', 'data', 'valor', 'tipo', 'editar', 'excluir'];
  dataSource = new MatTableDataSource<Entradas>();
  entradas: Entradas[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private entradasService: EntradasService,
    private router: Router
    ){

  }
  ngOnInit(): void {
    this.buscarEntradas();

  }

  buscarEntradas(){
    this.entradasService.getEntradas()
    .subscribe((entradas: Entradas[]) =>{
      this.entradas = entradas;
      this.dataSource.data = this.entradas;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  chamarEdicao(entrada: Entradas){
    this.router.navigate(['entradas', 'editar', entrada.id]);
  }

  excluir(id:number){
    this.entradasService.excluirEntradas(id)
    .subscribe(resposta =>{
      this.buscarEntradas();
    })
  }

  novaEntrada(){
    this.router.navigate(['entradas', 'novo'])
  }


}


