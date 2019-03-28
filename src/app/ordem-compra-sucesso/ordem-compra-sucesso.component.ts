import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pur-ordem-compra-sucesso',
  templateUrl: './ordem-compra-sucesso.component.html',
  styleUrls: ['./ordem-compra-sucesso.component.css']
})
export class OrdemCompraSucessoComponent implements OnInit {

  @Input()
  public idPedido: number

  constructor() { }

  ngOnInit() {
  }

}
