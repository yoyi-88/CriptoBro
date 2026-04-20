import { TestBed } from '@angular/core/testing';
// 1. Importamos las herramientas modernas de testing HTTP
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CriptoService } from './cripto-service';
import { MONEDA_BASE } from '../app.tokens';

// 'describe' agrupa todas las pruebas de este servicio
describe('CriptoService (El Banco)', () => {
  let servicio: CriptoService;
  let inspectorHttp: HttpTestingController;

  // 'beforeEach' se ejecuta ANTES de cada prueba. Aquí preparamos el laboratorio.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CriptoService,
        provideHttpClient(),
        provideHttpClientTesting(), // ¡Vital! Esto apaga el internet real y enciende el "doble de acción"
        { provide: MONEDA_BASE, useValue: 'eur' } // Le damos su token necesario
      ]
    });

    // Inyectamos las herramientas que vamos a usar
    servicio = TestBed.inject(CriptoService);
    inspectorHttp = TestBed.inject(HttpTestingController);
  });

  // 'afterEach' se ejecuta DESPUÉS de cada prueba.
  afterEach(() => {
    // Verificamos que no se nos haya quedado ninguna petición HTTP colgando sin responder
    inspectorHttp.verify();
  });

  // 'it' es la prueba en sí. Describe qué debería hacer el código.
  it('debería mapear los datos de CoinGecko a nuestro formato Cripto', () => {
    
    // 1. PREPARACIÓN (Arrange): Creamos la respuesta "cruda" que simulará enviar CoinGecko
    const respuestaFalsaDeCoinGecko = [
      {
        symbol: 'btc',
        name: 'Bitcoin',
        current_price: 60000,
        price_change_percentage_24h: 5.5
      }
    ];

    // 2. ACCIÓN (Act): Llamamos a nuestro método y nos suscribimos
    servicio.obtenerMonedasDeVerdad().subscribe(datosLimpios => {
      
      // 3. AFIRMACIONES (Assert): Comprobamos que el servicio hizo bien su trabajo
      expect(datosLimpios.length).toBe(1);
      
      // ¿Transformó 'btc' a mayúsculas ('BTC') como le dijimos en el map?
      expect(datosLimpios[0].simbolo).toBe('BTC'); 
      
      // ¿Mantuvo el precio bien?
      expect(datosLimpios[0].precio).toBe(60000);
    });

    // 4. EL ENGAÑO: Le decimos al inspector HTTP que busque la petición que acaba de hacer el servicio
    // y la responda con nuestros datos falsos.
    const peticion = inspectorHttp.expectOne(req => req.url.includes('api.coingecko.com'));
    
    // Aseguramos que hizo una petición GET
    expect(peticion.request.method).toBe('GET');
    
    // Respondemos (flush) a la petición con nuestros datos inventados.
    // ESTO dispara el bloque 'subscribe' de arriba al instante.
    peticion.flush(respuestaFalsaDeCoinGecko);
    
  });
});