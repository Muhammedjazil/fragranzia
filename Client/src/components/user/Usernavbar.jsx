import "./Usernavbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiBell,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";

export const UserNavbar = ({ search, setSearch }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSearch = (e) => {
    if (e.key === "Enter" && search && search.trim() !== "") {
      navigate("/products");
      setMenuOpen(false);
    }
  };
  return (
    <div className="home-fullnav">

      {/* LOGO */}
      <h2 id="nav-heading">Fragranzia</h2>

      {/* MOBILE MENU BUTTON */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className={`home-fullnav1 ${menuOpen ? "menu-open" : ""}`}>

        {/* NAVIGATION LINKS */}
        <div className="home-nav">
          <nav>
            <ul>

              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products" onClick={() => setMenuOpen(false)}>
                  Products
                </Link>
              </li>

              <li>
                <Link to="/gifting" onClick={() => setMenuOpen(false)}>
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li>

              {!token && (
                <li>
                  <Link to="/Signin" onClick={() => setMenuOpen(false)}>
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* SEARCH */}
        <div className="home-navsearch">
          <FiSearch />

        <input
  type="text"
  placeholder="Search products..."
  value={search || ""}
  onChange={(e) => setSearch && setSearch(e.target.value)}
  onKeyDown={handleSearch}
/>
        </div>

        {/* ICONS */}
        <div className="home-navicons">

          <Link to="/cart" onClick={() => setMenuOpen(false)} title="Cart">
            <FiShoppingCart />
          </Link>

          <Link to="/notifications" onClick={() => setMenuOpen(false)} title="Notifications">
            <FiBell />
          </Link>

          <Link to={token ? "/profilesave" : "/Signin"} onClick={() => setMenuOpen(false)} title={token ? "Profile" : "Sign In"}>
            <FiUser />
          </Link>

        </div>

      </div>

    </div>
  );
};