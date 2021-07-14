export interface User {
  id?: string;
  nombre: string;
  apellido: string;
  numeroUnico: number;
  carrera: string;
  email: string;
  password: string;
  rol?: string;
}

export interface Roles {
  estudiante?: boolean;
  administrador?: boolean;
}
