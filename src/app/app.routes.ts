import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { aceptarRiesgosGuard } from './auth.guard';


export const routes: Routes = [
    {
        path: '', // Si la URL está vacía (ej: localhost:4200/)
        component: Inicio
    },
    {
        path: 'moneda/:id', // Si la URL tiene un parámetro dinámico (ej: localhost:4200/moneda/BTC)
        // Lazy loading
        loadComponent: () => import('./detalle/detalle').then(m => m.Detalle),

        // Seguridad Activada
        canActivate: [aceptarRiesgosGuard]
    }
];
