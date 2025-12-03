// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DeveloperListPage from "./pages/DeveloperListPage";
import DeveloperProfilePage from "./pages/DeveloperProfilePage";
import NewDeveloperPage from "./pages/NewDeveloperPage";

// Simple auth helper – reads from localStorage
function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      {/* If someone hits /, send them to login OR dashboard based on auth */}
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/developers"
        element={
          <ProtectedRoute>
            <DeveloperListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/developers/:id"
        element={
          <ProtectedRoute>
            <DeveloperProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/developers/new"
        element={
          <ProtectedRoute>
            <NewDeveloperPage />
          </ProtectedRoute>
        }
      />

      {/* Unknown routes → respect auth */}
      <Route
        path="*"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
