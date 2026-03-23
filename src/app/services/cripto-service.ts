import { Injectable, inject } from '@angular/core';
// TODO 3: Importa HttpClient de '@angular/common/http'

import { Cripto } from '../cripto';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CriptoService {
  
  // TODO 4: Inyecta el HttpClient y guárdalo en una variable llamada 'http'
  http = inject(HttpClient);
  // Borramos los datos falsos. Ahora solo devolvemos la petición al servidor.
  obtenerMonedasDeVerdad() {
    const urlAPI = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=5&page=1';
    
    // TODO 5: Usa this.http.get<any>(urlAPI) y devuelve (return) su resultado.
    // (Pista: Retorna directamente lo que te da el get, sin suscribirte todavía).
    return this.http.get<any>(urlAPI);
    
  }
}