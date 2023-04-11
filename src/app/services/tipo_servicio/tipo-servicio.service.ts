import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoServicio } from 'src/app/models/tiposervicio.model';
import { TipoServicioResponse } from 'src/app/models/tiposervicioResponse.model';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  url:string = '/api/'; //Hay un proxy de desarrollo para evitar CORS
  constructor(private http:HttpClient) { }

  getTipoServicio(): Observable<TipoServicio[] | void>{
    let direccion: string = this.url + 'tipoServicio';
    console.log('url: ', direccion);
    return this.http.get<TipoServicio[]>(direccion);
  }

  addTipoServicio(tipoServicio: TipoServicio): Observable<TipoServicioResponse | void>{
    let direccion: string = this.url + 'tipoServicio';
    return this.http.post<TipoServicioResponse>(direccion,tipoServicio);
  }

  updateTipoServicio(tipoServicio: TipoServicio): Observable<TipoServicioResponse | void>{
    let direccion: string = this.url + 'tipoServicio';
    return this.http.put<TipoServicioResponse>(direccion,tipoServicio);
  }
}
