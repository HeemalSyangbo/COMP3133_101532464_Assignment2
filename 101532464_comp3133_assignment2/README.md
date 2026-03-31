# COMP 3133 Assignment 2 Frontend

Angular frontend for employee management, connected to Assignment 1 GraphQL backend.

## Student / Repository Naming

- Suggested repo name: `101532464_comp3133_assignment2`
- Course: COMP 3133 Full Stack Development II

## Implemented Features

- Signup, login, logout
- Session persistence in `localStorage`
- Route protection with auth guard
- Employee CRUD:
  - list all employees
  - add employee (with photo upload)
  - view employee details
  - update employee (with optional photo re-upload)
  - delete employee
- Search employee by designation and/or department
- Form validations and user-facing error messages
- Responsive UI using Bootstrap

## Routes

- Public:
  - `/login`
  - `/signup`
- Protected:
  - `/employees`
  - `/employees/add`
  - `/employees/:id`
  - `/employees/edit/:id`
  - `/employees/search`

## Environment Configuration

API URLs are in:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Update production values before deployment:

- `graphqlUri`
- `uploadsBaseUrl`

## Setup and Run

### 1) Backend (Assignment 1)

Run backend on port `4000`:

```bash
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm start
```

Open:

- Frontend: `http://localhost:4200`
- Backend GraphQL: `http://localhost:4000/graphql`

## Build for Production

```bash
npm run build
```

Production build uses `environment.prod.ts` via Angular file replacement.

## Submission Checklist (Assignment 2)

### Links to Submit

- Backend GitHub link
- Frontend GitHub link
- Backend deployed URL
- Frontend deployed URL

### Screenshots Required

- MongoDB data: 1 screenshot
- GraphQL API tests in Postman: 5 to 8 screenshots
- Frontend CRUD operations: 5 to 8 screenshots
- Search screen: 2 to 3 screenshots

### Final Packaging

- Remove all `node_modules` folders
- Zip project
- Upload required files and links to D2L

## Tech Stack

- Angular (standalone components, router, reactive forms)
- Apollo Angular + GraphQL
- Bootstrap 5
- Node.js / npm
