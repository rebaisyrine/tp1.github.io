from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Liste d'étudiants (exemples)
students = [
    {"id": 1, "name": "John", "age": 21, "grade": "A"},
    {"id": 2, "name": "Jane", "age": 22, "grade": "B"},
    {"id": 3, "name": "Jack", "age": 23, "grade": "C"}
]

# Ajouter CORS middleware pour permettre l'accès depuis Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # URL du frontend Angular
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route pour récupérer la liste des étudiants
@app.get("/students")
def get_students():
    return students

# Route pour récupérer un étudiant spécifique
@app.get("/students/{student_id}")
def get_student(student_id: int):
    for student in students:
        if student["id"] == student_id:
            return student
    return {"error": "Student not found"}

# Route pour ajouter un étudiant
@app.post("/students")
def add_student(student: dict):
    student["id"] = len(students) + 1  # Assigner un ID unique
    students.append(student)
    return student

# Route pour supprimer un étudiant
@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    global students
    students = [student for student in students if student["id"] != student_id]
    return {"message": f"Student with id {student_id} deleted"}
