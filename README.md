# Medoc Backend API

This is the backend system for the Medoc application, designed for managing **sample collections** in the healthcare sector. It includes features for hospital onboarding, agent management, and sample collection tracking with real-time status updates.

## 🚀 Tech Stack

- **Node.js** with **TypeScript**
- **Express.js** – API server
- **MongoDB** with **Mongoose** – Database
- **dotenv** – Environment variable management
- **bcryptjs** – Password hashing
- **jsonwebtoken** – Token-based authentication

---

## 🔁 System Workflow

1. **Hospitals** register themselves.
2. **Agents** sign up and log in using email/password.
3. **Hospitals** create **sample collection tasks**, assigning them to agents.
4. **Agents** update the sample status as:
   - **Collected**
   - **Delayed**

---

## 📦 Models Overview

### 🏥 Hospital

- `name`: Name of the hospital
- `address`: Hospital address

### 👨‍🔬 Agent

- `name`: Agent's name
- `email`: Unique email
- `phone`: Phone Number
- `password`: Hashed password

### 🧪 Sample

- `hospital`: Reference to Hospital
- `agent`: Reference to Agent
- `patientName`: Name of the patient
- `scheduledTime`: Sample collection schedule
- `status`: `"Pending" | "Collected" | "Delayed"` (Default: `Pending`)

---

## 🔐 Auth Endpoints

### `POST /api/auth/register`
Register a new agent  
**Body:**
```json
{
  "name": "Shinkhal",
  "email": "shinkhal@example.com",
  "phone": "1234567890"
  "password": "securepassword"
}
````

### `POST /api/auth/login`

Login an agent and receive JWT token
**Body:**

```json
{
  "email": "shinkhal@example.com",
  "password": "securepassword"
}
```

---

## 🏥 Hospital Endpoints

### `POST /api/hospitals`

Create a new hospital
**Body:**

```json
{
  "name": "LPU Hospital",
  "address": "Phagwara, Punjab"
}
```

### `GET /api/hospitals`

Get all registered hospitals

---

## 👨‍🔬 Agent Endpoints

### `GET /api/agents`

Get all agents

---

## 🧪 Sample Endpoints

### `POST /api/samples`

Create a new sample
**Body:**

```json
{
  "hospital": "hospitalId",
  "agent": "agentId",
  "patientName": "XYZ",
  "scheduledTime": "06-08-2025 11:00"
}
```

### `GET /api/samples`

Get all samples

### `GET /api/samples/agent/:agentId`

Get all samples assigned to an agent

### `PATCH /api/samples/:id/collected`

Mark a sample as **collected**

### `PATCH /api/samples/:id/delayed`

Mark a sample as **delayed**

---

## 🔐 Authorization

Protected routes require a **Bearer Token** (JWT) in headers:

```
Authorization: Bearer <your_token>
```

---

## 🧪 Sample `.env` File

```
PORT=5000
MONGO=mongodb://localhost:27017/medoc
JWT_SECRET=your_jwt_secret_key
```

---

## 🧱 Folder Structure

```
├── config/
│   └── db.ts               # DB connection
├── controllers/            # All controllers
├── models/                 # Mongoose schemas
├── routes/                 # API route files
├── middleware/
│   └── auth.ts             # Auth middleware
├── server.ts               # Entry point
└── README.md               # You're here!
```

