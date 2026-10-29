const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory data store for student records (simple array for learning)
let students = [
  { id: 1, name: "Alice Johnson", age: 20, course: "Computer Science" },
  { id: 2, name: "Bob Smith", age: 22, course: "Mechanical Engineering" },
  { id: 3, name: "Charlie Brown", age: 21, course: "Information Technology" }
];

// Helper / Root route: displays available endpoints and instructions
app.get('/', (req, res) => {
  res.json({
    message: "🎓 Student Records API (Built with Express.js for Learning)",
    endpoints: {
      "GET /students": "Get all student records",
      "GET /students/:id": "Get a single student record by ID",
      "POST /students": "Create a new student record (JSON body: { name, age, course })",
      "PUT /students/:id": "Update an existing student record (JSON body: { name, age, course })",
      "DELETE /students/:id": "Delete a student record by ID"
    }
  });
});

// -------------------------------------------------------------
// 1. GET - Retrieve all student records (or single student by ID)
// -------------------------------------------------------------
app.get('/students', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// -------------------------------------------------------------
// 2. POST - Create a new student record
// -------------------------------------------------------------
app.post('/students', (req, res) => {
  const { name, age, course } = req.body;

  // Basic validation: ensure required fields are present
  if (!name || !age || !course) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'name', 'age', and 'course' in the request body"
    });
  }

  // Auto-generate new unique ID
  const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  const newStudent = {
    id: newId,
    name,
    age: Number(age),
    course
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student record created successfully",
    data: newStudent
  });
});

// -------------------------------------------------------------
// 3. PUT - Update an existing student record by ID
// -------------------------------------------------------------
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(s => s.id === studentId);

  // If student does not exist, return 404 Not Found
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found`
    });
  }

  const { name, age, course } = req.body;

  // Update provided fields
  if (name !== undefined) students[studentIndex].name = name;
  if (age !== undefined) students[studentIndex].age = Number(age);
  if (course !== undefined) students[studentIndex].course = course;

  res.status(200).json({
    success: true,
    message: `Student with ID ${studentId} updated successfully`,
    data: students[studentIndex]
  });
});

// -------------------------------------------------------------
// 4. DELETE - Remove a student record by ID
// -------------------------------------------------------------
app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(s => s.id === studentId);

  // If student does not exist, return 404 Not Found
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found`
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: `Student with ID ${studentId} deleted successfully`,
    data: deletedStudent
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Student API Server running at http://localhost:${PORT}`);
  console.log(`💡 Try visiting http://localhost:${PORT}/students in your browser`);
});
