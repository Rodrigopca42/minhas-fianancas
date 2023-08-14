import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { Categoria } from '../models/categoria.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends HttpBaseService{

  private endpoint ='categorias';

  constructor(protected override readonly injector: Injector) {
    super(injector);
   }

   getCategorias(): Observable<any>{
    return this.httpGet(this.endpoint);
   }

   getCategoriasPeloId(id: number): Observable<any>{
    return this.httpGet(`${this.endpoint}/${id}`);
   }

   alterarCategoria(payload: Categoria){
    return this.httpPut(`${this.endpoint}/${payload.id}`, payload)
   }


}
 