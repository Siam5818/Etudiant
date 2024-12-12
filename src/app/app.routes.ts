// Importation de Routes pour définir les routes de l'application
import { Routes } from '@angular/router';
// Importation du composant EtudiantComponent pour le routage
import { EtudiantComponent } from './component/etudiant/etudiant.component';

export const routes: Routes = [
  {
    // Route par défaut qui redirige vers /etudiant
    path: '',
    redirectTo: '/etudiant',
    pathMatch: 'full'
  },
  {
    // Définition de la route pour le composant EtudiantComponent
    path: 'etudiant', component: EtudiantComponent
  }
];
