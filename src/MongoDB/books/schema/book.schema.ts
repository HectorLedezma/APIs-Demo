import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  titulo: String,
  genero: Array,
  autor: Array,
  idioma: String,
  pais_autor: String,
  editorial: String,
  anio_edicion: Number,
  numero_edicion: Number,
  precio: Number,
  portada: String,
});
