import { InjectionToken } from '@angular/core';

// Token para la moneda base de la aplicación (un simple texto)
export const MONEDA_BASE = new InjectionToken<string>('MONEDA_BASE');

// Token para una lista de Mercados/Exchanges soportados (un array de textos gracias a multi:true)
export const EXCHANGES = new InjectionToken<string[]>('EXCHANGES');

// Token para una función experimental (Premium)
export const MODO_OSCURO = new InjectionToken<boolean>('MODO_OSCURO');