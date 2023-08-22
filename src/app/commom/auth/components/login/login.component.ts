import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  authLogin!: Login


  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: Router
    ){

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    })
  }

  login(){
    this.authLogin = Object.assign('', this.authLogin, this.loginForm.value);
    this.authLogin.email = this.authLogin.email.toLowerCase();

    console.log(this.authLogin)

    this.authenticationService.login({email: this.authLogin.email, senha: this.authLogin.senha})
    .subscribe((user) => {
      if(user?.id){
        this.route.navigateByUrl('dashboard')
      }
    },error =>{
      this._snackBar.open('Ocorreu um erro no Login!');
    });
  }


  sair(){
    this.authenticationService.sair();
    this.route.navigate(['auth','login']);
  }


  //Guardas de Rotas

  //CanActivate

  //CanDeactivate

  //interceptors -> user -> token
}
