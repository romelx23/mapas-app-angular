import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor{
  color:string;
  marker?:mapboxgl.Marker;
  centro?:[number,number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel:number=17;
  center:[number,number]=[-76.9091514518274, -12.211526829008736];
  marcadores:MarkerColor[]=[];

  constructor() { }

  ngAfterViewInit(): void{
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom: ;
    });
    // const markerHTML:HTMLElement=document.createElement('div');
    // markerHTML.className='marker';
    // const marker=new mapboxgl.Marker({
    //   element:markerHTML
    // })
    // .setLngLat(this.center)
    // .addTo(this.mapa);
    this.leerStorage()
  }

  agregarMarcador(){
    const markerHTML:HTMLElement=document.createElement('div');
    markerHTML.className='marker';
    const color="#xxxxxx".replace(/x/g,y=>(Math.random()*16|0).toString(16));
    
    const marker=new mapboxgl.Marker({
      // element:markerHTML,
      draggable:true,
      color,
    })
    .setLngLat(this.center)
    .addTo(this.mapa);
    this.marcadores.push({
      color,
      marker
    })
    // console.log(this.marcadores)
    this.guardarMarcadoresLocalStorage()
    marker.on('dragend',()=>{
      console.log('dragend')
      this.guardarMarcadoresLocalStorage()
    })
  }

  irMarcador(marcador:mapboxgl.Marker | undefined){
    // console.log(marcador)
    this.mapa.flyTo({
      center:marcador!.getLngLat()
    })
  }

  guardarMarcadoresLocalStorage(){
    const lngLatArr:MarkerColor[]=[]
    this.marcadores.forEach(m=>{
      const color=m.color;
      const {lng,lat}=m.marker!.getLngLat();
      lngLatArr.push({
        color:color,
        centro:[lng,lat],
      })
    })
    localStorage.setItem('marcadores',JSON.stringify(lngLatArr))
  }

  leerStorage(){
    const marcadres=localStorage.getItem('marcadores');
    if(!marcadres)return;
    const lngLatArr:MarkerColor[]=JSON.parse(marcadres)!;
    // console.log(lngLatArr)

    lngLatArr.forEach(m=>{
      const newMarker=new mapboxgl.Marker({
        color:m.color,
        draggable:true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa)

      this.marcadores.push({
        color:m.color,
        marker:newMarker,
      });
      newMarker.on('dragend',()=>{
        console.log('dragend')
        this.guardarMarcadoresLocalStorage()
      })
    })
  }

  borrarMarcador(i:number){
    console.log('dbclick')
    this.marcadores[i].marker?.remove()
    this.marcadores.splice(i,1)
    this.guardarMarcadoresLocalStorage()
  }
}
