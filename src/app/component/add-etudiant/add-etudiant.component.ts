// Importation de HttpClient pour effectuer des requêtes HTTP
import { Component, Inject, OnInit } from '@angular/core';
// Importation de FormControl, FormGroup, ReactiveFormsModule, Validators pour gérer les formulaires réactifs
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Importation des modules Angular Material nécessaires
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
// Importation de CommonModule pour utiliser des directives comme ngIf
import { CommonModule } from '@angular/common';
// Importation de MatNativeDateModule pour le support des dates
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { etudiant } from '../../model/etudiant';
import { EtudiantService } from '../../service/etudiant.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  // Sélecteur du composant
  selector: 'app-add-etudiant',
  // Importation des modules nécessaires pour ce composant
  imports: [
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  // Fournisseur de l'adaptateur de date
  providers: [provideNativeDateAdapter()],
  // Chemin du template HTML du composant
  templateUrl: './add-etudiant.component.html',
  // Chemin des styles CSS du composant
  styleUrl: './add-etudiant.component.css'
})

// Définition de la classe du composant
export class AddEtudiantComponent implements OnInit {
  // Titre du formulaire
  title = 'Add Etudiant';
  dialodata: any;
  isEdit = false;

  etudForm: FormGroup;

  // Constructeur pour injecter le service EtudiantService
  constructor(
    private service: EtudiantService,
    private ref: MatDialogRef<AddEtudiantComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialisation du formulaire
    this.etudForm = new FormGroup({
      id: new FormControl<number | null>(null),
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      niveau: new FormControl('', Validators.required),
      inscription: new FormControl(new Date(), Validators.required)
    });
  }

  ngOnInit(): void {
    console.log('Données du dialogue:', this.data);
    this.dialodata = this.data;
    if (this.dialodata && this.dialodata.code) {
      this.title = 'Modifier Étudiant';
      this.isEdit = true;
      this.service.Get(this.dialodata.code).subscribe({
        next: (item) => {
          console.log('Données récupérées:', item);
          if (item) {
            this.etudForm.setValue({
              id: item.id ?? null,
              nom: item.nom,
              prenom: item.prenom,
              email: item.email,
              niveau: item.niveau,
              inscription: new Date(item.inscription)
            });
            console.log('Valeurs du formulaire définies:', this.etudForm.value);
          } else {
            this.toastr.error('Impossible de trouver les données de l\'étudiant.', 'Erreur');
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des données:', err);
          this.toastr.error('Erreur lors de la récupération des données de l\'étudiant.', 'Erreur');
        }
      });
    } else {
      this.title = 'Ajouter Étudiant';
    }
  }


  // Méthode pour enregistrer les données du formulaire
  // Méthode pour enregistrer les données du formulaire
  enregistrer() {
    // Vérifie si le formulaire est valide avant de traiter les données
    if (this.etudForm.valid) {
      let _data: etudiant = {
        // Utiliser undefined pour les nouveaux enregistrements
        id: this.isEdit ? this.etudForm.value.id?.toString() : undefined,
        nom: this.etudForm.value.nom as string,
        prenom: this.etudForm.value.prenom as string,
        niveau: this.etudForm.value.niveau as string,
        inscription: new Date(this.etudForm.value.inscription as Date),
        email: this.etudForm.value.email as string
      };

      // Observateur pour gérer les réponses des API
      const observer = {
        next: (item: any) => {
          this.toastr.success(this.isEdit ? 'Mise à jour réussie!' : 'Enregistrement réussi!', this.isEdit ? 'Mis à jour' : 'Créé');
          this.closepopup();
        },
        error: (err: any) => {
          this.toastr.error('Une erreur est survenue lors de la ' + (this.isEdit ? 'mise à jour.' : 'ajout.'), 'Erreur');
          console.error('Erreur lors de la ' + (this.isEdit ? 'mise à jour:' : 'ajout:'), err);
        },
        complete: () => {
          console.log('Opération terminée');
        }
      };

      if (this.isEdit) {
        this.service.Update(_data).subscribe(observer);
      } else {
        // Supprimer l'ID pour permettre à json-server de le générer automatiquement
        delete _data.id;
        this.service.Create(_data).subscribe(observer);
      }
    }
  }


  closepopup() {
    this.ref.close();
  }
}

