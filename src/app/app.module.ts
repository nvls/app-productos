import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaService } from './categoria/categoria.service';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductoComponent } from './producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from './producto/produto.service';
import { ProductoDialogComponent } from './producto/dialogs/producto-dialog/producto-dialog.component';
import { ProductoDialogEliminarComponent } from './producto/dialogs/eliminar/producto-dialog-eliminar/producto-dialog-eliminar.component';
import { ProductoDialogModificarComponent } from './producto/dialogs/modificar/producto-dialog-modificar/producto-dialog-modificar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoDialogAgregarComponent } from './producto/dialogs/agregar/producto-dialog-agregar/producto-dialog-agregar.component';
import { ImagenDialogComponent } from './producto/dialogs/imagen/imagen-dialog/imagen-dialog.component';
import { SideLeftComponent } from './side-left/side-left.component';

const routes:  Routes = [
  {path : '', redirectTo : '/categorias', pathMatch : 'full'},
  {path : 'categorias', component : CategoriaComponent},
  {path : 'productos', component : ProductoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    HeaderComponent,
    ProductoComponent,
    ProductoDialogComponent,
    ProductoDialogEliminarComponent,
    ProductoDialogModificarComponent,
    ProductoDialogAgregarComponent,
    ImagenDialogComponent,
    SideLeftComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CategoriaService,ProductoService],
  bootstrap: [AppComponent],
  entryComponents: [
    ProductoDialogEliminarComponent,
    ProductoDialogModificarComponent
  ]
})
export class AppModule { }
