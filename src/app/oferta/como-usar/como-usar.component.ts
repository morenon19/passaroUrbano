import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../../ofertas.service'
import { Oferta } from 'src/app/shared/oferta.model';

@Component({
  selector: 'pur-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public descricao: string

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    
    this.route.parent.params.subscribe((parametros: Params)=>{
      this.ofertasService.getComoUsarById(parametros.id)
      .then((descricao: string)=> this.descricao=descricao)
      .catch((param: any)=> console.log(param))
    })

  }

}
