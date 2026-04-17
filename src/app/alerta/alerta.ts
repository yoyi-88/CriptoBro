import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  template: `
    <div style="background: #00bcd4; color: black; padding: 15px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; font-weight: bold;">
      <span>🎉 ¡Éxito! Has comprado {{ moneda }}</span>
      <button (click)="cerrar()" style="background: black; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Cerrar</button>
    </div>`

})
export class Alerta {
    @Input() moneda = '';
    @Input() cerrar!: () => void;
}
