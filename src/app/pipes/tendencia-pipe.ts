import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tendencia',
})
export class TendenciaPipe implements PipeTransform {
  transform(valor: number): string {
    if (!valor) return '0%';

    if (valor > 0) {
      return `+${valor}% 📈`;
    } else if (valor < 0) {
      return `${valor}% 📉`; // El número ya trae el menos, no hace falta ponérselo
    } else {
      return `0% ➖`;
    }
  }
}
