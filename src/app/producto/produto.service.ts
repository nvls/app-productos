import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private pathRoot: string = 'http://localhost:8080/productos';
  private cantidad: number = 4;
  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  listarProductos(pagina: number): Observable<Producto[]> {
    return this.http.get<any>(`${this.pathRoot}/pagina/${pagina}/cantidad/${this.cantidad}`);
    //.pipe(
    //  map((response) => response['data'])
    //);
  }

  guardarProducto(producto: Producto, file: File): Observable<any> {

    if (file != undefined) {
      let formData = new FormData();

      let content = JSON.stringify(producto);
      let blob = new Blob([content], { type: "application/json" });

      formData.append('producto', blob);
      formData.append('file', file);
      return this.http.post<Producto>(this.pathRoot, formData);
    }

    return this.http.post(`${this.pathRoot}/sin-imagen`, producto, { headers: this.httpHeaders });

  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete<any>(`${this.pathRoot}/${id}`, { headers: this.httpHeaders });
  }

  actualizar(producto: Producto, file: File) {
    if (file != undefined) {
      let data = new FormData();
      let content = JSON.stringify(producto);
      let blob = new Blob([content], { type: "application/json" });
      data.append("producto", blob);
      data.append("file", file);
      return this.http.put(`${this.pathRoot}/${producto.id}`, data);
    }
    return this.http.put(`${this.pathRoot}/sin-imagen/${producto.id}`, producto, { headers: this.httpHeaders });
  }

  subirImagen(id: string, file: File): Observable<any> {
    let formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.pathRoot}/imagen/${id}`, formData);
  }

}
