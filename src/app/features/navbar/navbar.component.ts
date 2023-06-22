import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userName: string | any;
  constructor(public apiService:ApiService, private router:Router) {
    if(this.apiService.isLogged)
    {
      this.userName = localStorage.getItem('celular');
    }
    else{
      this.userName = 'Ingresar';
    }
    //console.log(this.userName)
  }

  ngOnInit(): void { }

  cerrarSesion(): void{
    this.apiService.logout();
    location.reload();
  }

}
