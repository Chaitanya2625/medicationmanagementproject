# 💊 Medication Management System

A full-stack web application to help patients manage their medication schedule and allow caretakers to monitor patient adherence.

## 🔧 Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** SQLite (via better-sqlite3)
- **Auth:** Token-based (simple role-based access)
- **UI Icons:** @heroicons/react

---

## ✨ Features

### 👤 Patients
- Register & login
- Add medications (name, dosage, frequency)
- Mark medications as taken (with optional photo proof)
- View adherence calendar (green/red dots)

### 🧑‍⚕️ Caretakers
- View all registered patients
- Monitor medication streak and adherence %
- View per-patient adherence calendar

---

## 📁 Project Structure

medication-management-project/
├── backend/
│ ├── index.js # Express server
│ ├── db.js # SQLite connection
│ └── routes/
│ ├── patients.js # Patient-related APIs
│ └── caretaker.js # Caretaker dashboard APIs
├── frontend/
│ ├── App.jsx # Main frontend app
│ ├── components/ # MedForm, MedList, Dashboards
│ └── context/AuthContext.js
└── README.md

yaml
Copy
Edit

---

## 🚀 Setup Instructions

### 1️⃣ Backend

```bash
cd backend
npm install
node index.js
Runs on http://localhost:3001

Make sure db.js initializes tables: users, medications, med_history

2️⃣ Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Runs on http://localhost:5173

📡 Key API Routes
Method	Endpoint	Purpose
GET	/api/patients/:id/adherence	Fetch patient's calendar data
GET	/api/caretaker/patients	List patients with metrics
POST	/api/medications	Add new medication
PUT	/api/medications/:id/take	Mark dose taken (photo proof)

🧪 To Do (Next)
 Add reminders with n8n

 Add Vitest unit tests

 File upload validation

 Real adherence streak logic

👨‍💻 Author
Made with ❤️ by Duvvala Chaitanya

📜 License
Licensed under the MIT License

yaml
Copy
Edit

---

Would you like me to:

- Save this into a file and upload?
- Add GitHub setup instructions?
- Or turn this into a PDF for offline use?

Let me know!
