import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle implements OnInit {
  rutaActiva = inject(ActivatedRoute);

  // Inyectamos el Sanitizador 
  sanitizador = inject(DomSanitizer);

  idMoneda = signal<string>('');

  // --- SIMULACIÓN DE DATOS EXTERNOS ---

  // Un texto que simula venir de una base de datos atacada por un hacker
  noticiaHacker = `
    <p>El precio de esta moneda va a subir a la luna 🚀</p>
    <script>alert('¡PUM! Te he robado las contraseñas.');</script>
    <a href="javascript:alert('¡Hackeado!')" style="color: red;">Haz clic aquí para ganar 1000€</a>
  `;

  // Una URL de un iframe de YouTube. Angular la bloqueará por defecto.
  urlVideoOriginal = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  
  // Usamos un tipo especial de Angular (SafeResourceUrl) para decirle al HTML que confíe
  urlVideoSegura = signal<SafeResourceUrl | null>(null);

  ngOnInit() {
    const idDeLaUrl = this.rutaActiva.snapshot.paramMap.get('id');

    // Si encontró algo, lo guardamos en nuestro signal
    if (idDeLaUrl) {
      this.idMoneda.set(idDeLaUrl);
    }

    // BYPASS DE SEGURIDAD (El Botón de Confianza)
    // Le decimos al guardia: "Yo asumo la responsabilidad de este enlace, déjalo pasar".
    const enlaceVerificado = this.sanitizador.bypassSecurityTrustResourceUrl(this.urlVideoOriginal);
    
    // Guardamos el enlace seguro en el Signal
    this.urlVideoSegura.set(enlaceVerificado);
  }

}
