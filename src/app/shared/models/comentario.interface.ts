export interface Comentario {
  id: string;
  idPublicacion?: string;
  texto: string;
  fecha?: any;
  apellUser?: string;
  idUser?: string;
  voto?: number;
  nameUser?: string;
  fotoUser: string;
}