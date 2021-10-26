import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, Inject, AfterContentInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/categoria/categoria';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { Producto } from 'src/app/producto/producto';
import { ProductoService } from 'src/app/producto/produto.service';

@Component({
  selector: 'app-producto-dialog-modificar',
  templateUrl: './producto-dialog-modificar.component.html',
  styleUrls: ['./producto-dialog-modificar.component.css']
})
export class ProductoDialogModificarComponent implements OnInit {

  categorias: Categoria[];
  showProgress = false;
  productoModificar: Producto;
  imagenProducto: File;
  imagenProductoNombre: string;
  categoriaSeleccionada: Categoria;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoriaService: CategoriaService, private productoService: ProductoService, private dialogRef: MatDialogRef<ProductoDialogModificarComponent>) { }

  ngOnInit(): void {
    this.inicializar();
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriaService.listarCategorias().subscribe(categorias => {
      this.categorias = categorias as Categoria[];
      for(var i=0; i < categorias.length; i++) {
        if(categorias[i].id == this.productoModificar.categoria.id) {
          this.categoriaSeleccionada = categorias[i];
        }
      }
    });
  }

  modificar() {
    this.showProgress = true;
    this.productoModificar.categoria = this.categoriaSeleccionada;
    this.productoService.actualizar(this.productoModificar, this.imagenProducto).subscribe(
      response => {
        if (response['status'] == HttpStatusCode.Ok.valueOf()) {
          setTimeout(() => {
            this.showProgress = false;
            this.cancelar();
          }, 2000);
        }
      }
    );
  }

  inicializar() {
    this.inicializarProducto();
  }

  inicializarProducto() {
    let pr = this.data['producto'] as Producto;
    this.productoModificar = { ...pr };
  }

  cancelar() {
    //this.productoModificar = null;
    this.dialogRef.close();
  }

  seleccionarImagen(event) {
    this.imagenProducto = event.target.files[0];
    this.imagenProductoNombre = this.imagenProducto.name;
    console.log(this.imagenProducto);
  }

}
