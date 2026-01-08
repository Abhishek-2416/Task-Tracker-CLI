# Task Tracker CLI

A simple **command-line task management application** built with **Node.js**.
This CLI allows you to create, update, delete, and manage tasks using a local JSON file as storage.

The project is intentionally built **without frameworks** (except `commander` for CLI parsing) to demonstrate core Node.js concepts such as file handling, argument parsing, and data persistence.

---

## ✨ Features

* Add new tasks
* Update existing tasks
* Delete tasks
* Mark tasks as **in progress** or **done**
* List all tasks
* List tasks by status:

  * `todo`
  * `in-progress`
  * `done`
* Persistent storage using a local JSON file (`tasks.json`)
* Graceful error handling for invalid input

---

## 🛠 Tech Stack

* **Node.js**
* **Commander.js** (for CLI argument parsing)
* Native Node.js modules:

  * `fs`
  * `path`

---

## 📁 Project Structure

```
Task-Tracker-CLI/
├── index.js        # Main CLI application
├── tasks.json      # Local JSON file used as storage
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd Task-Tracker-CLI
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Make the CLI available globally (optional but recommended)

```bash
npm link
```

After this, you can use the command directly as:

```bash
task-cli <command>
```

(Otherwise, you can run it using `node index.js <command>`.)

---

## 📌 Usage

### ➕ Add a task

```bash
task-cli add "Buy groceries"
```

**Output**

```
Buy groceries added successfully
```

---

### ✏️ Update a task

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

---

### 🗑 Delete a task

```bash
task-cli delete 1
```

---

### ⏳ Mark task as in progress

```bash
task-cli mark-in-progress 1
```

---

### ✅ Mark task as done

```bash
task-cli mark-done 1
```

---

### 📋 List all tasks

```bash
task-cli list
```

---

### 📂 List tasks by status

```bash
task-cli list todo
task-cli list in-progress
task-cli list done
```

---

## 🧾 Task Data Model

Each task stored in `tasks.json` has the following structure:

```json
{
  "id": 1,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": "2026-01-08T10:30:00.000Z",
  "updatedAt": "2026-01-08T10:30:00.000Z"
}
```

### Field Explanation

* **id**: Unique numeric identifier
* **description**: Short task description
* **status**: `todo | in-progress | done`
* **createdAt**: Timestamp when task was created
* **updatedAt**: Timestamp when task was last modified

---

## ⚠️ Error Handling

The application handles common edge cases gracefully:

* Invalid task IDs
* Task not found
* Invalid status values
* Corrupted or missing `tasks.json` file
* Non-numeric IDs

Helpful error messages are displayed without crashing the application.

---

## 🎯 Design Decisions

* Tasks are stored in a **JSON array** for simplicity and transparency.
* IDs are generated dynamically as `max(existingId) + 1`.
* File reads and writes are centralized using helper functions.
* Commands modify data in memory and persist changes only when valid.

---

## 📚 Learning Outcomes

This project demonstrates:

* Building a CLI tool with Node.js
* Using positional arguments
* Working with the filesystem
* Structuring command handlers cleanly
* Handling real-world edge cases
* Designing simple but maintainable application logic

---

## 🧑‍💻 Author

**Abhishek Alimchandani**

---

## 📜 License

This project is open for learning and personal use.
Feel free to fork, modify, and improve it.

---

✔️ **Project Complete.**
https://roadmap.sh/projects/task-tracker