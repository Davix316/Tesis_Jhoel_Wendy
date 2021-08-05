export interface PublicacionInterface {
  id: string;
  idUser: string;
  idTarea: string;
  categoria: string;
  fecha: Date;
  likes: number;
  titulo: string;
  descripcion: string;
  nameUser: string;
  apellUser: string;
  file: string;
  imagen?: string;
}
