export interface Admin {
    id?: string;
    nombre: string;
    apellido: string;
    numUnico: number;
    carreraId?: string;
    carreraNombre?: string;
    semestreRef?: string;
    email: string;
    password: string;
    telefono: number;
    foto?: string;
    rol?: string;
  }