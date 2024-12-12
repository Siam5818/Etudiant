// Importation de Component, OnDestroy et OnInit pour définir un composant Angular et gérer l'initialisation et la destruction
import { Component, OnDestroy, OnInit } from '@angular/core';
// Importation de MatCardModule pour utiliser des cartes Material
import { MatCardModule } from '@angular/material/card';
// Importation de MatButtonModule pour utiliser des boutons Material
import { MatButtonModule } from '@angular/material/button';
// Importation de MatTable, MatTableDataSource et MatTableModule pour utiliser des tableaux Material
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
// Importation de MatDialog et MatDialogModule pour utiliser des boîtes de dialogue Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// Importation de AddEtudiantComponent pour l'utiliser dans la boîte de dialogue
import { AddEtudiantComponent } from '../add-etudiant/add-etudiant.component';
// Importation du modèle etudiant
import { etudiant } from '../../model/etudiant';
import { CommonModule } from '@angular/common';
// Importation du service EtudiantService pour les opérations CRUD sur les étudiants
import { EtudiantService } from '../../service/etudiant.service';
// Importation de Subscription de RxJS pour gérer les abonnements
import { Subscription } from 'rxjs';

@Component({
  // Sélecteur du composant
  selector: 'app-etudiant',
  // Importation des modules nécessaires pour ce composant
  imports: [
    MatCardModule, MatButtonModule, CommonModule, MatDialogModule, MatTableModule
  ],
  // Chemin du template HTML du composant
  templateUrl: './etudiant.component.html',
  // Chemin des styles CSS du composant
  styleUrl: './etudiant.component.css'
})
export class EtudiantComponent implements OnInit, OnDestroy {
  // Liste des étudiants
  etudList: etudiant[] = [];
  // Source de données pour le tableau
  datatable!: MatTableDataSource<etudiant>;
  // Colonnes affichées dans le tableau
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'niveau', 'inscription', 'action'];
  // Subscription pour gérer les abonnements et éviter les fuites de mémoire
  subscription = new Subscription();

  // Constructeur pour injecter MatDialog et EtudiantService
  constructor(private dialog: MatDialog, private service: EtudiantService) { }

  // Méthode appelée lors de la destruction du composant pour désabonner les abonnements
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Implémentation de l'interface OnInit
  ngOnInit(): void {
    this.GetAllEtudiant();
  }

  // Méthode pour récupérer tous les étudiants via le service EtudiantService
  GetAllEtudiant() {
    let sub = this.service.GetAll().subscribe(item => {
      this.etudList = item;
      this.datatable = new MatTableDataSource(this.etudList);
    });
    this.subscription.add(sub);
  }

  // Méthode pour ouvrir la boîte de dialogue AddEtudiantComponent
  addetudiant() {
    this.openpopup('');
  }

  DeletEtudiant(etudId: string) {
    if (confirm('Tu le souhait vraiment?')) {
      let sub = this.service.Delete(etudId).subscribe(item => {
        this.GetAllEtudiant();
      })
      this.subscription.add(sub);
    }
  }

  EditEtudiant(etudId: string) {
    this.openpopup(etudId);
  }

  openpopup(etudId: string) {
    this.dialog.open(AddEtudiantComponent, {
      width: '60%',// Largeur de la boîte de dialogue
      exitAnimationDuration: '1000ms', // Durée de l'animation de sortie
      enterAnimationDuration: '1000ms', // Durée de l'animation d'entrée
      data: {
        'code': etudId
      }
    }).afterClosed().subscribe(o => {
      this.GetAllEtudiant();
    });
  }
}
