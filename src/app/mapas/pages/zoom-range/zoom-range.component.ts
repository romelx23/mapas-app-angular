import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [],
})
export class ZoomRangeComponent implements AfterViewInit,OnDestroy {
  // usamos el afterviewinit para que se ejecute despues de que se cargue el mapa
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel:number=17;
  center:[number,number]=[-76.9091514518274, -12.211526829008736];

  constructor() {}
  ngOnDestroy(): void {
    this.mapa.off('zoom',()=>{});
    this.mapa.off('zoomend',()=>{});
    this.mapa.off('move',()=>{});
  }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom: ;
    });
    this.mapa.on('zoom',(e)=>{
      this.zoomLevel=this.mapa.getZoom();
    })
    this.mapa.on('zoomend',()=>{
      if(this.mapa.getZoom()>18){
        this.mapa.setZoom(18);
      }
    })
    this.mapa.on('move',(event)=>{
      const target = event.target;
      const {lng,lat}=target.getCenter();
      this.center=[lng,lat];
    })
  }



  zoomIn() {
    // console.log('zoomIn')
    this.mapa.zoomIn();
  }

  zoomOut() {
    // console.log('zoomOut')
    this.mapa.zoomOut();
  }
  zoomChange(value:string){
    this.mapa.zoomTo(Number(value));
  }
}
