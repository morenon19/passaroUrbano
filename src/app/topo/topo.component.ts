import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Observable, Subject } from 'rxjs';
import { Oferta } from '../shared/oferta.model'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'

@Component({
  selector: 'pur-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000) //executa a ação do SwitchMap após 1s
      .distinctUntilChanged()
      .switchMap((termo: string) => {
        console.log('Requisição HTTP para API')
        if (termo.trim() === '') {
          return Observable.of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termo)
      })
      .catch((erro: any)=>{
        console.log(erro)
        return Observable.of<Oferta[]>([])
      })

    //FAZENDO A INSCRIÇÃO NO OBSERVABLE ATRAVÉS DO | ASYNC
    // this.ofertas.subscribe((ofertas: Oferta[]) => {
    //   console.log(ofertas)
    //   this.ofertas2=ofertas
    // })
  }

  public pesquisa(termoDaBusca: string): void {
    // this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)

    // this.ofertas.subscribe(
    //   (ofertas: Oferta[])=> console.log(ofertas),
    //   (erro: any)=> console.log(erro),
    //   ()=> console.log('Fluxo de eventos completo')
    // )
    console.log('Keyup character: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void{
    this.subjectPesquisa.next('')
  }

}
