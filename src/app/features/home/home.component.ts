import { Component, OnInit } from '@angular/core';
import { IcarouselItem } from '../carousel/Icarousel-item.metadata';
import { CAROUSEL_DATA_ITEMS } from '../constants/carousel.const';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public carouselData: IcarouselItem[] = CAROUSEL_DATA_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

}

