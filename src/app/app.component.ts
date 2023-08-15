import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'minhas-financas1';

  menu : any [] =[
    {descricao:'Dashbaord', rota: 'dashboard'},
    {descricao:'Categorias', rota: 'categorias'},
    {descricao:'Entradas', rota: 'entradas'}
  ];

}
