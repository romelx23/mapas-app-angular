import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [],
})
export class FullScreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const map = new mapboxgl.Map({
      container: 'mapa', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-76.9091514518274,-12.211526829008736], // starting position [lng, lat]
      zoom: 17, // starting zoom
    });
  }
}
