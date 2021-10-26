import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/categoria/categoria';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { Producto } from 'src/app/producto/producto';
import { ProductoService } from 'src/app/producto/produto.service';

@Component({
  selector: 'app-producto-dialog-agregar',
  templateUrl: './producto-dialog-agregar.component.html',
  styleUrls: ['./producto-dialog-agregar.component.css']
})
export class ProductoDialogAgregarComponent implements OnInit {

  grupoAgregar: FormGroup;
  submitted = false;
  categorias: Categoria[];
  producto: Producto;
  showProgress = false;
  imagenProducto: File;
  imagenProductoNombre: string;

  constructor(private categoriaService: CategoriaService, private productoService: ProductoService, private dialogRef: MatDialogRef<ProductoDialogAgregarComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inicializar();
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriaService.listarCategorias().subscribe(categorias => this.categorias = categorias as Categoria[])
  }

  inicializar() {
    this.producto = new Producto;
    this.grupoAgregar = this.formBuilder.group({
      descripcion: ["", [Validators.required]],
      precio: ["", [Validators.required, Validators.min(0.1)]]
    });
  }

  agregar() {
    this.showProgress = true;
    this.productoService.guardarProducto(this.producto, this.imagenProducto).subscribe(
      response => {
        if (response['status'] == HttpStatusCode.Created.valueOf()) {
          setTimeout(() => {
            this.showProgress = false;
            this.cancelar();
          }, 2000);
        }
      }
    );
  }

  seleccionarImagen(event) {
    this.imagenProducto = event.target.files[0];
    this.imagenProductoNombre = this.imagenProducto.name;
  }

  cancelar() {
    //this.producto = null;
    this.dialogRef.close();
  }

  get form() {
    return this.grupoAgregar.controls;
  }

  onSubmit(){
    console.log('submit');
  }

}
