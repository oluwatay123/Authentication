# Backend Task API

This API allows users to register, log in, and manage organisations. Below are the endpoints and instructions for using Postman to test them.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Ensure your `.env` file is correctly configured with your Supabase and JWT settings.

## Endpoints

### Authentication

- **Register**
  - URL: `POST /api/auth/register`
  - Body:
    ```json
    {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "password": "string",
      "phone": "string"
    }
    ```
  - Success Response:
    ```json
    {
      "status": "success",
      "message": "User registered successfully",
      "data": {
        "user": {
          "id": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "phone": "string"
        },
        "organisation": {
          "orgId": "string",
          "name": "John's Organisation",
          "description": "string"
        },
        "token": "string"
      }
    }
    ```

- **Login**
  - URL: `POST /api/auth/login`
  - Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Success Response:
    ```json
    {
      "status": "success",
      "message": "User logged in successfully",
      "data": {
        "user": {
          "id": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string"
        },
        "token": "string"
      }
    }
    ```

### Organisations

- **Get All Organisations**
  - URL: `GET /api/organisations`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Success Response:
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

- **Get Organisation by ID**
  - URL: `GET /api/organisations/:orgId`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Success Response:
    ```json
    {
      "status": "success",
      "message": "Organisation retrieved successfully",
      "data": {
        "orgId": "string",
        "name": "string",
        "description": "string"
      }
    }
    ```

- **Create Organisation**
  - URL: `POST /api/organisations`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Body:
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - Success Response:
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

- **Add User to Organisation**
  - URL: `POST /api/organisations/:orgId/users`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Body:
    ```json
    {
      "userId": "string"
    }
    ```
  - Success Response:
    ```json
    {
      "status": "success",
      "message": "User added to organisation successfully"
    }
    ```

## Using Postman

1. **Register a User:**
   - Select `POST` method.
   - URL: `http://localhost:6000/api/auth/register`
   - Go to the `Body` tab, select `raw` and `JSON`, then paste the body example.

2. **Login a User:**
   - Select `POST` method.
   - URL: `http://localhost:6000/api/auth/login`
   - Go to the `Body` tab, select `raw` and `JSON`, then paste the body example.

3. **Get All Organisations:**
   - Select `GET` method.
   - URL: `http://localhost:6000/api/organisations`
   - Go to the `Headers` tab, add `Authorization` with value `Bearer <your-token>`.

4. **Get Organisation by ID:**
   - Select `GET` method.
   - URL: `http://localhost:6000/api/organisations/<orgId>`
   - Go to the `Headers` tab, add `Authorization` with value `Bearer <your-token>`.

5. **Create Organisation:**
   - Select `POST` method.
   - URL: `http://localhost:6000/api/organisations`
   - Go to the `Headers` tab, add `Authorization` with value `Bearer <your-token>`.
   - Go to the `Body` tab, select `raw` and `JSON`, then paste the body example.

6. **Add User to Organisation:**
   - Select `POST` method.
   - URL: `http://localhost:6000/api/organisations/<orgId>/users`
   - Go to the `Headers` tab, add `Authorization` with value `Bearer <your-token>`.
   - Go to the `Body` tab, select `raw` and `JSON`, then paste the body example.
