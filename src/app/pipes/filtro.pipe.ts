/* eslint-disable arrow-body-style */
import { Pipe, PipeTransform } from '@angular/core';
import { MateriasInterface } from '../shared/materias';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(listaMaterias: MateriasInterface[], texto: string): MateriasInterface[] {
    if(texto === ''){
      return listaMaterias;
    }

    return listaMaterias.filter(mat =>{
      return mat.nombre.toLowerCase().includes(texto = texto.toLowerCase());
    });
  }


}
