import { Time } from "@angular/common";

export interface TipoServicio{
  IdTipoServicio: number;
  NombreServicio: string;
  ValorServicio: number;
  DescripcionServicio: string;
  ImagenServicio: string;
  DuracionServicio: Time;
  Disponible: number;

}
