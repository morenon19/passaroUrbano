import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
 
@Component({
  selector: 'pur-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService
    ) { }

  ngOnInit() {

    this.route.params.subscribe((paramentros: Params)=>{
      this.ofertasService.getOfertaById(paramentros.id)
      .then((oferta: Oferta)=>{
        this.oferta = oferta
      }).catch((param: any)=>{
        console.log(param)
      })
    })
  }

}
