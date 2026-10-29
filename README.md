# 🎓 Student Records REST API (Node.js & Express)

A basic, beginner-friendly Node.js REST API built from scratch with **Express.js** for learning the 4 fundamental HTTP CRUD methods: **GET**, **POST**, **PUT**, and **DELETE**.

---

## 📂 Project Structure

```text
lern-ci-cd/
├── index.js          # Main Express server and route handlers
├── package.json      # Dependencies and scripts
├── Dockerfile        # Container configuration
└── .gitignore        # Ignored files (e.g. node_modules)
```

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
Or with automatic restart when files change:
```bash
npm run dev
```

The server runs at: `http://localhost:3000`

---

## 📡 The 4 CRUD Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/students` | Read / Fetch all student records |
| **GET** | `/students/:id` | Read / Fetch a single student by ID |
| **POST** | `/students` | Create / Add a new student record |
| **PUT** | `/students/:id` | Update an existing student record |
| **DELETE** | `/students/:id` | Delete a student record by ID |

---

## 🧪 Testing with cURL

Open a new terminal window and try running these commands:

### 1. GET - Fetch all students
```bash
curl -X GET http://localhost:3000/students
```

### 2. GET - Fetch student with ID = 1
```bash
curl -X GET http://localhost:3000/students/1
```

### 3. POST - Create a new student
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name": "David Miller", "age": 24, "course": "Data Science"}'
```

### 4. PUT - Update an existing student (e.g., ID = 1)
```bash
curl -X PUT http://localhost:3000/students/1 \
  -H "Content-Type: application/json" \
  -d '{"age": 21, "course": "Cybersecurity"}'
```

### 5. DELETE - Remove a student (e.g., ID = 2)
```bash
curl -X DELETE http://localhost:3000/students/2
```

---

## 🧠 What You Learned
- **`express.json()`**: Middleware to automatically parse incoming JSON request payloads into `req.body`.
- **`req.params`**: Route parameters like `:id` accessed via `req.params.id`.
- **`req.body`**: Data sent in POST and PUT requests.
- **HTTP Status Codes**:
  - `200 OK`: Request succeeded.
  - `201 Created`: Resource successfully created.
  - `400 Bad Request`: Missing or invalid input fields.
  - `404 Not Found`: Target student record does not exist.
