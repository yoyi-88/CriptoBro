import { Component, inject, signal, computed, effect } from '@angular/core';
import { Cripto } from '../cripto'; 
import { TarjetaCripto } from '../tarjeta-cripto/tarjeta-cripto';
import { PanelDetalles } from '../panel-detalles/panel-detalles';
import { CriptoService } from '../services/cripto-service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-inicio',
  imports: [TarjetaCripto, PanelDetalles],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  constructor() {
    // Recuperamos la búsqueda anterior (si existe) nada más arrancar
    const busquedaGuardada = localStorage.getItem('miBusquedaCripto');
    if (busquedaGuardada) {
      this.textoBusqueda.set(busquedaGuardada);
    }

    // EL VIGILANTE: Cada vez que textoBusqueda() cambie, guárdalo en el disco duro.

    effect(() => {
      localStorage.setItem('miBusquedaCripto', this.textoBusqueda());
    });
  }
  bancoCripto = inject(CriptoService);

  // Llama a internet, espera la respuesta, y la guarda en un Signal automáticamente.
  listaMonedas = toSignal(this.bancoCripto.obtenerMonedasDeVerdad(), { initialValue: [] });

  textoBusqueda = signal('');


  monedasFiltradas = computed(() => {
    const texto = this.textoBusqueda().toLowerCase();

    return this.listaMonedas().filter(moneda =>
      moneda.nombre.toLowerCase().includes(texto) ||
      moneda.nombre.toLowerCase().includes(texto)
    );
  });

    // Signal para guardar lo que el hijo nos mande
  ultimaCompra = signal<string>('');

  // TODO 8: Crea la función registrarCompra(nombreMoneda: string)
  // Dentro, usa this.ultimaCompra.set() para guardar el nombre que recibes.
  registrarCompra(nombreMoneda: string) {
    this.ultimaCompra.set(nombreMoneda);
  }

  monedaDestacada = signal<Cripto | undefined>(undefined);

}
