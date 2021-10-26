import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/producto/producto';
import { ProductoService } from 'src/app/producto/produto.service';

@Component({
  selector: 'app-imagen-dialog',
  templateUrl: './imagen-dialog.component.html',
  styleUrls: ['./imagen-dialog.component.css']
})
export class ImagenDialogComponent implements OnInit {

  private producto: Producto;
  fotoSeleccionada: File;
  fotoSeleccionadaNombre: string;
  showProgress: boolean;
  url: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private productoService: ProductoService, private dialogRef: MatDialogRef<ImagenDialogComponent>) { }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar() {
    this.producto = this.data['producto'] as Producto;
  }

  subirImagen() {
    if (this.fotoSeleccionada && this.fotoSeleccionada['type'].indexOf('image') == 0) {
      this.showProgress = true;
      this.productoService.subirImagen(this.producto.id, this.fotoSeleccionada).subscribe(response => {
        setTimeout(() => {
          this.showProgress = false;
          this.dialogRef.close();
        }, 2000)
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  seleccionarImagen(event) {
    if (event.target.files[0]) {
      this.fotoSeleccionada = event.target.files[0];
      this.fotoSeleccionadaNombre = this.fotoSeleccionada.name;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
