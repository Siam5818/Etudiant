// Importation de Component pour définir un composant Angular
import { Component } from '@angular/core';
// Importation de RouterOutlet pour gérer le routage des composants
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  // Sélecteur du composant
  selector: 'app-root',
  // Importation des modules nécessaires pour ce composant
  imports: [
    RouterOutlet
  ],
  // Chemin du template HTML du composant
  templateUrl: './app.component.html',
  // Chemin des styles CSS du composant
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Titre de l'application
  title = 'etudiant';
  // Injection de ToastrService
  constructor(private toastr: ToastrService) { }
}
