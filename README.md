# Notes App (MERN Stack)

A simple notes-taking web application built with the **MERN stack** (MongoDB, Express, React, Node.js).  
It allows users to register, log in, and manage their personal notes with category support.

---

## Features

- User authentication (Sign up / Login)
- Create, edit, and delete notes
- Organize notes by categories
- Fully functional backend with MongoDB
- Responsive frontend built with React

---

## Project Structure

```
Notes-App-MERN/
├── db/                         # Backend (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   └── noteController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Note.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── categories.js
│   │   └── notes.js
│   └── server.js
│
├── front-end/                 # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Account.js
│   │   │   ├── CreateCategory.js
│   │   │   ├── CreateNote.js
│   │   │   ├── EditNoteDialog.js
│   │   │   ├── Login.js
│   │   │   ├── NoteCard.js
│   │   │   ├── Notes.js
│   │   │   ├── SideNavBar.js
│   │   │   └── Signup.js
│   │   ├── App.css
│   │   ├── App.js
│   │   └── theme.js
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vinodhariharan/Notes-App-MERN.git
cd Notes-App-MERN
```

### 2. Setup the Backend

```bash
cd db
npm install
# Add your MongoDB URI in .env file as MONGO_URI
npm start
```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000)  
The backend will run on [http://localhost:5000](http://localhost:5000)

---

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT

---

## Notes

- Make sure MongoDB is running locally or provide a valid MongoDB Atlas connection string.
- CORS and proxy settings may be needed to connect frontend to backend locally.

