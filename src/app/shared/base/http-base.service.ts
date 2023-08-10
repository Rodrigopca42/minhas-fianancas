import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  public readonly httpClient!: HttpClient;

  constructor(private readonly injector:Injector) { }
}
