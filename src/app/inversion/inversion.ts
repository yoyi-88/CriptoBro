import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';

// Si escriben menos de 3 letras, falla.
function validarSimbolo(control: AbstractControl) {
  const valor = control.value;
  if (valor && valor.length < 3) {
    return { simboloInvalido: true }; // Error
  }
  return null; // Todo OK
}

@Component({
  selector: 'app-inversion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inversion.html',
  styleUrl: './inversion.css',
})
export class Inversion {
  // El Secretario
  fb = inject(FormBuilder);

  // CONSTRUIMOS EL ARCHIVADOR (FormGroup)
  formularioInversion = this.fb.group({
    
    // Un campo simple con 2 validadores (el de Angular y el nuestro)
    simbolo: ['', [Validators.required, validarSimbolo]],
    
    // El cajón expandible (FormArray). Lo iniciamos con una fila por defecto.
    objetivosVenta: this.fb.array([
      this.fb.group({ precioTarget: ['', Validators.required] })
    ])

  });

  // EL ATAJO (Getter) PARA EL CAJÓN EXPANDIBLE
  get objetivos() {
    return this.formularioInversion.get('objetivosVenta') as FormArray;
  }

  // FUNCIÓN PARA AÑADIR FILAS DINÁMICAMENTE
  aniadirObjetivo() {
    // Empujamos una nueva "carpeta" vacía dentro del cajón
    this.objetivos.push( this.fb.group({ precioTarget: ['', Validators.required] }) );
  }

  // FUNCIÓN AL ENVIAR EL FORMULARIO
  guardarPlan() {
    if (this.formularioInversion.valid) {
      console.log('¡Plan guardado con éxito!', this.formularioInversion.value);
      alert('Plan guardado. Mira la consola (F12)');
      
      // Reseteamos el formulario
      this.formularioInversion.reset();
    } else {
      // Forzamos a que se muestren los errores rojos si intentan enviar vacío
      this.formularioInversion.markAllAsTouched(); 
    }
  }
}
