import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'pur-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertasService]
  
})
export class DiversaoComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertaService: OfertasService) { }

  ngOnInit() {

    this.ofertaService.getOfertasByCategory('diversao')
      .then((ofertas: Oferta[])=>this.ofertas=ofertas)
      .catch((param:any)=>console.log(param))
      
  }

}
