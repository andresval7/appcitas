import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Auth } from 'src/app/models/auth.model';
import { AuthResponse } from 'src/app/models/authResponse.model';
import { ApiService } from '../../services/api/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    celular : new FormControl('', {validators: Validators.required,nonNullable: true}),
    password : new FormControl('', {validators: Validators.required,nonNullable: true})
  });

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

  onLogin(form:any){
    // console.log(form);
    // console.log(form.celular);
    const auth:Auth = {
      celular: form.celular,
      password: form.password
    };
    console.log(auth);
    this.api.loginByCelular(auth).subscribe(data =>{
      //console.log(data);
      let dataResponse: AuthResponse = data;
      console.log(dataResponse);
    }, error =>{ 
      let dataError: AuthResponse = error;
      console.log(dataError.result);
    });

  }

}
