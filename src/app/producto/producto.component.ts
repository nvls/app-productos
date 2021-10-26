import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Categoria } from '../categoria/categoria';
import { CategoriaService } from '../categoria/categoria.service';
import { ProductoDialogAgregarComponent } from './dialogs/agregar/producto-dialog-agregar/producto-dialog-agregar.component';
import { ProductoDialogEliminarComponent } from './dialogs/eliminar/producto-dialog-eliminar/producto-dialog-eliminar.component';
import { ProductoDialogModificarComponent } from './dialogs/modificar/producto-dialog-modificar/producto-dialog-modificar.component';
import { Producto } from './producto';
import { ProductoService } from './produto.service';
import { switchMap } from 'rxjs/operators';
import { ImagenDialogComponent } from './dialogs/imagen/imagen-dialog/imagen-dialog.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private dialog: MatDialog, private router: Router) { }

  displayedColumns: string[] = ['imagen', 'descripcion', 'categoria', 'precio', 'cantidad', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Producto>(null);
  categorias: Categoria[];
  productoNuevo: Producto;
  length: number;
  pageSize: number;

  ngOnInit(): void {
    this.inicializar();
    this.obtenerCategorias();
    this.obtenerProductos(0);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.obtenerProductos(this.paginator.pageIndex);
    });
  }

  inicializar() {
    this.productoNuevo = new Producto;
  }

  obtenerProductos(page: number) {
    this.productoService.listarProductos(page).subscribe(data => {
      this.length = data['totalLista'];
      this.pageSize = 4;
      return this.dataSource.data = data['data'] as Producto[];
    });
  }

  obtenerCategorias() {
    this.categoriaService.listarCategorias().subscribe(categorias => this.categorias = categorias as Categoria[])
  }

  editar(producto: Producto) {
    this.dialog.open(ProductoDialogModificarComponent, { data: { producto } }).afterClosed().subscribe(() => this.obtenerProductos(this.paginator.pageIndex));
  }

  eliminar(producto: Producto) {
    this.dialog.open(ProductoDialogEliminarComponent, { data: { producto } }).afterClosed().subscribe(() => this.obtenerProductos(this.paginator.pageIndex));
  }

  agregar() {
    this.dialog.open(ProductoDialogAgregarComponent).afterClosed().subscribe(() => this.obtenerProductos(this.paginator.pageIndex));
  }

  cambiarImagen(producto: Producto) {
    this.dialog.open(ImagenDialogComponent, { data: { producto } }).afterClosed().subscribe(() => this.obtenerProductos(this.paginator.pageIndex));
  }

}
