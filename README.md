# Full Stack App (React + Node.js + MongoDB)

A full-stack web application built with **React**, **Node.js**, **Express**, and **MongoDB** using **Mongoose** as the ORM.  
Includes a responsive multi-step onboarding wizard, admin panel for configuration, and a data view — all fully connected to a backend API.

---
##  Live Demo
[**Custom Onboarding Flow**](https://zealthy-custom-onboarding-flow.onrender.com/)

---

## Features
- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express + Mongoose
- **Database:** MongoDB Atlas (cloud-hosted)
- **API Integration:** Axios for frontend-backend communication
- **Responsive UI:** Works on desktop & mobile
- **Deployment Ready:** Optimized for Render free tier

---

## Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/snandakumar2912/Zealthy-Custom-Onboarding-Flow.git
cd Zealthy-Custom-Onboarding-Flow
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a .env file in the backend folder:
```bash
PORT=4000
MONGO_URI=your-mongodb-atlas-uri
NODE_ENV=development
```

```bash
npm start
```

Backend will be live at: http://localhost:4000

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a .env file in the frontend folder:
```bash
VITE_API_BASE_URL=http://localhost:4000
```

```bash
npm run dev
```

Frontend will be live at: http://localhost:5173

---

## API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/config`    | Get app configuration    |
| POST   | `/api/config`    | Save app configuration   |
| GET    | `/api/data`      | Get stored data          |
| POST   | `/api/data`      | Save new data            |

---

## Deployment (Render)

Follow these steps to deploy the project to **Render**:

1. **Push code to GitHub**  
   Make sure your latest backend and frontend code is committed and pushed to a GitHub repository.

2. **Use Render Blueprint**  
   - Place a `render.yaml` file in the **root** of your project.  
   - This file will define and deploy both backend and frontend services.

3. **Set Environment Variables**  
   - **Backend:** Add `MONGO_URI` in the backend's environment variables on Render.  
   - **Frontend:** Add `VITE_API_BASE_URL` in the frontend's environment variables, or configure it via `fromService` in `render.yaml`.

4. **Deploy**  
   - Click **Deploy** on Render.  
   - Your app will be live with:
     - **Backend URL:** Provided by Render after deployment.
     - **Frontend URL:** Provided by Render after deployment.

## Author
**Shruthi Nandakumar**  
Email: [shruthin2912@gmail.com](mailto:shruthin2912@gmail.com)  

