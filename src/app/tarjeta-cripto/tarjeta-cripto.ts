import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Cripto } from '../cripto'; // Importamos el molde
import { CurrencyPipe } from '@angular/common';
import { TendenciaPipe } from '../pipes/tendencia-pipe';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-tarjeta-cripto', // Angular le pone 'app-' por defecto
  standalone: true,
  imports: [CurrencyPipe, TendenciaPipe, RouterLink],
  // Le decimos a Angular: "Solo actualiza este HTML si cambia el @Input() moneda"
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tarjeta-cripto.html',
  styleUrl: './tarjeta-cripto.css'
})
export class TarjetaCripto {
  // TODO 1: Crea el @Input llamado 'moneda' de tipo 'Cripto'. 
  // Usa la exclamación (!) para decirle a TypeScript que el padre se lo pasará seguro.
  // Ejemplo: @Input() moneda!: Cripto;
  @Input() moneda!: Cripto;
  
  // TODO 2: Crea el @Output llamado 'comprado' que sea un nuevo EventEmitter<string>()
  // Ejemplo: @Output() comprado = new EventEmitter<string>();
  @Output() comprado = new EventEmitter<string>();

  // Esta función mira la moneda que nos ha pasado el Jefe (@Input) 
  // y devuelve una palabra clave.
  obtenerEstadoMercado(): string {
    const tendencia = this.moneda.tendencia;
    
    if (tendencia > 0.5) return 'alcista';
    if (tendencia < -0.5) return 'bajista';
    return 'estable';
  }

}