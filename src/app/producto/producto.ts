import { Categoria } from "../categoria/categoria";

export class Producto {
    id: string;
    categoria: Categoria;
    descripcion: string;
    precio: number;
    imagen: string;
    cantidad: number;
    estado: boolean;
}
