import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { provideRouter, Routes, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MONEDA_BASE, EXCHANGES } from './app.tokens';
import { apiKeyInterceptor } from './auth.interceptor';
import { errorInterceptor } from './error.interceptor';

registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      // Configuramos el internet de la app para que use nuestros interceptores.
      withInterceptors([apiKeyInterceptor, errorInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'es' },
    // Proveemos la moneda base
    { provide: MONEDA_BASE, useValue: 'eur' },

    // Descarga las rutas pesadas en segundo plano cuando el navegador esté libre.
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // Proveemos los Exchanges usando MULTI: TRUE (se irán acumulando en un array)
    { provide: EXCHANGES, useValue: 'Binance', multi: true },
    { provide: EXCHANGES, useValue: 'Coinbase', multi: true },
    { provide: EXCHANGES, useValue: 'Kraken', multi: true }
  ]
};
