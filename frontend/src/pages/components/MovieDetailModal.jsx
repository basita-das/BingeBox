/**
 * MovieDetailModal.jsx — Full-screen modal with complete TMDB movie details when a card is clicked.
 */
import { useEffect, useState } from "react";
import { getMovieDetails } from "@backend/services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetailModal.css";

function formatRuntime(minutes) {
  if (!minutes) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

function formatMoney(amount) {
  if (!amount) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function DetailRow({ label, value }) {
  if (value === null || value === undefined || value === "" || value === "—") {
    return null;
  }
  return (
    <div className="movie-detail-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function MovieDetailModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(movie.id);
        if (!cancelled) setDetails(data);
      } catch {
        if (!cancelled) setError("Could not load full movie details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [movie.id]);

  const data = details || movie;
  const title = data.title || data.name || "Untitled";
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : null;
  const backdrop = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : null;
  const genres =
    data.genres?.map((g) => g.name).join(", ") ||
    movie.genre_ids?.join(", ") ||
    null;
  const cast =
    data.credits?.cast
      ?.slice(0, 12)
      .map((c) => c.name)
      .join(", ") || null;
  const languages =
    data.spoken_languages?.map((l) => l.english_name).join(", ") || null;
  const companies =
    data.production_companies?.map((c) => c.name).join(", ") || null;
  const countries =
    data.production_countries?.map((c) => c.name).join(", ") || null;

  function onFavoriteClick(e) {
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div
      className="movie-detail-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-detail-title"
    >
      <div className="movie-detail-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="movie-detail-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {backdrop && (
          <div
            className="movie-detail-hero"
            style={{ backgroundImage: `url(${backdrop})` }}
          />
        )}

        <div className="movie-detail-body">
          <div className="movie-detail-header">
            {poster && (
              <img className="movie-detail-poster" src={poster} alt={title} />
            )}
            <div className="movie-detail-heading">
              <h2 id="movie-detail-title">{title}</h2>
              {data.tagline && (
                <p className="movie-detail-tagline">{data.tagline}</p>
              )}
              {data.original_title && data.original_title !== title && (
                <p className="movie-detail-original">
                  Original: {data.original_title}
                </p>
              )}
              <button
                type="button"
                className={`movie-detail-favorite ${favorite ? "active" : ""}`}
                onClick={onFavoriteClick}
              >
                {favorite ? "♥ In favorites" : "♡ Add to favorites"}
              </button>
            </div>
          </div>

          {loading && <p className="movie-detail-status">Loading details…</p>}
          {error && <p className="movie-detail-status movie-detail-error">{error}</p>}

          {data.overview && (
            <section className="movie-detail-section">
              <h3>Overview</h3>
              <p>{data.overview}</p>
            </section>
          )}

          <dl className="movie-detail-facts">
            <DetailRow label="Release date" value={formatDate(data.release_date)} />
            <DetailRow label="Status" value={data.status} />
            <DetailRow label="Runtime" value={formatRuntime(data.runtime)} />
            <DetailRow label="Genres" value={genres} />
            <DetailRow
              label="Rating"
              value={
                data.vote_average != null
                  ? `${Number(data.vote_average).toFixed(1)} / 10 (${(data.vote_count ?? 0).toLocaleString()} votes)`
                  : null
              }
            />
            <DetailRow
              label="Popularity"
              value={
                data.popularity != null
                  ? Number(data.popularity).toFixed(1)
                  : null
              }
            />
            <DetailRow label="Budget" value={formatMoney(data.budget)} />
            <DetailRow label="Revenue" value={formatMoney(data.revenue)} />
            <DetailRow label="Languages" value={languages} />
            <DetailRow label="Production" value={companies} />
            <DetailRow label="Countries" value={countries} />
            <DetailRow label="IMDb ID" value={data.imdb_id} />
            {data.homepage && (
              <div className="movie-detail-row">
                <dt>Website</dt>
                <dd>
                  <a
                    href={data.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="movie-detail-link"
                  >
                    Visit official site
                  </a>
                </dd>
              </div>
            )}
          </dl>

          {cast && (
            <section className="movie-detail-section">
              <h3>Cast</h3>
              <p>{cast}</p>
            </section>
          )}

          {data.belongs_to_collection && (
            <section className="movie-detail-section">
              <h3>Collection</h3>
              <p>{data.belongs_to_collection.name}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailModal;
