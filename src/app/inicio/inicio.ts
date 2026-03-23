import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Cripto } from '../cripto'; // Importamos el molde
// TODO 6: Importa el componente hijo
import { TarjetaCripto } from '../tarjeta-cripto/tarjeta-cripto';
import { PanelDetalles } from '../panel-detalles/panel-detalles';
import { CriptoService } from '../services/cripto-service';
@Component({
  selector: 'app-inicio',
  imports: [TarjetaCripto, PanelDetalles],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit{
  bancoCripto = inject(CriptoService);
  listaMonedas = signal<Cripto[]>([]);

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

  ngOnInit() {
    this.bancoCripto.obtenerMonedasDeVerdad()
    .subscribe({
      next: (respuesta) => {
        // (La API de CoinCap mete todos los datos dentro de un array llamado 'data')
        const datosTraducidos = respuesta.map((item: any) => ({
          simbolo: item.symbol.toUpperCase(), // Pasamos 'btc' a 'BTC'
            nombre: item.name,
            precio: item.current_price, // Ya viene como número
            tendencia: item.price_change_percentage_24h // Ya viene como número
        }));

        this.listaMonedas.set(datosTraducidos);
      },
      error: (fallo) => {
        console.error("Algo falló:", fallo)
      }
    });
  }
}
