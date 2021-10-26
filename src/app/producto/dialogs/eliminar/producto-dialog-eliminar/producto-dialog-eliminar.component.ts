import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/producto/producto';
import { ProductoService } from 'src/app/producto/produto.service';

@Component({
  selector: 'app-producto-dialog-eliminar',
  templateUrl: './producto-dialog-eliminar.component.html',
  styleUrls: ['./producto-dialog-eliminar.component.css']
})
export class ProductoDialogEliminarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ProductoDialogEliminarComponent>, private productoService: ProductoService) { }

  private producto: Producto;
  showProgress = false;

  ngOnInit(): void {
    this.inicializar();
  }

  eliminar() {
    //console.log(`eliminar ${this.producto.id}`);
    this.showProgress = true;
    this.productoService.eliminarProducto(this.producto.id).subscribe(
      response => {
        if (response['status'] == HttpStatusCode.NoContent.valueOf()) {
          setTimeout(() => {
            this.showProgress = false;
            this.dialogRef.close();
          }, 2000);
        }});
  }

  inicializar() {
    this.producto = this.data['producto'] as Producto
  }

}
