export interface etudiant {
  id?: string; // Rendre l'ID optionnel
  nom: string;
  prenom: string;
  niveau: string;
  inscription: Date;
  email: string;
}
