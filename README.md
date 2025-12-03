# 🚀 Developer Portfolio Tracker

## 🔗 Live Production URL:
https://developer-portfolio-tracker.vercel.app

A fully responsive, authentication-enabled developer portfolio management dashboard built using React, TypeScript, Vite, Recharts, and modern UI architecture.

The system includes protected routes, analytics charts, CRUD workflows, and dark/light mode — deployed with Vercel CI/CD.

### 📌 Overview
The Developer Portfolio Tracker enables teams or individuals to:

Manage developer data
Visualize skill distribution
Track professional status
Use protected routes with authentication
Interact with a clean, modern dashboard UI

### Key Features
🔐 Authentication system (demo login)
🛡️ Protected routes using React Router
📊 Analytics dashboard with Recharts (Pie + Bar)
🌙 Dark/Light mode toggle
📱 Fully responsive interface
🧭 Sidebar + top navigation (modern SaaS-style)
👥 Developer list, search, filter, delete
👤 Developer detail/profile page
➕ Add Developer form with all fields
🗑️ Delete developer with toast notifications
🎨 Clean UI with reusable components

###  🧩 Tech Stack
Category	          Technology
Frontend	          React 18, TypeScript, Vite
Routing	            React Router DOM
Charts	            Recharts
State Management	  React Hooks
UI	                Custom CSS, modern layout
Auth	              LocalStorage (demo authentication)
Deployment	        Vercel
CI/CD	              GitHub → Vercel automatic deployments

### 🔐 Authentication & Protected Routes

Demo login credentials:
Email: admin@example.com  
Password: password123

### How Auth Works
Login sets isLoggedIn = true in localStorage
Protected pages:
/dashboard
/developers
/developers/new
/developers/:id
Unauthorized users are auto-redirected to /login
Logout clears storage + redirects instantly

### 📊 Dashboard Features
✔ Professional vs Non-Professional Pie Chart
Animated using Recharts.

✔ Skill Distribution Bar Chart
Shows aggregated skills across all developers.

✔ Stats Summary
Includes:
Total developers
Number of professionals
Total unique skills

✔ Dark/Light Mode
Smooth UI theme switching.

✔ Sidebar Navigation
Inspired by Vercel’s dashboard dashboard design.

### 👥 Developer Management

#### Developer List Page
Live search
Skill filter
Profession filter
Delete developer
Skeleton loaders
Card layout

#### Developer Profile Page

Name, title, skills
Bio + experience
GitHub & LinkedIn links

#### Add Developer Form

Includes fields for
Name
Title
Bio
Location
Experience
Skills
GitHub/LinkedIn URLs
Professional checkbox

### 🛠️ Installation & Local Development
### Install dependencies
npm install

### Start development server
npm run dev

### Build for production
npm run build

### Preview production build
npm run preview

### 🚀 Deployment (GitHub → Vercel CI/CD)
#### 1️⃣ Initialize Git Repository
git init
git add .
git commit -m "Initial commit - Developer Portfolio Tracker"

#### 2️⃣ Push to GitHub
git branch -M main
git remote add origin https://github.com/<your-username>/developer-portfolio-tracker.git
git push -u origin main

#### 3️⃣ Deploy to Vercel
Go to: https://vercel.com
Login with GitHub
Click Add New → Project
Select your repository
Framework: Vite
Build command: npm run build
Output directory: dist
Click Deploy

Your site will go live at:
👉 https://developer-portfolio-tracker.vercel.app

#### 📁 Project Structure
src/
 ├── components/
 │    └── Toast.tsx
 ├── pages/
 │    ├── LoginPage.tsx
 │    ├── DashboardPage.tsx
 │    ├── DeveloperListPage.tsx
 │    ├── DeveloperProfilePage.tsx
 │    └── NewDeveloperPage.tsx
 ├── mockApi.ts
 ├── types.ts
 ├── App.tsx
 └── main.tsx

### 🧪 Mock Backend

The project uses an in-memory mock API to support:
Fetch developers

Add developer
Delete developer
Aggregate skill counts
This allows 100% deployability without needing a backend server.

⭐ Future Enhancements
MongoDB / PostgreSQL backend
Full JWT authentication
Role-based admin dashboard
Advanced analytics panels
Export reports (CSV / PDF)
Developer timelines & performance stats