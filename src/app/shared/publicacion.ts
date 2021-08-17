export interface PublicacionInterface {
  id: string;
  idUser: string;
  idMateria: string;
  idCarrera: string;
  categoria: string;
  fecha: any;
  likes: number;
  titulo: string;
  descripcion: string;
  nameUser: string;
  apellUser: string;
  file: string;
  imagen?: string;
  userFoto: string;
}
