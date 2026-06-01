/**
 * Favorites.jsx — Favorites page: displays saved movies from context or an empty-state message.
 */
import "./css/Favorites.css";
import { useMovieContext } from "./contexts/MovieContext";
import MovieCard from "./components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  return (
    <div className="favorites">
      {/* NEO-BRUTALISM: Favorites layout — panel + grid in Favorites.css */}
      {favorites.length > 0 ? (
        <>
          <h2>Your Favorites</h2>
          <div className="movies-grid">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      ) : (
        <div className="favorites-empty">
          <h2>No Favorite Movies Yet</h2>
          <p>
            Start adding movies to your favorites and they will appear here!
          </p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
