import { Injectable, signal, computed, inject } from '@angular/core';
import { Cripto } from './cripto';
import { AuthService } from './services/auth-service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  authService = inject(AuthService);
  bd = inject(Firestore);
  // EL ESTADO CENTRAL: Un Signal con la lista de monedas favoritas.
  // En una app real, este inicializador podría leer del localStorage o de una API.
  listaFavoritos = signal<Cripto[]>([]);

  // EL ESTADO DERIVADO (computed): Calcula el número total automáticamente.
  // Los componentes no tienen que contar nada, el Store lo hace por ellos.
  totalFavoritos = computed(() => this.listaFavoritos().length);

  // Array que servirá para guardar los símbolos de las monedas y pasarlas a la base de datos
  simbolosMonedas = computed(() => this.listaFavoritos().map(moneda => moneda.simbolo));

  // LA ACCIÓN: El único método autorizado para modificar la lista.
  // Recibe una moneda. Si ya está en la lista, la quita. Si no está, la añade.
  toggleFavorito(moneda: Cripto) {
    this.listaFavoritos.update((favoritosActuales) => {
      
      const yaExiste = favoritosActuales.find(f => f.simbolo === moneda.simbolo);
      
      if (yaExiste) {
        // Si existe, la filtramos (la borramos de la lista)
        return favoritosActuales.filter(f => f.simbolo !== moneda.simbolo);
      } else {
        // Si no existe, creamos un array nuevo clonando el anterior e insertando la nueva
        return [...favoritosActuales, moneda];
      }
      
    });
    if (this.authService.estadoLogin()) {
      const idUsuario = this.authService.estadoLogin()?.uid;
      const referencia = doc(this.bd, `usuarios/${idUsuario}`);
      setDoc(referencia, {monedasFavoritas: this.simbolosMonedas()})

    }
  }

  // UNA FUNCIÓN DE UTILIDAD: Para saber si una moneda concreta es favorita y pintar la estrella
  esFavorita(simbolo: string): boolean {
    return this.listaFavoritos().some(f => f.simbolo === simbolo);
  }
}