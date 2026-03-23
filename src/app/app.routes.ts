import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Detalle } from './detalle/detalle';

export const routes: Routes = [
    {
        path: '', // Si la URL está vacía (ej: localhost:4200/)
        component: Inicio
    },
    {
        path: 'moneda/:id', // Si la URL tiene un parámetro dinámico (ej: localhost:4200/moneda/BTC)
        component: Detalle
    }
];
