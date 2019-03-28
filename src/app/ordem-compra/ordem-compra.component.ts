import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'pur-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  @ViewChild('formulario') public form: NgForm

  constructor(private ordemCompraService: OrdemCompraService) { }

  public idPedido: number

  ngOnInit() {
    
  }

  public confirmarCompra(formulario: NgForm): void {

    let pedido: Pedido = new Pedido(
      this.form.value.endereco,
      this.form.value.numero,
      this.form.value.complemento,
      this.form.value.formaPagamento
    )

    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((idPedido: number)=>{
        console.log('Pedido cadastrado com sucesso! ID do Pedido: ' + idPedido)
        this.idPedido = idPedido
      })
  }

}
