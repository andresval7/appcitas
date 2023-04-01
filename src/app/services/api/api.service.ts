import { Injectable } from '@angular/core';
import { Auth } from '../../models/auth.model';
import { AuthResponse } from '../../models/authResponse.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private user = new BehaviorSubject<AuthResponse>(boolean);
  url:string = '/api/'; //Hay un proxy de desarrollo para evitar CORS
  
  constructor(private http:HttpClient) { 
    this.checkToken();
  }


  loginByCelular(form:Auth): Observable<AuthResponse>{
    let direccion: string = this.url + 'auth';
    return this.http
    .post<AuthResponse>(direccion,form)
    .pipe(
      map((user: AuthResponse) => {
        this.saveLocalStorage(user);
        //this.user.next(user);
        return user;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout(): void{
    localStorage.removeItem('token');
  }

  private saveLocalStorage(user: AuthResponse): void {
    const { status, result, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private checkToken(): void{
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired ->',isExpired);
  }

  private handlerError(err: any): Observable<never>{
    let errorMessage: string = 'An error occurring retrieving data';
    if(err){
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
}

