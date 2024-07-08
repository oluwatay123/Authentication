Here's an expanded version of the README file for your project, focusing on how users should use Postman and configure endpoints:

---

# Project README

## Overview

This project implements backend APIs for user registration, authentication, and organization management using Node.js, Express, and Supabase.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd backend-task
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env` file in the root directory and configure the following variables:
   ```plaintext
   PORT=6000
   SUPABASE_URL=<your_supabase_url>
   SUPABASE_KEY=<your_supabase_key>
   JWT_SECRET=<your_jwt_secret>
   ```

4. **Run the Application:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:6000`.

## Endpoints

### Authentication

#### Register User

- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
  }
  ```
- **Successful Response:**
  ```json
  {
    "status": "success",
    "message": "Registration successful",
    "data": {
      "accessToken": "string",
      "user": {
        "userId": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string"
      }
    }
  }
  ```

#### Login User

- **Endpoint:** `POST /api/auth/login`
- **Description:** Log in an existing user.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Successful Response:**
  ```json
  {
    "status": "success",
    "message": "Login successful",
    "data": {
      "accessToken": "string",
      "user": {
        "userId": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string"
      }
    }
  }
  ```

### User Management

#### Get User by ID

- **Endpoint:** `GET /api/users/:id`
- **Description:** Retrieve user details by user ID.
- **Successful Response:**
  ```json
  {
    "status": "success",
    "message": "User found",
    "data": {
      "userId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string"
    }
  }
  ```

### Organization Management

#### Create Organization

- **Endpoint:** `POST /api/organisations`
- **Description:** Create a new organization.
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Successful Response:**
  ```json
  {
    "status": "success",
    "message": "Organisation created successfully",
    "data": {
      "orgId": "string",
      "name": "string",
      "description": "string"
    }
  }
  ```

#### Get All User's Organizations

- **Endpoint:** `GET /api/organisations`
- **Description:** Retrieve all organizations the logged-in user belongs to or created.
- **Successful Response:**
  ```json
  {
    "status": "success",
    "message": "Organisations retrieved successfully",
    "data": {
      "organisations": [
        {
          "orgId": "string",
          "name": "string",
          "description": "string"
        }
      ]
    }
  }
  ```

#### Get Organization by ID

- **Endpoint:** `GET /api/organisations/:orgId`
- **Description:** Retrieve a single organization record by its ID.
- **Successful Response:**
  ```json
  {
    "status": "success",
    "message": "Organisation found",
    "data": {
      "orgId": "string",
      "name": "string",
      "description": "string"
    }
  }
  ```

#### Add User to Organization

- **Endpoint:** `POST /api/organisations/:orgId/users`
- **Description:** Add a user to a specific organization.
- **Request Body:**
  ```json
  {
    "userId": "string"
  }
  ```
- **Successful Response:**
  ```json
  {
    "status": "success",
    "message": "User added to organisation successfully"
  }
  ```

---

## Using Postman

1. **Set Environment Variables:**
   - Set up a Postman environment with the following variables:
     - `base_url`: `http://localhost:6000` (or your server URL)
     - `accessToken`: Obtain from successful login or registration responses.

2. **Configure Requests:**
   - Import the provided Postman collection.
   - Set the `Authorization` header with `Bearer {{accessToken}}` for protected endpoints.
   - Replace variables (`:id`, `:orgId`, etc.) in the endpoint URLs as needed.

3. **Test Endpoints:**
   - Send requests to endpoints using Postman.
   - Verify responses for success or error messages.

4. **Handle Errors:**
   - Handle errors gracefully based on the status codes and messages provided in the responses.

---

This README should help users understand how to interact with your backend APIs using Postman, configure endpoints correctly, and manage requests effectively. Adjust paths, descriptions, and examples as needed for your specific implementation and requirements.