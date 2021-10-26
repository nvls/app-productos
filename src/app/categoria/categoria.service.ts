import { Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private pathGet: string = 'http://localhost:8080/categorias';
  constructor(private http: HttpClient) { }

  listarCategorias(): Observable<any> {
    return this.http.get<Categoria[]>(this.pathGet).pipe(
      map((response) => {
        return response['data'];
      })
    );
    //.pipe(
    //  map((response) => console.log(response))
    //);
    //return [];
  }
}
