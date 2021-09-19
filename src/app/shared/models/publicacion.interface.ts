export interface Publicacion {
  id: string;
  idCarrera?: string;
  idMateria: string;
  file?: string;
  categoria?: string;
  descripcion: string;
  fecha?: any;
  apellUser?: string;
  idUser?: string;
  likes?: number;
  disLikes?: number;
  nameUser?: string;
  titulo: string;
  userFoto?: string;
}