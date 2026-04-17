import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  
  // Clonamos el paquete y le inyectamos la cabecera secreta
  // (CoinGecko usa la cabecera 'x-cg-demo-api-key' para sus cuentas premium)
  const peticionPremium = req.clone({
    // Comentamos esto para que coingecko nos deje acceder como usuarios gratuitos
    // setHeaders: {
    //   'x-cg-demo-api-key': 'MI_CLAVE_SUPER_SECRETA_12345'
    // }
  });

  // Imprimimos por consola para comprobar que la aduana funciona
  console.log('🕵️ Aduana: Añadiendo API Key a la petición de:', req.url);

  // Dejamos que el paquete clonado continúe su viaje
  return next(peticionPremium);
};