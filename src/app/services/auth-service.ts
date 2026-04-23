import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  provider = new GoogleAuthProvider();
  estadoLogin = toSignal(authState(this.auth));

  loginConGoogle() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        console.log('Login realizado con éxito:', result)
      }).catch((error) => {
        console.error('Error: ', error)
      });
  }

  logout() {
    signOut(this.auth)
    .then(() => console.log('Logout realizado correctamente'))
    .catch((error) => console.error('Error: ', error))
  }
}
