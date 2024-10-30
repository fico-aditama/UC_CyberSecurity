# UC Cybersecurity Implementation

https://youtu.be/YWuGvHDY7jg

Repository ini berisi implementasi untuk dua sistem keamanan:
1. RBAC & ABAC Access Control System
2. Google OAuth 2.0 Authentication System

## Table of Contents
- [Soal 1: RBAC & ABAC System](#soal-1-rbac--abac-system)
  - [Features](#features)
  - [User Attributes](#user-attributes)
  - [Access Policies](#access-policies)
  - [Installation & Setup](#installation--setup)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Testing](#testing)
- [Soal 2: Google OAuth 2.0](#soal-2-google-oauth-20)
  - [Features](#features-1)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup-1)
  - [Google OAuth Setup](#google-oauth-setup)
  - [Project Structure](#project-structure)
  - [Routes](#routes)
  - [Testing](#testing-1)

## Soal 1: RBAC & ABAC System

### Features
- Role-Based Access Control (RBAC)
- Attribute-Based Access Control (ABAC)
- Multiple department support
- Security clearance levels
- Seniority-based access control
- Express.js middleware for access control

### User Attributes
```javascript
{
  department: ['IT', 'HR', 'Finance', 'Legal', 'Operations'],
  role: ['Admin', 'Staff', 'Manager', 'Director'],
  clearanceLevel: [1, 2, 3],
  seniority: Number // Years of service
}
```

### Access Policies
1. **Admin-Only Route** (`/admin`)
   - Restricted to users with admin role

2. **HR Department Route** (`/hr-department`)
   - Restricted to HR department members

3. **Finance Manager Route** (`/finance-manager`)
   - Restricted to Finance department managers
   - Minimum 5 years seniority required

4. **IT Clearance Route** (`/it-clearance-2`)
   - Restricted to IT department members
   - Minimum clearance level 2 required

5. **Legal Director Route** (`/legal-director`)
   - Restricted to Legal department directors
   - Clearance level 3 required

6. **Operations Staff Route** (`/ops-combined`)
   - Restricted to Operations department staff
   - Clearance level 1 required
   - Less than 3 years seniority

7. **Executive Route** (`/exec-clearance-3`)
   - Restricted to managers/directors
   - Clearance level 3 required
   - Minimum 7 years seniority

### Installation & Setup

```bash
# Clone repository
git clone -b Sesi-ALP https://github.com/fico-aditama/UC_CyberSecurity
cd rbac-abac-system

# Install dependencies
npm install express

# Create environment file
cp .env.example .env

# Start server
npm run dev
```

### Usage

```javascript
// Example of testing routes with cURL
curl -H "x-user-id: adminHR" http://localhost:3000/admin
curl -H "x-user-id: managerFinance" http://localhost:3000/finance-manager
```

### Project Structure
```
rbac-abac-system/
├── src/
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   └── access.js
│   ├── config/
│   │   └── users.js
│   └── app.js
├── .env
└── package.json
```

### Testing
```bash
# Test admin access
curl -H "x-user-id: adminHR" http://localhost:3000/admin

# Test HR department access
curl -H "x-user-id: managerHR" http://localhost:3000/hr-department

# Test finance manager access
curl -H "x-user-id: managerFinance" http://localhost:3000/finance-manager
```

## Soal 2: Google OAuth 2.0

### Features
- Google OAuth 2.0 Authentication
- User Profile Display
- Session Management
- Protected Routes
- Responsive UI with Tailwind CSS

### Prerequisites
- Node.js & npm
- Google Cloud Console Account
- Valid Google OAuth 2.0 credentials

### Installation & Setup

```bash
# Clone repository
git clone [repository-url]
cd google-oauth-app

# Install dependencies
npm install express passport passport-google-oauth20 express-session ejs dotenv

# Create environment file
cp .env.example .env

# Configure environment variables
# Add your Google OAuth credentials to .env:
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_session_secret

# Start server
npm run dev
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
   - Set authorized redirect URI: `http://localhost:3000/auth/google/callback`
   - Add required scopes (email, profile)
   - Configure OAuth consent screen

### Project Structure
```
google-oauth-app/
├── views/
│   ├── home.ejs
│   └── profile.ejs
├── config/
│   └── passport.js
├── routes/
│   └── auth.js
├── middleware/
│   └── auth.js
├── .env
├── app.js
└── package.json
```

### Routes
- `/` - Home page with login button
- `/auth/google` - Initiates Google OAuth flow
- `/auth/google/callback` - OAuth callback URL
- `/profile` - Protected user profile page
- `/auth/logout` - Logout route

### Testing

1. Start the server:
```bash
npm run dev
```

2. Open browser and visit:
```
http://localhost:3000
```

3. Click "Login with Google" and follow the OAuth flow

4. Test protected routes:
```
http://localhost:3000/profile  # Should show profile if logged in
http://localhost:3000/auth/logout  # Should logout and redirect to home
```

## Environment Variables

### RBAC & ABAC System
```env
PORT=3000
NODE_ENV=development
```

### Google OAuth System
```env
PORT=3000
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
SESSION_SECRET=your_session_secret_here
```

## Error Handling

Both systems include comprehensive error handling:
- Authentication errors
- Authorization errors
- Invalid route access
- Session management errors

## Security Considerations

1. RBAC & ABAC System:
   - Uses middleware for access control
   - Validates user attributes
   - Implements multiple security layers

2. Google OAuth System:
   - Uses secure session management
   - Implements proper OAuth 2.0 flow
   - Protects sensitive routes
   - Uses HTTPS in production

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.