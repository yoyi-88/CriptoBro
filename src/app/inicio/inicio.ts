import { Component, inject, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { Cripto } from '../cripto'; 
import { TarjetaCripto } from '../tarjeta-cripto/tarjeta-cripto';
import { PanelDetalles } from '../panel-detalles/panel-detalles';
import { CriptoService } from '../services/cripto-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgComponentOutlet } from '@angular/common'; 
import { Alerta } from '../alerta/alerta';
import { EXCHANGES, MODO_OSCURO } from '../app.tokens';

@Component({
  selector: 'app-inicio',
  imports: [TarjetaCripto, PanelDetalles, NgComponentOutlet],
  // Angular solo repintará el HTML cuando un Signal (como textoBusqueda o monedasFiltradas) cambie.
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  
  // el HTML leerá esta variable para saber qué componente dibujar.
  plantillaAlerta = Alerta;


  // Para los Outputs dinámicos, necesitamos usar funciones flecha (Arrow functions)
  cerrarAlerta = () => {
    this.ultimaCompra.set('');
  }

  // Inyectamos el array de exchanges (Angular junta todos los multi:true en un array automático)
  mercadosSoportados = inject(EXCHANGES);

  // Inyectamos algo opcional. Como no lo proveímos en app.config.ts, esto valdrá 'null'
  esModoOscuro = inject(MODO_OSCURO, { optional: true });

}
