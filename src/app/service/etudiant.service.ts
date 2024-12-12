// Importation de HttpClient pour effectuer des requêtes HTTP
import { HttpClient } from '@angular/common/http';
// Importation de Injectable pour déclarer le service
import { Injectable } from '@angular/core';
// Importation du modèle etudiant
import { etudiant } from '../model/etudiant';
import { Observable } from 'rxjs';

@Injectable({
  // Déclaration du service comme étant fourni à la racine de l'application
  providedIn: 'root'
})
export class EtudiantService {
  // URL de l'API pour les opérations sur les étudiants
  apiUrl = 'http://localhost:3000/etudiant';
  // Injection de HttpClient pour effectuer les requêtes HTTP
  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les étudiants
  GetAll() {
    // Effectue une requête GET à l'API pour obtenir tous les étudiants
    return this.http.get<etudiant[]>(this.apiUrl);
  }

  // Méthode pour créer un nouvel étudiant
  Create(data: etudiant) {
    // Effectue une requête POST à l'API pour créer un nouvel étudiant avec les données fournies
    return this.http.post(this.apiUrl, data);
  }

  // Méthode pour mettre à jour un étudiant existant
  Update(data: etudiant) {
    const id = data.id?.toString();
    // Effectue une requête PUT à l'API pour mettre à jour un étudiant existant avec les nouvelles données
    return this.http.put(this.apiUrl + '/' + id, data);
  }

  // Méthode pour supprimer un étudiant existant
  Delete(etudId: string) {
    // Effectue une requête DELETE à l'API pour supprimer un étudiant en utilisant son ID
    return this.http.delete(this.apiUrl + '/' + etudId);
  }
  // Méthode pour récupérer un étudiant par code
  Get(etudId: string): Observable<etudiant> {
    //console.log('Code reçu dans Get:', etudId);
    return this.http.get<etudiant>(this.apiUrl + '/' + etudId);
  }
}
