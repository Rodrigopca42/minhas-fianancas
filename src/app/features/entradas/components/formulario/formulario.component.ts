import { Component, OnInit } from '@angular/core';
import { Entradas } from '../../models/entradas.models';
import { EntradasService } from '../../service/entradas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/features/categorias/service/categoria.service';
import { Categoria } from 'src/app/features/categorias/models/categoria.models';
import * as dayjs from 'dayjs'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{


  tiposDeEntrada = [
    'receita',
    'despesa'
  ]

  statusDePagamento = [
    {value: true, descricao: 'Pago'},
    {value: false, descricao: 'Pendente'}
  ]

  categorias: Categoria[] = [];
  entrada!: Entradas;
  id: string = '';
  formEntrada!: FormGroup;
  rota: string = '';
  estacriando: boolean = false;

  categorias$ =this.categoriaService.getCategorias();

  constructor(
    private readonly categoriaService: CategoriaService,
    private entradaService: EntradasService,
    private formBuilder: FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute
    ){ }


  ngOnInit(): void {
    this.criarFormulario();

    this.rota = this.activatedRoute.snapshot.url[0].path;
    if(this.rota === 'editar'){
      this.id = this.activatedRoute.snapshot.url[1].path;
      this.buscarEntradasPorId()
    }else{
      this.estacriando = true;
    }

  }

  buscarEntradasPorId(){
    this.entradaService.getEntradaPorId(+this.id)
    .subscribe((entrada: Entradas)=>{
      this.entrada = entrada

      const data = this.entrada.data.split('/');

      this.formEntrada.controls['nome'].setValue(this.entrada.nome);
      this.formEntrada.controls['valor'].setValue(this.entrada.valor);
      this.formEntrada.controls['categoriaId'].setValue(this.entrada.categoriaId);
      this.formEntrada.controls['pago'].setValue(this.entrada.pago);
      this.formEntrada.controls['tipo'].setValue(this.entrada.tipo);
      this.formEntrada.controls['data'].setValue(new Date(+data[2], +data[1], +data[0] ));
    });

  }


  criarFormulario(){
    this.formEntrada = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        valor: ['', Validators.required],
        categoriaId: ['', Validators.required],
        pago: [true, Validators.required],
        tipo: ['Despesa', Validators.required],
        data: [new Date(), Validators.required],
      }
    )
  }

  salvarEntrada(){

    console.log(this.formEntrada.controls['data'].value);

    const data = dayjs(this.formEntrada.controls['data'].value).format('DD/MM/YYYY');

    const payloadRequest: Entradas = Object.assign('', this.formEntrada.getRawValue());

    payloadRequest.data = data;

    const payload: Entradas = {
      id: payloadRequest.id,
      nome: payloadRequest.nome,
      categoriaId: payloadRequest.categoriaId,
      data: payloadRequest.data,
      pago: payloadRequest.pago,
      tipo: payloadRequest.tipo,
      valor: payloadRequest.valor,

    }
    if(this.estacriando){
      this.criarNovaEntrada(payload);
    }else{
      payload.id = this.entrada.id;
      this.editarEntrada(payload);
    }

  }

  criarNovaEntrada(payload: Entradas){
    this.entradaService.criarEntrada(payload)
    .subscribe(resposta =>{
      console.log('ok');
      this.router.navigate(['entradas']);
    })

  }

  editarEntrada(payload: Entradas){
    this.entradaService.editarEntrada(payload)
    .subscribe(resposta =>{
      console.log('ok');
      this.router.navigate(['entradas']);
      })
  }


}
