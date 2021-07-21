export interface User {
  id?: string;
  nombre: string;
  apellido: string;
  telefono: number;
  numeroUnico: number;
  carrera: string;
  email: string;
  password: string;
  semestreRef: number;
  foto: string;
  rol: string;
}

export interface Roles {
  estudiante?: boolean;
  administrador?: boolean;
}
