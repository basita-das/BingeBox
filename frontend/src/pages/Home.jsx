/**
 * Home.jsx — Browse page: loads popular movies, search, and renders the movie grid.
 */
import MovieCard from "./components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "@backend/services/api";
import "./css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="home">
      {/* NEO-BRUTALISM: Search bar — brutalist inputs in Home.css */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search your movies"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {/* NEO-BRUTALISM: Error + loading blocks — shared classes in index.css */}
      {error && <div className="nb-error-message">{error}</div>}
      {loading ? (
        <div className="nb-loading">Loading…</div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
