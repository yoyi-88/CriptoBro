import { Component, inject, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { Cripto } from '../cripto'; 
import { TarjetaCripto } from '../tarjeta-cripto/tarjeta-cripto';
import { CriptoService } from '../services/cripto-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgComponentOutlet } from '@angular/common'; 
import { Alerta } from '../alerta/alerta';
import { EXCHANGES, MODO_OSCURO } from '../app.tokens';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-inicio',
  imports: [TarjetaCripto, NgComponentOutlet],
  // Angular solo repintará el HTML cuando un Signal (como textoBusqueda o monedasFiltradas) cambie.
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  animations: [
    trigger('desplegarFiltros', [
      // Foto final cuando está abierto
      state('abierto', style({ 
        height: '*', // El asterisco significa "lo que ocupe el contenido naturalmente"
        opacity: 1, 
        padding: '15px' 
      })),
      // Foto final cuando está cerrado
      state('cerrado', style({ 
        height: '0px', 
        opacity: 0, 
        padding: '0px',
      })),
      // El viaje de ida y vuelta
      transition('abierto <=> cerrado', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
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

  // LA VARIABLE DE ESTADO: Controla si mostramos los filtros o no
  filtrosAbiertos = signal(false);

  toggleFiltros() {
    this.filtrosAbiertos.update(estado => !estado);
  }

}
