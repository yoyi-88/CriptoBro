import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle implements OnInit {
  rutaActiva = inject(ActivatedRoute);
  idMoneda = signal<string>('');


  ngOnInit() {
    const idDeLaUrl = this.rutaActiva.snapshot.paramMap.get('id');

    // Si encontró algo, lo guardamos en nuestro signal
    if (idDeLaUrl) {
      this.idMoneda.set(idDeLaUrl);
    }
  }

}
