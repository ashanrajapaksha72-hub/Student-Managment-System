const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'students.json');

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Helper: read students from JSON file ──
function readStudents() {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

// ── Helper: write students to JSON file ──
function writeStudents(students) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2), 'utf8');
}


//  1. INSERT a Student  →  POST /students

app.post('/students', (req, res) => {
  const students = readStudents();
  const { SID, FirstName, LastName, Email, Phone, DateOfBirth, Gender, Address, NearCity, Course, EnrollmentDate, Guardian, GuardianPhone  } = req.body;

  // Validate required fields
  if (!SID || !FirstName || !LastName || !Email || !Phone || !DateOfBirth || !Gender) {
    return res.status(400).json({ success: false, message: 'SID, FirstName, LastName, Email, Phone, DateOfBirth and Gender are required.' });
  }

  // Check duplicate SID
  const exists = students.find(s => s.SID === Number(SID));
  if (exists) {
    return res.status(409).json({ success: false, message: `Student with SID ${SID} already exists.` });
  }

  const newStudent = {
  SID: Number(SID),
  FirstName,
  LastName,
  Email,
  Phone: Phone || '',
  DateOfBirth: DateOfBirth || '',
  Gender: Gender || '',
  Address: Address || '',
  NearCity: NearCity || '',
  Course: Course,
  EnrollmentDate: EnrollmentDate || '',
  Guardian: Guardian || '',
  GuardianPhone: GuardianPhone || '',
};

  students.push(newStudent);
  writeStudents(students);
  res.status(201).json({ success: true, message: 'Student inserted successfully.', data: newStudent });
});


//  2. SHOW ALL Students  →  GET /students

app.get('/students', (req, res) => {
  const students = readStudents();
  res.json({ success: true, count: students.length, data: students });
});


//  3. FIND by SID  →  GET /students/sid/:id

app.get('/students/sid/:id', (req, res) => {
  const students = readStudents();
  const student = students.find(s => s.SID === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ success: false, message: `No student found with SID ${req.params.id}.` });
  }
  res.json({ success: true, data: student });
});


//  4. FIND by First Name  →  GET /students/firstname/:name

app.get('/students/firstname/:name', (req, res) => {
  const students = readStudents();
  const results = students.filter(s =>
    s.FirstName.toLowerCase() === req.params.name.toLowerCase()
  );
  if (results.length === 0) {
    return res.status(404).json({ success: false, message: `No students found with first name "${req.params.name}".` });
  }
  res.json({ success: true, count: results.length, data: results });
});


//  5. FIND by Last Name  →  GET /students/lastname/:name

app.get('/students/lastname/:name', (req, res) => {
  const students = readStudents();
  const results = students.filter(s =>
    s.LastName.toLowerCase() === req.params.name.toLowerCase()
  );
  if (results.length === 0) {
    return res.status(404).json({ success: false, message: `No students found with last name "${req.params.name}".` });
  }
  res.json({ success: true, count: results.length, data: results });
});


//  6. FIND by Email  →  GET /students/email/:email

app.get('/students/email/:email', (req, res) => {
  const students = readStudents();
  const student = students.find(s =>
    s.Email.toLowerCase() === req.params.email.toLowerCase()
  );
  if (!student) {
    return res.status(404).json({ success: false, message: `No student found with email "${req.params.email}".` });
  }
  res.json({ success: true, data: student });
});


//  7. FIND by City  →  GET /students/city/:city

app.get('/students/nearcity/:city', (req, res) => {
  const students = readStudents();
  const results = students.filter(s =>
    s.NearCity.toLowerCase() === req.params.city.toLowerCase()
  );
  if (results.length === 0) {
    return res.status(404).json({ success: false, message: `No students found near city "${req.params.city}".` });
  }
  res.json({ success: true, count: results.length, data: results });
});


//  8. FIND by Course  →  GET /students/course/:course

app.get('/students/course/:course', (req, res) => {
  const students = readStudents();
  const results = students.filter(s =>
    s.Course.toLowerCase() === req.params.course.toLowerCase()
);
  if (results.length === 0) {
    return res.status(404).json({ success: false, message: `No students found in course "${req.params.course}".` });
  }
  res.json({ success: true, count: results.length, data: results });
});


//  9. FIND by Guardian  →  GET /students/guardian/:name

app.get('/students/guardian/:name', (req, res) => {
  const students = readStudents();
  const results = students.filter(s =>
    s.Guardian.toLowerCase().includes(req.params.name.toLowerCase())
  );
  if (results.length === 0) {
    return res.status(404).json({ success: false, message: `No students found with guardian "${req.params.name}".` });
  }
  res.json({ success: true, count: results.length, data: results });
});


//  10. UPDATE by SID  →  PUT /students/sid/:id

app.put('/students/sid/:id', (req, res) => {
  const students = readStudents();
  const index = students.findIndex(s => s.SID === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: `No student found with SID ${req.params.id}.` });
  }

  // Merge existing data with updated fields
  students[index] = { ...students[index], ...req.body, SID: students[index].SID };
  writeStudents(students);
  res.json({ success: true, message: 'Student updated successfully.', data: students[index] });
});


//  11. UPDATE by First Name  →  PUT /students/firstname/:name

app.put('/students/firstname/:name', (req, res) => {
  const students = readStudents();
  const index = students.findIndex(s =>
    s.FirstName.toLowerCase() === req.params.name.toLowerCase()
  );
  if (index === -1) {
    return res.status(404).json({ success: false, message: `No student found with first name "${req.params.name}".` });
  }

  students[index] = { ...students[index], ...req.body, SID: students[index].SID };
  writeStudents(students);
  res.json({ success: true, message: 'Student updated successfully.', data: students[index] });
});


//  12. DELETE by SID  →  DELETE /students/sid/:id

app.delete('/students/sid/:id', (req, res) => {
  const students = readStudents();
  const index = students.findIndex(s => s.SID === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: `No student found with SID ${req.params.id}.` });
  }

  const deleted = students.splice(index, 1);
  writeStudents(students);
  res.json({ success: true, message: `Student with SID ${req.params.id} deleted successfully.`, data: deleted[0] });
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`✅ Student Portal API running at http://localhost:${PORT}`);
  console.log(`   Endpoints ready:`);
  console.log(`   POST   /students`);
  console.log(`   GET    /students`);
  console.log(`   GET    /students/sid/:id`);
  console.log(`   GET    /students/firstname/:name`);
  console.log(`   GET    /students/lastname/:name`);
  console.log(`   GET    /students/email/:email`);
  console.log(`   GET    /students/nearcity/:city`);
  console.log(`   GET    /students/course/:course`);
  console.log(`   GET    /students/guardian/:name`);
  console.log(`   PUT    /students/sid/:id`);
  console.log(`   PUT    /students/firstname/:name`);
  console.log(`   DELETE /students/sid/:id`);
});
