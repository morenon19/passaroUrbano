import { Component, OnInit } from '@angular/core';

import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'pur-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  public ofertas: Oferta[]
  public categoria: string = 'restaurantes'

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {

    this.ofertasService.getOfertasByCategory('restaurante')
    .then((ofertas: Oferta[]) => {
      this.ofertas=ofertas
    })
    .catch((param: any) =>{
      console.log(param)
    })
  }
}
