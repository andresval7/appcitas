import { Component, OnInit } from '@angular/core';
import { TipoServicio } from 'src/app/models/tiposervicio.model';
import { TipoServicioService } from 'src/app/services/tipo_servicio/tipo-servicio.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  tipoServicios: TipoServicio[] = [];

  constructor(private tipoSVc:TipoServicioService) { }

  ngOnInit(): void {
    this.tipoSVc.getTipoServicio()
      .subscribe(resp =>{
        if(resp){
          console.log(resp);
          this.tipoServicios = [...resp];
        }
      });
  }



}
