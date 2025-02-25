export class CreateBookDto {
  readonly titulo: string;
  readonly genero: string[];
  readonly autor: string[];
  readonly idioma: string;
  readonly pais_autor: string;
  readonly editorial: string;
  readonly anio_edicion: number;
  readonly numero_edicion: number;
  readonly precio: number;
  readonly portada: string;
}
