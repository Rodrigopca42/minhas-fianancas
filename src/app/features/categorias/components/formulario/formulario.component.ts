import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../models/categoria.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{

  categoria!: Categoria;
  id: string = '';
  formCategoria!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
    ){ }


  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.url[1].path;
    this.criarFormulario();
    this.categoriaService.getCategoriasPeloId(parseInt(this.id))
    .subscribe((categoria: Categoria) => {
      this.categoria = categoria;
      this.formCategoria.controls['nome'].setValue(categoria.nome);
      this.formCategoria.controls['descricao'].setValue(categoria.descricao);
    })
  }

  criarFormulario(){
    this.formCategoria = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        descricao: ['', Validators.required]
      }
    )
  }

  atualizarCategoria(){

    if(this.formCategoria.touched && this.formCategoria.dirty){
      const payload = {
        id: this.categoria.id,
        nome: this.formCategoria.controls['nome'].value,
        descricao: this.formCategoria.controls['descricao'].value,
      }


      this.categoriaService.alterarCategoria(payload)
      .subscribe(reposta => {
        //retornar a tela anterior

        this.router.navigate(['categorias']);

      })
    }

  }

}
