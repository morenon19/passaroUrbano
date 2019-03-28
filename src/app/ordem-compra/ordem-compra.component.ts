import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'pur-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})

export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number

  //pedido
  public pedido: Pedido = new Pedido('','','','')

  public endereco: string = ''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''

  //controles de validação de dados
  public enderecoValido: boolean
  public numeroValido: boolean
  public complementoValido: boolean
  public formaPagamentoValido: boolean

  //estados primitivos dos campos (pristine)
  public enderecoEstadoPrimitivo: boolean = true
  public numeroEstadoPrimitivo: boolean = true
  public complementoEstadoPrimitivo: boolean = true
  public formaPagamentoEstadoPrimitivo: boolean = true

  //controlar botão confirmar comprar
  public estadoForm: string = 'disabled'


  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
  }

  public atualizaEndereco(endereco: string): void{
    this.endereco = endereco

    this.endereco.length > 3 ? this.enderecoValido=true : this.enderecoValido=false
    this.enderecoEstadoPrimitivo = false
    this.habilitaBotao()

    console.log(this.endereco)
  }

  public atualizaNumero(numero: string): void{
    this.numero = numero

    this.numero.length >= 1 ? this.numeroValido=true : this.numeroValido=false
    this.numeroEstadoPrimitivo = false
    this.habilitaBotao()

    console.log(this.numero)
  }

  public atualizaComplemento(complemento: string): void{
    this.complemento = complemento

    if(this.complemento.length > 0) this.complementoValido=true 
    this.complementoEstadoPrimitivo = false
    this.habilitaBotao()

    console.log(this.complemento)
  }

  public atualizaFormaPagamento(formaPagamento: string): void{
    this.formaPagamento = formaPagamento

    this.formaPagamento != '' ? this.formaPagamentoValido=true : this.formaPagamentoValido=false
    this.formaPagamentoEstadoPrimitivo = false
    this.habilitaBotao()

    console.log(this.formaPagamento)
  }

  public habilitaBotao(): void{
    if (this.enderecoValido===true && this.numeroValido===true && this.formaPagamentoValido===true){
      this.estadoForm = ''
    }else this.estadoForm='disabled'
  }

  public confirmarCompra(): void{
    this.pedido.endereco = this.endereco
    this.pedido.numero = this.numero
    this.pedido.complemento = this.complemento
    this.pedido.formaPagamento = this.formaPagamento
    console.log("Pedido Comp", this.pedido)
    this.ordemCompraService.efetivarCompra(this.pedido)
      .subscribe((idPedido: number)=>{
        this.idPedidoCompra = idPedido
        console.log(this.idPedidoCompra)
      })
  }
  

}
