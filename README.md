# 🎓 Student Management System

A web-based Student Record Management System built with HTML, CSS, and a Node.js REST API backend. It allows users to insert, search, update, and delete student records stored in a local JSON file.

---

## 📸 Preview

The system provides a clean card-based interface with the following services:

| Service | Description |
|---|---|
| Insert a Student | Add a new student record to the system |
| Show All Students | Retrieve and display all student records |
| Find Student by SID | Search student details using Student ID |
| Find by First Name | Search students using their first name |
| Find by Last Name | Search students using their last name |
| Find by Email | Retrieve student details using email |
| Find by City | Search students by nearest city |
| Find by Course | Search students enrolled in a course |
| Find by Guardian | Search students using guardian name |
| Update by SID | Update student details using Student ID |
| Update by First Name | Update student details using first name |
| Delete by SID | Delete a student record using Student ID |

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS
- **Backend:** Node.js, Express.js
- **Storage:** JSON file (`students.json`)
- **Other:** CORS

---

## 📁 Project Structure

```
Student Management/
├── CSS/
│   ├── API.css
│   ├── detail.css
│   ├── findfirst.css
│   └── update.css
├── Images/
│   ├── homebg.jpg
│   ├── lib2.jpg
│   └── uni.jpeg
├── server/
│   ├── package.json
│   ├── server.js
│   └── students.json
├── all.html
├── API.html
├── insert.html
├── findsid.html
├── findfirst.html
├── findlast.html
├── findemail.html
├── findcity.html
├── findcourse.html
├── findguardian.html
├── UpdateSid.html
├── Updatefirst.html
├── deletesid.html
└── detail.html
```

---

## 🚀 How to Run

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Step 1 — Clone or Download the Project

**Clone via Git:**
```bash
git clone https://github.com/ashanrajapaksha72-hub/Student-Managment-System.git
```

Or download the ZIP from GitHub and extract it.

### Step 2 — Navigate to the Server Folder

```bash
cd "Student Management/server"
```

### Step 3 — Install Dependencies

```bash
npm install
```

This will install `express` and `cors` from the `package.json`.

### Step 4 — Start the Server

```bash
node server.js
```

You should see:
```
✅ Student Portal API running at http://localhost:3000
```

### Step 5 — Open the Frontend

Open any of the HTML files in your browser. For example, open `all.html` to see the full service menu.

> ⚠️ Keep the terminal running while using the app. Closing it will stop the server.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/students` | Add a new student |
| GET | `/students` | Get all students |
| GET | `/students/sid/:id` | Find student by SID |
| GET | `/students/firstname/:name` | Find by first name |
| GET | `/students/lastname/:name` | Find by last name |
| GET | `/students/email/:email` | Find by email |
| GET | `/students/nearcity/:city` | Find by city |
| GET | `/students/course/:course` | Find by course |
| GET | `/students/guardian/:name` | Find by guardian |
| PUT | `/students/sid/:id` | Update by SID |
| PUT | `/students/firstname/:name` | Update by first name |
| DELETE | `/students/sid/:id` | Delete by SID |

---

## 🛑 Stopping the Server

In the terminal where the server is running, press:

```
Ctrl + C
```

Or from another terminal:

```bash
# Windows
taskkill /IM node.exe /F

# Mac/Linux
pkill -f node
```

---

## 👨‍💻 Author

**Ashan Rajapaksha**  
GitHub: [@ashanrajapaksha72-hub](https://github.com/ashanrajapaksha72-hub)

**Theekshana Illangakoon**  
GitHub: [@Theekshana007](https://github.com/Theekshana007)

**Heshan Wijenayaka**  
GitHub: [@Heshan Wijenayaka](https://github.com/heshkaavi)
