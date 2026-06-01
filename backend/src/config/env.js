/**
 * env.js — Reads Vite environment variables used by the frontend and backend modules.
 * Variables must be prefixed with VITE_ and defined in the project root .env file.
 */

const getRequiredEnv = (key) => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. Copy .env.example to .env and set your values.`
    );
  }
  return value;
};

export const TMDB_API_KEY = getRequiredEnv("VITE_TMDB_API_KEY");
export const TMDB_BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
export const DEMO_USERNAME = getRequiredEnv("VITE_DEMO_USERNAME");
export const DEMO_PASSWORD = getRequiredEnv("VITE_DEMO_PASSWORD");
