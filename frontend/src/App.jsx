/**
 * App.jsx — Root component: login auth state, top-level routing, and redirect to /movies when signed in.
 */
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login";
import MainWebsite from "./components/MainWebsite";
import ProtectedRoute from "./components/ProtectedRoute";
import { DEMO_USERNAME, DEMO_PASSWORD } from "@backend/config/env.js";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username, password) => {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setUsername(username);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Navigate to="/movies" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/movies/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainWebsite username={username} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
