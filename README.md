<div align="center">
  <h1><img src="https://schedrx-client.vercel.app//favicon-new.png" width="20" height="20" alt="SchedRx Favicon">SchedRx</h1>
  <p> A <b>Full-Stack SaaS Doctor Appointment Booking System</b> built using the <b>MERN Stack</b>, with multi-level authentication, secure payments, and role-based dashboards for patients, doctors, and admins. </p>
</div>

---

# 📖 Table of Contents
- [Description](#-description)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [File Structure](#-file-structure)
- [Assets Credits](#-assets-credits)
- [Disclaimer](#-disclaimer)

---

# 📝 Description

SchedRx is a **SaaS-based doctor appointment booking system** designed to streamline the healthcare appointment process. Patients can search for doctors, book or cancel appointments, and make secure payments. Doctors can manage schedules, track earnings, and update profiles, while admins oversee doctors and appointments.

This project demonstrates:
- Real-world SaaS platform design
- Scalable **MERN architecture**
- **Multi-role authentication & access control**
- **Payment gateway integration (Razorpay)**
- Responsive UI and cloud-based media hosting
> 🚀 This application showcases my ability to build **production-level SaaS solutions** using the MERN stack.

---

# ✨ Features
- **Multi-Level Authentication & Role Management**
- 👨‍⚕️ **Doctors** – Register, view appointments, track earnings, update profiles.
- 🧑‍🤝‍🧑 **Patients** – Register, search doctors, book/cancel/reschedule appointments, view history.
- 🛠️ **Admin** – Manage doctors and appointments through a central dashboard.

- **Online Payment Integration** – Secure **Razorpay** integration for appointment booking.
- **Profile & Appointment Management** – Patients and doctors manage their data and appointments easily.
- **Cloudinary Integration** – Secure hosting for profile images and documents.
- **Responsive Dashboards** – Dedicated portals for Patients, Doctors, and Admins.

---

# 🛠 Tech Stack 

**Frontend:** React.js, Tailwind CSS, Axios
**Backend:** Node.js, Express.js, MongoDB (Mongoose)
**Authentication:** Role-based JWT Authentication
**Media Hosting:** Cloudinary 
**Deployment:** Vercel (Frontend) (Backend)

---

# Screenshots

# SchedRx client side
<img width="1899" height="916" alt="Screenshot 2025-09-15 122848" src="https://github.com/user-attachments/assets/24499958-5e25-4e75-b681-5b706f1f3c2e" />

# SchedRx Admin Panel:
<img width="1898" height="911" alt="Screenshot 2025-09-20 201644" src="https://github.com/user-attachments/assets/c0c6ed2f-bdf9-4052-b7f6-b60298764b8c" />

# Doctor's Panel:
<img width="1898" height="908" alt="Screenshot 2025-09-20 201845" src="https://github.com/user-attachments/assets/5922ae0b-df4f-4734-a98a-d0bd2f5b8bdf" />

---

# 🚀 Getting Started

Follow these steps to run the project locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/schedrx.git
cd schedrx
```
### 2️⃣ Install dependencies
```
Install backend dependencies:
cd server
npm install

Install frontend dependencies:
cd ../client
npm install

Install admin panel dependencies:
cd ../admin
npm install
```
### 3️⃣ Configure environment variables
```
Create .env files in server, client, and admin directories (see Environment Variables).
```
### 4️⃣ Run the development servers
```
Start backend:
cd server
npm run dev

Start frontend:
cd client
npm run dev

Start admin panel:
cd admin
npm run dev
```
---

# 🔐 Environment Variables

**Backend .env**
```
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
MONGODB_URI=your_mongodb_connection_string
```

**Frontend .env**
```
VITE_BACKEND_URL=http://localhost:5000
```

**Admin .env**
```
VITE_BACKEND_URL=http://localhost:5000
```

---

# 📂 File Structure
```
schedrx/
├── client/                 # Patient-facing React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   ├── context/        # React Context API
│   │   ├── hooks/          # Custom hooks
│   │   ├── assets/         # Images, icons
│   │   └── App.jsx         # Root component
│   └── package.json
│
├── admin/                  # Admin panel React app
│   ├── src/
│   │   ├── components/     # Admin dashboard components
│   │   ├── pages/          # Admin-specific pages
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/             # DB & Cloudinary setup
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth, error handling
│   ├── utils/              # Helpers & validators
│   └── server.js           # Entry point
│
├── .gitignore
└── README.md
```
---

# Assets Credits:

- https://www.pexels.com/
- https://unsplash.com/
- https://www.freepik.com/

---

# ⚠️ Disclaimer

This project is for learning and portfolio purposes only.
All assets (images, videos, logos) belong to their respective owners.
No copyright infringement is intended.
