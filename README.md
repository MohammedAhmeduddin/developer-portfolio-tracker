
# Developer Portfolio Tracker

🚀 **Live Production URL:**  
https://developer-portfolio-tracker.vercel.app

This is a fully responsive, authentication-enabled developer portfolio management dashboard built using **React, TypeScript, Vite, Recharts, and modern UI principles**.  
The application features protected routes, developer analytics, data visualization, CRUD operations, and a dark/light mode system — deployed with **Vercel CI/CD**.

A full-stack styled React + TypeScript application built with Vite, featuring authentication, protected routes, animated charts, dark/light mode, dashboards, and developer management.

📌 Overview

The Developer Portfolio Tracker is a modern web dashboard that allows teams or individuals to manage and visualize developer information, skills, professional status, and insights through interactive charts.

It includes:

🔐 Authentication system (demo login)

🛡️ Protected routes using React Router

📊 Dashboard with animated Pie & Bar charts (Recharts)

🌙 Dark/Light mode toggle

📱 Fully responsive UI

🧭 Sidebar + top navigation (Vercel-style)

👥 Developer list, filtering, search, and profile pages

➕ Add Developer form with skills, bio, experience, social links

🗑️ Delete developer with toast notifications

🎨 Modern, minimal, production-ready dashboard design

🧩 Tech Stack
Category	Technology
Frontend	React 18, TypeScript, Vite
Routing	React Router DOM
UI	Custom CSS, responsive grid, animations
Charts	Recharts (PieChart, BarChart, ResponsiveContainer)
State	React Hooks
Auth	LocalStorage-based demo authentication
Deployment	Vercel
CI/CD	GitHub → Vercel auto-deploy pipeline
🔐 Authentication & Protected Routes

The app includes a functional demo login:

Email: admin@example.com  
Password: password123


After login:

isLoggedIn = true is stored in localStorage

/dashboard, /developers, /developers/new, /developers/:id become accessible

User is redirected automatically when authenticated / unauthenticated

Logout:

Clears login from storage

Redirects to /login immediately

📊 Dashboard Features
✔ Animated Pie Chart

Shows Professional vs Non-Professional Developer ratio.

✔ Animated Bar Chart

Shows skill distribution across developers.

✔ Stats Summary

Includes:

Total developers

Professional developers

Total skills

✔ Dark/Light Mode

Smooth toggle for UI theme switching.

✔ Sidebar Navigation

Inspired by modern SaaS dashboards.

👥 Developer Management
Developer List Page:

Live search

Skill-based filtering

Delete developer

Stats summary

Skeleton loaders

Beautiful card UI

Developer Profile Page:

Displays full developer information

Skills

Experience

Contact links

New Developer Form:

Name, title, bio, location

GitHub & LinkedIn URL inputs

Years of experience

Professional toggle

Selectable skill chips

Save to mock backend


🛠️ Installation & Running Locally
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview


🚀 Deployment (Vercel + GitHub)
1. Initialize Git
git init
git add .
git commit -m "Initial commit - Developer Portfolio Tracker"

2. Push to GitHub
git branch -M main
git remote add origin https://github.com/<your-username>/developer-portfolio-tracker.git
git push -u origin main

3. Deploy to Vercel

Go to https://vercel.com

Login with GitHub

Click Add New → Project

Select your repository

Framework: Vite

Build command: npm run build

Output directory: dist

Click Deploy

Your app will be live at:

https://developer-portfolio-tracker.vercel.app

📁 Project Structure
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

🧪 Mock Backend

The app uses a lightweight mock API to simulate:

Fetch developers

Create developer

Delete developer

Skill aggregation logic

This keeps the project deployable anywhere without a real backend.


⭐ Future Enhancements

MongoDB / PostgreSQL backend

Authentication with JWT

Role-based admin dashboard

Developer analytics reports

Export to CSV / PDF