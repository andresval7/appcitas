import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Auth } from 'src/app/models/auth.model';
import { AuthResponse } from 'src/app/models/authResponse.model';
import { ApiService } from '../../services/api/api.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    celular : new FormControl('', {validators: [Validators.required, Validators.minLength(9)],nonNullable: true}),
    password : new FormControl('', {validators: Validators.required,nonNullable: true})
  });

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(form:any){
    const auth:Auth = {
      celular: form.celular,
      password: form.password
    };
    //console.log(auth);

    this.api.loginByCelular(auth).subscribe(data =>{
      if(data){

        this.router.navigate(['services']);
      }
      //console.log(data);
      let dataResponse: AuthResponse|void = data;
      //console.log(dataResponse.result.token);

    });

  }


}
