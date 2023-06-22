import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoServicio } from 'src/app/models/tiposervicio.model';
import { ApiService } from 'src/app/services/api/api.service';
import { TipoServicioService } from 'src/app/services/tipo_servicio/tipo-servicio.service';
//importaciones de full-calendar
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {createEventId} from 'src/app/features/event-utils';

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
  //full-calendar

  calendarOptions: CalendarOptions = {
    timeZone: 'UTC',
    initialView: 'dayGridMonth',
    height: 'auto',
    //width: 'auto',
    //dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    plugins: [interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,],
    events: [
      { title: 'event 1', date: '2023-04-16' },
      { title: 'event 2', date: '2023-04-17' }
    ],
    editable: true,
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,

    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  currentEvents: EventApi[] = [];

  citaForm = new FormGroup({
    fechaCita: new FormControl('',{validators: Validators.required,nonNullable: true}),
    horaCita: new FormControl('', {validators: Validators.required, nonNullable: true})
  });

  constructor(private tipoSVc:TipoServicioService, private dataLogin:ApiService, private router:Router, private changeDetector: ChangeDetectorRef) {

    dataLogin.isLogged.subscribe(data =>{
      if(data)
        this.estaLogeado = data;
    });

    /* Verifica si está logeado para mostrar los servicios, de lo contrario
    *  lo redirige a page not found
    *
    if(!this.estaLogeado)
      this.router.navigate(['**']);
    */
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

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }


}
