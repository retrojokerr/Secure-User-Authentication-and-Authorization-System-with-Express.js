# Secure Authentication System

A secure Node.js/Express.js authentication system with features like JWT authentication, role-based access control, password reset functionality, and robust security measures.

## Features

- User registration and authentication
- JWT-based token authentication
- Role-based access control (User/Admin)
- Password reset via email
- Security headers with Helmet
- Rate limiting protection
- Request logging
- MongoDB integration
- Error handling
- Email notifications

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Gmail account (for password reset emails)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/secure-auth-system.git
cd secure-auth-system
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
   Create a .env file in the root directory with the following variables:
```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/secure-auth

# JWT Configuration
JWT_SECRET=your_very_secure_secret_key_here
JWT_EXPIRATION=1h

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=no-reply@yourdomain.com

# Security Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3000
```
4. Start MongoDB:
   Ensure MongoDB is running on your system.

5. Start the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication Routes

#### Register a new user

```json
POST /api/auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "securepassword123"
}
```

#### Login

```json
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "securepassword123"
}
```

#### Forgot password

```json
POST /api/auth/forgot-password
Content-Type: application/json

{
    "email": "user@example.com"
}
```

#### Reset Password
```json
POST /api/auth/reset-password
Content-Type: application/json

{
    "token": "reset_token_from_email",
    "newPassword": "newpassword123"
}
```

### Protected Routes

#### Get User Profile
```bash
GET /api/protected/profile
Authorization: Bearer <jwt_token>
```

### Admin Access
```bash
GET /api/protected/admin
Authorization: Bearer <jwt_token>
```

## Security Features

1. Password Security
   - Passwords are hashed using `bcrypt`
   - Minimum password requirements enforced.

2. JWT Authentication
   - Tokens expire after configured time.
   - Secure token handling.

3. Security Headers (Helmet)
   - XSS Protection
   - Content security policy
   - HSTS enabled and more...

4. Rate Limiting
   - Protects against brute force attacks
   - Configurable origins
   - Secure cross-origin requests
  
## Error Handling

The system includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- Server errors

## Logging

Logs are stored in the logs directory:
- error.log: Error-level logs
- combined.log: All logs
- Console logging in development

## Testing

Run the test suite:

```bash
npm test
```

## Running Locally

1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Start MongoDB
5. Run in development mode

```shell
npm run dev
```

## Production Deployment

Additional considerations for productions:

1. Use strong secrets
2. Enable HTTPS
3. Set up proper MongoDB authentication
4. Configure secure email service
5. Set up proper logging
6. Enable rate limiting
7. Configure CORS properly

## License

This project is licensed under the MIT License - see the LICENSE file for details.
