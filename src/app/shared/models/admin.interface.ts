export interface Admin {
    id?: string;
    nombre: string;
    apellido: string;
    numUnico: string;
    carreraId?: string;
    carreraNombre?: string;
    semestreRef?: string;
    email: string;
    password: string;
    telefono: string;
    foto?: string;
    rol?: string;
  }