export interface PublicacionInterface {
  id: string;
  idUser: string;
  idMateria: string;
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
