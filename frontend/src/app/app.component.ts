import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from './student-service.service';

interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'frontend';
  students: Student[] = [];
  newStudent: Student = { id: 0, name: '', age: 0, grade: '' };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  async loadStudents() {
    this.students = await this.studentService.getStudents();
  }

  async addStudent() {
    const student = await this.studentService.addStudent(this.newStudent);
    if (student) {
      this.students.push(student);
      this.newStudent = { id: 0, name: '', age: 0, grade: '' };
    }
  }

  async deleteStudent(id: number) {
    const deletedId = await this.studentService.deleteStudent(id);
    if (deletedId !== null) { // Vérifier si la suppression a réussi
      this.students = this.students.filter(student => student.id !== deletedId);
    }
  }
}
