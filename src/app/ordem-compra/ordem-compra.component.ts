import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public idPedido: number
  public itensCarrinho: ItemCarrinho[]

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoCompraService: CarrinhoService
  ) { }

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(6)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  ngOnInit() {
    this.itensCarrinho = this.carrinhoCompraService.getItemsCarrinho()

  }

  public aumentarQuantidade(item: ItemCarrinho){
    this.carrinhoCompraService.aumentarQuantidade(item)
  }

  public diminuirQuantidade (item: ItemCarrinho){
    this.carrinhoCompraService.diminuirQuantidade(item)
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    } else {
      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoCompraService.getItemsCarrinho()
      )
      this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido: number) => {
        this.idPedido = idPedido
      })
      this.carrinhoCompraService.LimparCarrinho()
    }
  }
}
