export type Roles = 'SUSCRIPTOR' | 'EDITOR' | 'ADMIN';

export interface User {
  usuario: string;
  password?: string;
}
