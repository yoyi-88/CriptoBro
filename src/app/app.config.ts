import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http'; 

// Importar locales aquí también si prefieres
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Inicio } from './inicio/inicio';
import { Detalle } from './detalle/detalle';
registerLocaleData(localeEs, 'es');



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'es' }
  ]
};
