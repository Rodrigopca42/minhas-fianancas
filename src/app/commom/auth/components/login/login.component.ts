import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  constructor(
    private authenticationService: AuthenticationService,
    private route: Router
    ){

  }

  ngOnInit(): void {

  }

  login(){

  }


  logout(){

  }


  //Guardas de Rotas

  //CanActivate

  //CanDeactivate

  //interceptors -> user -> token
}
