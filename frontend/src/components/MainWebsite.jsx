/**
 * MainWebsite.jsx — Authenticated movie app shell: welcome banner, navbar, and routes for Home and Favorites.
 */
import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../pages/components/NavBar";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import { MovieProvider } from "../pages/contexts/MovieContext";
import "../pages/css/App.css";

function MainWebsite({ username }) {
  return (
    <MovieProvider>
      {/* NEO-BRUTALISM: App shell + welcome banner (styles in index.css) */}
      <div className="app-shell">
        <h2 className="app-welcome-banner">
          Welcome to BingeBox, {username}
        </h2>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="" element={<Home />} /> {/* /movies */}
            <Route path="favorites" element={<Favorites />} />{" "}
            {/* /movies/favorites */}
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default MainWebsite;
