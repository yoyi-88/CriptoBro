import { Injectable, inject } from '@angular/core';
// TODO 3: Importa HttpClient de '@angular/common/http'

import { HttpClient, provideHttpClient } from '@angular/common/http';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriptoService {
  
  // TODO 4: Inyecta el HttpClient y guárdalo en una variable llamada 'http'
  http = inject(HttpClient);
  // Borramos los datos falsos. Ahora solo devolvemos la petición al servidor.
  obtenerMonedasDeVerdad() {
    const urlAPI = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=5&page=1';
    
    return this.http.get<any[]>(urlAPI).pipe(
      // El primer 'map' es de RxJS (intercepta la respuesta del servidor)
      // El segundo 'map' es de JavaScript (recorre el array de monedas)
      map(respuesta => respuesta.map(item => ({
        simbolo: item.symbol.toUpperCase(),
        nombre: item.name,
        precio: item.current_price,
        tendencia: item.price_change_percentage_24h
      })))
    );
    
  }
}