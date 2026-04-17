import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function aceptarRiesgosGuard() {
  // Inyectamos el router 
  const router = inject(Router);

  // Usamos un simple confirm() nativo del navegador
  const acepta = window.confirm('⚠️ INVERTIR EN CRIPTOMONEDAS ES PELIGROSO. ¿Aceptas el riesgo de perder tu dinero?');

  if (acepta) {
    return true; // Dejamos pasar
  } else {
    // Le denegamos la entrada y le devolvemos a la página de inicio (UrlTree)
    return router.createUrlTree(['/']);
  }
}