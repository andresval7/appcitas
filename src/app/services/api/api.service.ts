import { Injectable } from '@angular/core';
import { Auth } from '../../models/auth.model';
import { AuthResponse } from 'src/app/models/authResponse.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  url:string = '/api/'; //Hay un proxy de desarrollo para evitar CORS


  constructor(private http:HttpClient) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  loginByCelular(form:Auth): Observable<AuthResponse | void>{
    let direccion: string = this.url + 'auth';
    return this.http.post<AuthResponse>(direccion,form)
    .pipe(
      map((res:AuthResponse)=>{
        console.log('Res -> ', res);
        this.saveToken(res.result.token);
        this.saveCelular(form.celular);
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('celular');
    this.loggedIn.next(false);
  }

  private saveToken(token:string): void{
    localStorage.setItem('token', token);
  }

  private saveCelular(celular:string): void{
    localStorage.setItem('celular', celular);
  }

/*
  private saveLocalStorage(user: AuthResponse): void {
    const { status, result, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }
*/
  private checkToken(): void{
    const userToken = localStorage.getItem('token');
    if(userToken){
      this.logout();
    }
    else{
      this.loggedIn.next(true);
    }

    //const isExpired = helper.isTokenExpired(userToken);
    //const isExpired = helper.isTokenExpired(userToken);
    //console.log('isExpired -> ',isExpired);
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

