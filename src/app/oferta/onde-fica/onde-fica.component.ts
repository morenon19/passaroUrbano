import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../ofertas.service'
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'pur-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  public descricao: string

  constructor(
    private ofertasService: OfertasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((parametros: Params)=>{
      this.ofertasService.getOndeFicaById(parametros.id)
    .then((descricao: string)=> this.descricao=descricao)
    .catch((param: any)=>console.log(param))
    })
  }

}
