import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PortfolioStore } from './portfolio.store';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // 2. Inyectamos el Almacén Global
  store = inject(PortfolioStore);
}

