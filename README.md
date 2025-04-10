# MusicApp Backend

## Description
MusicApp is a backend for a music storage and download system, built with Node.js, Express, TypeScript, and Sequelize. It provides user authentication, music management, and a robust logging system.

## Key Features

### Music Management
- **Music Storage**: Allows uploading music files to the system.
- **Music Download**: Users can download stored music files.
- **Music Metadata**: Information about the music is automatically extracted.

### User Authentication
- **Registration and login with JWT (JSON Web Tokens)**: Protects API routes with token-based authentication.
- **Brute Force Protection**: Uses `express-rate-limit` to limit login attempts.

### Logging
- **Winston Logging System**: Logs important system events, errors, and other useful information.

### Database Management
- **Sequelize ORM**: Interacts with the MySQL database to store information about music and users.
- **Database Migrations**: Uses `sequelize-cli` for database migrations.

## Technologies Used
- **Language:** TypeScript
- **Framework:** Express.js
- **ORM:** Sequelize
- **Database:** MySQL (configurable via `.env`)
- **Authentication:** JWT
- **Logging:** Winston

### Other Libraries:
- `bcrypt` (password hashing)
- `dotenv` (environment variables management)
- `express-rate-limit` (brute force protection)
- `music-metadata` (metadata extraction for music files)
- `multer` (file upload)

## Project Structure

```plaintext
src/
├── config/         # Database configurations
├── controller/     # Route logic
├── middleware/     # Middleware (authentication, rate limiting)
├── model/          # Sequelize models
├── routes/         # API route definitions
├── services/       # Business logic
├── shared/         # Shared utilities
│   ├── logger/     # Winston logging setup
└── server.ts       # Application entry point
```

# Environment Setup
### Install dependencies:
```bash
npm install
```

# Create a .env file in the project root with the following variables:
```bash
DB_NAME=database_name
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
DB_DIALECT=mysql
PORT=3000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

# Run database migrations:
```bash
npm run db:migrate:dev
```
# Start the server:
```bash
npm start
```

# Main Endpoints
### Authentication
```POST /account/auth/register``` - Register a new user
```POST /account/auth/login``` - User login

# Music
```POST /api/music/upload``` - Upload music

```GET /api/music/:musicId``` - Get music details

```GET /api/music/download/:musicId``` - Download music

```DELETE /api/music/:musicId``` - Delete music

# Health Check
```GET /api/health-check``` - Check server status

# Data Models
## User

Field	Type	Description
userId	UUID	Unique identifier
username	String	Username
email	String	Unique email
password	String	Hashed password
role	String	User role (e.g., Admin, User)

## Music

Field	Type	Description
musicId	UUID	Unique identifier
title	String	Music title
artist	String	Music artist
filePath	String	Path to the music file
metadata	JSON	Metadata about the music (e.g., duration, bitrate)

# Error Handling
The system uses a centralized set of errors with appropriate HTTP codes and standardized messages. The main handled errors include:

Authentication/Authorization Errors (401, 403)

Resource Not Found (404)

Data Validation Errors (400)

Internal Server Errors (500)
