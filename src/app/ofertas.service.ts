import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { URL_API } from '../app/app.api';
import { Oferta } from './shared/oferta.model';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'



@Injectable()
export class OfertasService {

    constructor(private http: Http){}

    public getOfertas(): Promise<Oferta[]> {
        // Efetuar uma requisição HTTP
        // Retornar um promisse Oferta[]
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    public getOfertasByCategory(categoria: string): Promise<Oferta[]> {
        // Efetuar uma requisição HTTP
        // Retornar um promisse Oferta[]
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    public getOfertaById(id: number): Promise<Oferta>{
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        //Shith => Pega o objeto na primeira posição de um Array
        .then((resposta: Response)=> {
            return resposta.json().shift()
        })
    }

    public getComoUsarById(id:number): Promise<string>{
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta: Response)=>resposta.json()[0].descricao)

    }

    public getOndeFicaById(id: number): Promise<string>{
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: Response)=>resposta.json()[0].descricao)
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
        .retry(10)
        .map((resposta: Response)=> resposta.json())
    }



}