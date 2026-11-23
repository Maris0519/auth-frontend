# AuthFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.3.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.








🔐 Angular 21 Authentication Frontend (auth-frontend)

A modern, full-stack authentication frontend built with Angular 21, leveraging Standalone Components, Signals, Built-in Control Flow (@if, @switch), Functional HTTP Interceptors, and Route Guards. Designed to integrate seamlessly with the Node.js / Express / TypeORM / MySQL authentication backend (professional-boilerplate).

📋 Table of Contents

Project Description

Features

Project Structure

Prerequisites

Setup & Installation Instructions

Screenshots

Reflection Questions

📖 Project Description

This application provides a complete client-side authentication workflow for modern web applications. Users can register for a new account, verify their email address via a tokenized verification link, sign in with JWT-based session persistence, recover forgotten passwords, and access a protected user dashboard.

The architecture follows Angular 21 best practices:

Zero NgModules: Built entirely with Standalone Components and lazy-loaded routes via loadComponent.

Reactive State with Signals: Centralized authentication state (currentUser, isLoggedIn, isLoading, error) managed reactively in AuthService.

Automated HTTP Pipeline: Functional authInterceptor and errorInterceptor automatically attach Bearer tokens and handle 401/403 responses globally.

Route Protection: Functional authGuard and guestGuard protect private routes and manage post-login redirects (returnUrl).

✨ Features

User Registration: Reactive form with client-side validation (name, email format, strong password pattern, and password confirmation matching) triggering backend verification emails.

Email Verification: Dedicated /verify-email route that reads query-string tokens and displays loading, success, or error states using @switch.

User Login & Session Persistence: Authenticates credentials against /api/auth/login, stores the JWT and user profile in localStorage, and hydrates reactive Signals on reload.

Forgot & Reset Password Flow: End-to-end password recovery with email reset links and secure token-based password updates.

Protected Dashboard: Displays authenticated user details (name, email, account creation date, and security status) with one-click logout.

Global Error & Token Handling: Automatically injects Authorization: Bearer <token> headers and redirects to login on 401 Unauthorized responses.

Responsive Modern UI: Clean, card-based authentication layout and dashboard interface styled with modern CSS.

🗂️ Project Structure

src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   ├── auth.guard.ts          # Protects authenticated routes (/dashboard)
│   │   │   └── guest.guard.ts         # Redirects logged-in users away from /auth/*
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts    # Attaches JWT Bearer token to outgoing requests
│   │   │   └── error.interceptor.ts   # Handles 401/403 HTTP responses globally
│   │   └── services/
│   │       └── auth.service.ts        # Single source of truth using Signals & HttpClient
│   ├── features/
│   │   ├── auth/
│   │   │   ├── login/                 # Login component, template, and styles
│   │   │   ├── register/              # Registration component & validation
│   │   │   ├── verify-email/          # Token verification status view
│   │   │   ├── forgot-password/       # Password reset request form
│   │   │   └── reset-password/        # New password submission form
│   │   └── dashboard/                 # Protected user dashboard
│   ├── app.component.ts
│   ├── app.config.ts                  # Router, HttpClient, and functional interceptors
│   └── app.routes.ts                  # Lazy-loaded route definitions with guards
├── environments/
│   ├── environment.ts                 # Development API & frontend URLs
│   └── environment.prod.ts            # Production API & frontend URLs
└── styles.css                         # Global application styles


🛠️ Prerequisites

Before running the project, ensure you have the following installed and running:

Node.js: v20 LTS or v22 LTS

Angular CLI: v21 (npm install -g @angular/cli)

Backend API Server: Node.js/Express backend (professional-boilerplate) running on http://localhost:3000 with MySQL and SMTP/Ethereal configured

🚀 Setup & Installation Instructions

1. Clone the Repository

git clone https://github.com/YOUR_USERNAME/auth-frontend.git
cd auth-frontend


2. Install Dependencies

npm install


3. Configure Environment Variables

Verify src/environments/environment.ts matches your local backend server URL:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  frontendUrl: 'http://localhost:4200',
};


4. Start the Backend Server

In a separate terminal, navigate to your backend folder and start the API server:

cd ../professional-boilerplate
npm run dev


Confirm the backend is running on http://localhost:3000 (and /health returns 200 OK).

5. Start the Angular Development Server

ng serve


Open your browser and navigate to http://localhost:4200.

📸 Screenshots

Note: Replace the image paths below with actual screenshots saved in a screenshots/ folder in your repository before submitting.

1. Register Page (/auth/register)

2. Email Verification Page (/verify-email)

3. Login Page (/auth/login)

4. Forgot Password Page (/auth/forgot-password)

5. Reset Password Page (/auth/reset-password)

6. Protected Dashboard (/dashboard)

💡 Reflection Questions

1. What are the three main modern Angular features you used in this project? How do they improve the developer experience?

The three main modern Angular features used in this project are Standalone Components, Signals, and Built-in Control Flow (@if, @switch):

Standalone Components: Eliminates the need for NgModules, reducing boilerplate and making component dependencies explicit right inside the @Component decorator's imports array. It also makes lazy loading individual components straightforward via loadComponent.

Signals (signal(), computed()): Provides fine-grained, synchronous reactive state without manual subscription management or async pipes. Derived values like isLoggedIn and currentUser update automatically whenever underlying state changes.

Built-in Control Flow (@if, @else, @switch, @case): Replaces structural directives like *ngIf and *ngSwitch with clean, native template syntax that reads like standard JavaScript/TypeScript, offers superior type narrowing, and requires no extra imports.

2. Explain the difference between Signals and RxJS. When would you use each?

Signals are synchronous reactive primitives that always hold a current value and automatically track dependencies when read inside computed() expressions or templates. They are best suited for UI and application state management, such as tracking currentUser, isLoggedIn, isLoading, and error messages.

RxJS Observables are asynchronous event streams built for handling values over time, cancellation, retries, and complex stream transformations (pipe, tap, map, catchError). They are ideal for asynchronous operations and event pipelines, such as HttpClient API calls (login(), register(), verifyEmail()) and HTTP interceptors.

3. Why is it important to have both an auth interceptor and an error interceptor?

Separating HTTP concerns into two functional interceptors (authInterceptor and errorInterceptor) keeps API communication modular, clean, and DRY:

Auth Interceptor: Automatically reads the JWT from AuthService and clones outgoing requests to attach the Authorization: Bearer <token> header. Components and services do not have to manually attach headers to every authenticated request.

Error Interceptor: Centralizes global HTTP error handling. When the backend returns 401 Unauthorized (expired or invalid token), it automatically logs the user out and redirects to /auth/login with a returnUrl, while logging 403 Forbidden access errors consistently across the entire app.

4. How do route guards improve security and user experience?

Route guards (authGuard and guestGuard) control navigation before a component is activated:

Security: authGuard prevents unauthenticated users from viewing protected pages like /dashboard by verifying authService.isLoggedIn() before loading the route (working alongside backend JWT verification that protects actual API data).

User Experience: authGuard captures the attempted route (state.url) as a returnUrl query parameter so users are seamlessly redirected back to their intended page after logging in. Meanwhile, guestGuard prevents already-authenticated users from unnecessarily visiting /auth/login or /auth/register, routing them straight to /dashboard.

5. What is lazy loading and why is it important for performance?

Lazy loading defers loading feature components until the user actually navigates to their routes—implemented in app.routes.ts using dynamic import() statements inside loadComponent (for LoginComponent, RegisterComponent, VerifyEmailComponent, ForgotPasswordComponent, ResetPasswordComponent, and DashboardComponent).

Why it matters: Instead of forcing the browser to download the entire application bundle upfront, Angular splits lazy-loaded routes into separate JavaScript chunks. This reduces the initial bundle size, speeds up first page load time, and saves bandwidth for pages a user may never visit.

6. Explain the "single source of truth" principle in the context of your AuthService.

In AuthService, all authentication state (currentUserSignal, tokenSignal, loadingSignal, errorSignal, and derived computed() signals like isLoggedIn) is centralized in one singleton service (providedIn: 'root').

Rather than storing duplicate copies of user or token state across components, route guards, and interceptors, every part of the application reads from AuthService. When handleLoginSuccess() or logout() updates the signals and localStorage, the header, dashboard, guards, and interceptors all reflect the exact same state immediately without falling out of sync.

7. What challenges did you face when connecting the Angular frontend to the Node.js backend? How did you solve them?

Cross-Origin Resource Sharing (CORS) & Preflight Failures: Because Angular runs on http://localhost:4200 and Express runs on http://localhost:3000, browsers block cross-origin POST requests with JSON headers unless CORS is properly configured. Installing and configuring the cors middleware on the Express server (origin: 'http://localhost:4200') resolved preflight OPTIONS rejections.

Port & Process Conflicts on Port 3000: Local background processes holding port 3000 caused requests to miss the Express server or return unexpected 404 responses without hitting requestLoggingMiddleware. Inspecting active TCP listeners on port 3000, terminating stale processes, and verifying /health ensured requests reached the live backend cleanly.

Matching Response Envelope Structures: Ensuring the frontend ApiResponse<T> interface matched the backend's { success, message, data, error } JSON structure prevented undefined property errors when extracting tokens or error messages.

8. If you had to add a new feature (e.g., user profile editing), how would you approach it using the patterns you learned?

Define TypeScript Interfaces: Add UpdateProfileRequest and update the User DTO interface in auth.service.ts (or a dedicated user.service.ts) so requests and responses are strictly typed.

Add Service Method & Update Signal State: Implement updateProfile(data: UpdateProfileRequest) using HttpClient.put / patch, letting authInterceptor automatically attach the JWT, and update currentUserSignal and localStorage on success so the UI updates everywhere.

Create a Standalone Feature Component: Generate src/app/features/profile/profile.component.ts using ReactiveFormsModule for validation, isLoading / error signals for feedback, and @if control flow in the template.

Register a Lazy-Loaded Protected Route: Add /profile to app.routes.ts protected by canActivate: [authGuard] and loaded lazily with loadComponent.

9. What security considerations did you implement in the frontend (token storage, XSS prevention, etc.)?

Bearer Token Authorization & Automatic Expiry Handling: Tokens are sent via the Authorization: Bearer <token> header by authInterceptor, and any 401 Unauthorized response triggers authService.logout() in errorInterceptor to clear stale credentials immediately.

Client-Side Input Validation: Reactive forms enforce required fields, valid email formatting, minimum password lengths, complexity patterns (^(?=.*[A-Za-z])(?=.*\d)), and password confirmation checks before submitting data.

Angular Built-in XSS Sanitization: Angular's template interpolation ({{ user.name }}, {{ error() }}) automatically escapes dynamic values, preventing Cross-Site Scripting (XSS) from untrusted strings.

Route Guards & Backend Verification: authGuard restricts unauthenticated navigation on the client, while all sensitive data and actions remain enforced on the backend via JWT verification, rate limiting, helmet headers, and email verification checks.

10. How does this Angular frontend demonstrate the "Integrative Programming" concepts from this course?

This application demonstrates Integrative Programming by connecting two independent, decoupled technologies—an Angular 21 Single Page Application and a Node.js / Express / MySQL REST API—into a cohesive full-stack system:

Standardized Data Exchange: Both layers communicate over HTTP/REST using JSON payloads and shared TypeScript DTO contracts (ApiResponse<T>, AuthResponse, User).

Stateless Cross-Platform Authentication: JWTs bridge the frontend and backend securely across origins (localhost:4200 to localhost:3000) using CORS policies and Authorization headers.

End-to-End Workflow Orchestration: Multi-step business processes—such as user registration triggering SMTP/Ethereal verification emails that link back to Angular's /verify-email route—integrate frontend routing, backend business logic, relational database persistence, and external email services seamlessly.