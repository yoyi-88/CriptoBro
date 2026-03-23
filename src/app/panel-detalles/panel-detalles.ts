import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cripto } from '../cripto';

@Component({
  selector: 'app-panel-detalles',
  imports: [],
  templateUrl: './panel-detalles.html',
  styleUrl: './panel-detalles.css',
})
export class PanelDetalles {
  @Input() monedaActiva!: Cripto;

  @Output() cerrarPanel = new EventEmitter<void>();
}
