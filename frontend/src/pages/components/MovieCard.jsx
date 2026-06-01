/**
 * MovieCard.jsx — Displays one movie (poster, title, year) and a toggle to add/remove favorites.
 */
import { useState } from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieDetailModal from "./MovieDetailModal";

function MovieCard({ movie }) {
  const [showDetails, setShowDetails] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  function openDetails() {
    setShowDetails(true);
  }

  return (
    <>
      <div
        className="movie-card"
        onClick={openDetails}
        onKeyDown={(e) => e.key === "Enter" && openDetails()}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${movie.title || movie.name}`}
      >
        <div className="movie-poster">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/w500x750?text=No+Poster"
            }
            alt={movie.title || movie.name || "Movie"}
          />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
              type="button"
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              ♥
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title || movie.name || "No Title"}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </div>

      {showDetails && (
        <MovieDetailModal movie={movie} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}

export default MovieCard;
