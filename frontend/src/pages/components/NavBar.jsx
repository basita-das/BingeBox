/**
 * NavBar.jsx — Top navigation with links to Home and Favorites within the movie app.
 */
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      {/* NEO-BRUTALISM: Top bar — see Navbar.css */}
      <div className="navbar-brand">
        <Link to="/" className="nav-link">
          BingeBox
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/movies" className="nav-link">
          Home
        </Link>
        <Link to="/movies/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
