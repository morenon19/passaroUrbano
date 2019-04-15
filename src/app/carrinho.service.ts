import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model';

export class CarrinhoService{

    public itens: ItemCarrinho[] = []

    public incluirItem(oferta: Oferta): void{
        let itemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )

        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho)=> item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade += 1
        } else{
            this.itens.push(itemCarrinho)
        }
    }

    public getItemsCarrinho(): ItemCarrinho[]{
        return this.itens
    }

    public aumentarQuantidade(itemCarrinho: ItemCarrinho):void{
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho)=> item.id === itemCarrinho.id)
        if(itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade += 1
        }
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho):void{
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho)=> itemCarrinho.id === item.id)
        if (itemCarrinhoEncontrado.quantidade>1){
            itemCarrinhoEncontrado.quantidade--
        }else this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
    }

    public getTotal(): number{
        let total: number = 0
        this.itens.map((item: ItemCarrinho) => total += (item.valor * item.quantidade))
        return total
    }

    public LimparCarrinho(): void{
        this.itens = []
    }

}