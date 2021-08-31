export interface UserInterface {
  id?: string;
  nombre: string;
  apellido: string;
  telefono: number;
  numeroUnico: number;
  carreraId: string;
  email: string;
  password: string;
  semestreRef: number;
  foto?: string;
  rol: string;
  carreraNombre?: string;
}
