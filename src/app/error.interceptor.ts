import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

    // Dejamos que el paquete salga normal (next(req))
    // Pero le enganchamos una tubería (.pipe) para atrapar la respuesta cuando vuelva
    return next(req).pipe(

        // Si viene con un error, entramos aquí
        catchError((errorDelServidor) => {

            console.error('🚨 ADUANA DE ERRORES: ¡Hemos detectado un fallo!');

            if (errorDelServidor.status === 429) {
                alert('CoinGecko dice que te relajes. Has hecho muchas peticiones rápidas.');
            } else if (errorDelServidor.status === 404) {
                alert('La ruta de la API no existe. Revisa la URL en tu servicio.');
            } else if (errorDelServidor.status === 401) {
                // NUEVO: Manejamos el error de autorización
                alert('⛔ ¡Acceso Denegado! La API Key que enviaste es inventada (Error 401).');
            }

            // Volvemos a lanzar el error para que el componente también se entere si quiere
            return throwError(() => errorDelServidor);
        })
    );
};