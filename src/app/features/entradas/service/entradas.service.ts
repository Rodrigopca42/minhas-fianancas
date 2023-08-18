import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { Entradas } from '../models/entradas.models';


@Injectable({
  providedIn: 'root'
})
export class EntradasService extends HttpBaseService{
  private endpoint = 'entradas';

  constructor( protected override readonly injector: Injector) {
    super(injector);
   }

getEntradas(): Observable<any>{
return this.httpGet(`${this.endpoint}`);
}


excluirEntradas(id: number): Observable<any>{
  return this.httpDelete(`${this.endpoint}/${id}`);
}

getEntradaPorId(id: number):Observable<any>{
  return this.httpGet(`${this.endpoint}/${id}`);
}

criarEntrada(payload: Entradas): Observable<any>{
  return this.httpPost(`${this.endpoint}`, payload);
}

editarEntrada(payload: Entradas): Observable<any>{
  return this.httpPut(`${this.endpoint}/${payload.id}`, payload);
}

}
