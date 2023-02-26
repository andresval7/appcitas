import { Injectable } from '@angular/core';
import { Auth } from '../../models/auth.model';
import { AuthResponse } from '../../models/authResponse.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  url:string = '/api/'; //Hay un proxy de desarrollo para evitar CORS
  
  constructor(private http:HttpClient) { }

  loginByCelular(form:Auth): Observable<AuthResponse>{
    let direccion: string = this.url + 'auth';
    return this.http.post<AuthResponse>(direccion,form);
  }


}
