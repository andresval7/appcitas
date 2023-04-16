import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoServicio } from 'src/app/models/tiposervicio.model';
import { ApiService } from 'src/app/services/api/api.service';
import { TipoServicioService } from 'src/app/services/tipo_servicio/tipo-servicio.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  tipoServicios: TipoServicio[] = [];
  servicioEscogido!: TipoServicio;
  nombreServicio: string = " ";
  datosLogin!: ApiService;
  estaLogeado: boolean = false;

  citaForm = new FormGroup({
    fechaCita: new FormControl('',{validators: Validators.required,nonNullable: true}),
    horaCita: new FormControl('', {validators: Validators.required, nonNullable: true})
  });

  constructor(private tipoSVc:TipoServicioService, private dataLogin:ApiService, private router:Router) {

    dataLogin.isLogged.subscribe(data =>{
      if(data)
        this.estaLogeado = data;
    });

    if(!this.estaLogeado)
      this.router.navigate(['**']);

  }

  ngOnInit(): void {

    this.tipoSVc.getTipoServicio()
      .subscribe(resp =>{
        if(resp){
          console.log(resp);
          this.tipoServicios = [...resp];
          this.servicioEscogido = this.tipoServicios[0];
        }
      });
  }

  setTipoSvc(tipoServicio: TipoServicio): void{
    this.servicioEscogido = tipoServicio;
    this.nombreServicio = this.getNombreServicio();
    //console.log(this.servicioEscogido);
  }

  getNombreServicio(): string{
    let nombreServicio=this.servicioEscogido.NombreServicio;
    return nombreServicio;
  }

  agendarCita(form:any):void{

  }


}
