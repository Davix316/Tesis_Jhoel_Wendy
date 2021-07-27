import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Inicio',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Administradores',
    url: '/list',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Estudiantes',
    url: '/listStudent',
    icon: 'icon-calculator',
  },
  {
    name: 'Carreras',
    url: '/carreras',
    icon: 'icon-star'
  },
  {
    name: 'Perfil',
    url: '/perfil',
    icon: 'icon-ban',
  }
];
