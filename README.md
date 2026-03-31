<div align="center">

# 🚀 Employee Management Frontend (Angular)

### COMP3133 — Full Stack Development II

👨‍🎓 **Student:** Heemal Syangbo  
🆔 **Student ID:** 101532464  

---

![Angular](https://img.shields.io/badge/Angular-Frontend-red)
![GraphQL](https://img.shields.io/badge/GraphQL-Integration-purple)
![Bootstrap](https://img.shields.io/badge/Bootstrap-UI-blue)
![Status](https://img.shields.io/badge/Status-Completed-success)

</div>

---

## 📌 Project Overview

This project is the **Assignment 2 frontend** for COMP3133, built using **Angular** and connected to the Assignment 1 backend via **GraphQL**.

It provides a complete employee management system with:

- Authentication (Signup/Login/Logout)
- Employee CRUD
- Search by designation or department
- Employee photo support (base64 image)
- Protected routes and form validation

---

## ⚡ Features

### 🔐 Authentication
- ✅ Signup
- ✅ Login
- ✅ JWT token handling in `localStorage`
- ✅ Logout with redirect to login
- ✅ Route guard for protected employee pages

### 👨‍💼 Employee Management
- ✅ List all employees in table format
- ✅ Add new employee
- ✅ View employee details
- ✅ Update employee details
- ✅ Delete employee
- ✅ Search by department/designation
- ✅ Employee photo add/update/display

### 🧾 Validation & UX
- ✅ Reactive Forms validations
- ✅ Visible error messages
- ✅ Responsive and clean Bootstrap UI

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| Angular | Frontend framework |
| Angular Router | Navigation/routing |
| Reactive Forms | Form handling and validation |
| HttpClient | GraphQL requests |
| GraphQL | API communication |
| Bootstrap | Styling and UI |

---

## 📁 Main Routes

- `/login`
- `/signup`
- `/employees`
- `/employees/add`
- `/employees/:id`
- `/employees/edit/:id`
- `/employees/search`

---

## 🔗 Backend Dependency (Assignment 1)

This frontend requires the Assignment 1 backend running on:

- `http://localhost:4000/graphql`

Make sure backend is started before frontend.

---

## ▶️ Run Locally

### 1) Run Backend (Assignment 1)

```bash
cd /Users/heemalsyangbo/comp3133/Assignment1/101532464_comp3133_assignment1
npm install
npm run dev
