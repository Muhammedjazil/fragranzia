import "./UserNavbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  // const [search, setSearch] = useState("");

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

            </ul>
          </nav>
        </div>

        {/* SEARCH */}
        <div className="home-navsearch">
          <FiSearch />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ICONS */}
        <div className="home-navicons">

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <FiShoppingCart />
          </Link>

          <Link to="/notifications" onClick={() => setMenuOpen(false)}>
            <FiBell />
          </Link>

          <Link to="/profilesave" onClick={() => setMenuOpen(false)}>
            <FiUser />
          </Link>

        </div>

      </div>

    </div>
  );
};