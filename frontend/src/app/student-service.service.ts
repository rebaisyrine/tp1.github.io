// Permet de rendre le service injectable dans toute l'application
import { Injectable } from '@angular/core';
// Permet d'effectuer des requêtes HTTP vers l'API
import axios from 'axios';

// Définition de l'interface Student pour typer les données des étudiants
interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}
// Déclaration du service en tant que service injectable dans toute l'application
@Injectable({
  providedIn: 'root'
})
export class StudentService {
    // URL de l'API FastAPI pour gérer les étudiants
  private apiUrl = 'http://localhost:4200/students';

  constructor() {}

  async getStudents(): Promise<Student[]> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
      return [];
    }
  }

  async addStudent(student: Student): Promise<Student | null> {
    try {
      const response = await axios.post(this.apiUrl, student);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
      return null;
    }
  }

  async deleteStudent(id: number): Promise<number | null> {
    try {
      await axios.delete(`${this.apiUrl}/${id}`);
      console.log('Étudiant supprimé avec succès');
      return id; // Retourner l'ID supprimé
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'étudiant', error);
      return null;
    }
  }
}






















































