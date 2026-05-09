# School Management API

A RESTful API built using Node.js, Express.js, and MySQL for managing school data.  
This project allows users to add new schools and retrieve a list of schools sorted by proximity based on geographical coordinates.


##  Live Demo
> ⚠️ **Note:** The backend is hosted on **Render (Free Tier)**, which goes to sleep after 15 minutes of inactivity.  
When first accessed, it may take **2–5 minutes** to wake up.
After the backend loads, everything works instantly.

Live API : [School-Management-API](https://school-management-api-hbjs.onrender.com)  
GitHub Repository : [School-Management-API](https://github.com/Jiya-Patel27/School-Management-API)
Postman Collection File : Included in GitHub repository under /postman folder



## Features

- `POST /addSchool` adds a school after validating `name`, `address`, `latitude`, and `longitude`
- `GET /listSchools` returns all schools sorted by proximity to the user's coordinates
- Automatic database bootstrap on startup when the configured MySQL user can create databases and tables
- Sample SQL script for manual database setup
- Postman collection included in `postman/School-Management-API.postman_collection.json`

## Project Structure

```text
.
|-- .env.example
|-- package.json
|-- postman/
|   `-- School-Management-API.postman_collection.json
|-- scripts/
|   `-- init-db.sql
`-- src/
    |-- app.js
    |-- server.js
    |-- config/
    |   |-- db.js
    |   `-- env.js
    |-- controllers/
    |   `-- schoolController.js
    |-- routes/
    |   `-- schoolRoutes.js
    `-- utils/
        |-- distance.js
        `-- validators.js
```

## Prerequisites

Install these before starting:

1. Node.js `18.x` or newer
2. npm `9.x` or newer
3. MySQL Server `8.x` or newer
4. Optional: Postman for API testing
5. Optional: Git if cloning from a repository

## Fresh Machine Setup Checklist

Follow these steps in order on a clean machine.

### 1. Get the source code

If you already have the project folder, move to the next step. Otherwise clone or copy the project.

```powershell
git clone https://github.com/Jiya-Patel27/School-Management-API.git
cd School-Management-API
```

### 2. Install Node.js dependencies

Run:

```powershell
npm install
```

This installs:

- `express`
- `mysql2`
- `dotenv`
- `cors`
- `morgan`
- `nodemon`

### 3. Install and start MySQL

Make sure MySQL Server is installed and running.

Typical checks:

```powershell
mysql --version
```

If MySQL is not running, start the MySQL service from Windows Services or your MySQL installer tools.

### 4. Create the environment file

Copy `.env.example` to `.env`.

PowerShell:

```powershell
Copy-Item .env.example .env
```

Then edit `.env` and set the correct values for your local MySQL installation.

Example:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
```

### 5. Understand the environment variables

You must configure these values in `.env`:

- `PORT`: the port the Node.js server listens on
- `DB_HOST`: MySQL host name, usually `127.0.0.1` for local development
- `DB_PORT`: MySQL port, usually `3306`
- `DB_USER`: MySQL username
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: database name to create or use


### 6. Start the server

Development mode with auto-reload:

```powershell
npm run dev
```

Production-style start:

```powershell
npm start
```

Expected startup output:

```text
Server is running on port 3000
```

### 7. Verify the server is reachable

Open a browser or call:

```powershell
curl http://localhost:3000/
```

Expected response:

```json
{
  "message": "School Management API is running.",
  "endpoints": {
    "addSchool": "POST /addSchool",
    "listSchools": "GET /listSchools?latitude=<value>&longitude=<value>"
  }
}
```

## API Details

### 1. Add School

- Endpoint: `POST /addSchool`
- Content-Type: `application/json`

Sample request:

```http
POST /addSchool HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "name": "Green Valley School",
  "address": "123 Main Street, Mumbai",
  "latitude": 19.076,
  "longitude": 72.8777
}
```

Sample success response:

```json
{
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "Green Valley School",
    "address": "123 Main Street, Mumbai",
    "latitude": 19.076,
    "longitude": 72.8777
  }
}
```

Sample validation error:

```json
{
  "message": "Validation failed.",
  "errors": [
    "Name is required.",
    "Latitude must be a valid number between -90 and 90."
  ]
}
```

### 2. List Schools

- Endpoint: `GET /listSchools`
- Query parameters:
  - `latitude`
  - `longitude`

Sample request:

```http
GET /listSchools?latitude=19.076&longitude=72.8777 HTTP/1.1
Host: localhost:3000
```

Sample success response:

```json
{
  "message": "Schools fetched successfully.",
  "userLocation": {
    "latitude": 19.076,
    "longitude": 72.8777
  },
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Green Valley School",
      "address": "123 Main Street, Mumbai",
      "latitude": 19.076,
      "longitude": 72.8777,
      "distanceKm": 0
    }
  ]
}
```

## Postman Collection

Import the collection file:

```text
postman/School-Management-API.postman_collection.json
```

After importing:

1. set the Postman collection.
2. run `Add School`
3. run `List Schools`

Default local value:

```text
http://localhost:3000
```

## Validation Rules

### `POST /addSchool`

- `name` must be a non-empty string
- `address` must be a non-empty string
- `latitude` must be a valid number between `-90` and `90`
- `longitude` must be a valid number between `-180` and `180`

### `GET /listSchools`

- `latitude` is required and must be between `-90` and `90`
- `longitude` is required and must be between `-180` and `180`

## Distance Sorting Logic

The `GET /listSchools` API:

1. reads all schools from MySQL
2. calculates the distance between the user location and each school using the Haversine formula
3. sorts schools in ascending order by `distanceKm`
4. returns the sorted array

## Available Scripts

```powershell
npm install
npm run dev
npm start
```

## Troubleshooting

### Access denied for MySQL user

Cause:

- the credentials in `.env` are wrong
- the MySQL user does not have enough privileges

Fix:

1. verify `DB_USER` and `DB_PASSWORD`
2. verify MySQL is running
3. use a MySQL user with create database and create table privileges, or run `scripts/init-db.sql` manually

### Port already in use

Cause:

- another process is already using the configured port

Fix:

1. change `PORT` in `.env`
2. restart the app

### MySQL command not found

Cause:

- MySQL client tools are not on the system path

Fix:

1. install MySQL client tools
2. add the MySQL `bin` directory to your system `PATH`
3. reopen the terminal

## 🧑‍💼 Author

**Name:** Jiya Patel  
**Email:** jiyapatel4892@gmail.com  
**GitHub:** [Jiya-Patel27](https://github.com/Jiya-Patel27)
**LinkedIn:** [Jiya-Patel](https://www.linkedin.com/in/jiya-patel-182325303)
