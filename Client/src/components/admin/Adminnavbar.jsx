import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Adminnavbar.css"
import {
  FiGrid,
  FiPackage,
  FiHome,
  FiUsers,
  FiShoppingCart,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successfully!");
    navigate("/signin");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="category-nav">
      <div className="nav-header">
        <h2>Dashtar</h2>

        <button
          type="button"
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div className={`category-nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/Dashboard" onClick={closeMenu}>
          <FiGrid /> Dashboard
        </Link>

        <Link to="/Product" onClick={closeMenu}>
          <FiPackage /> Product
        </Link>

        <Link to="/Categories" onClick={closeMenu}>
          <FiHome /> Categories
        </Link>

        <Link to="/Customer" onClick={closeMenu}>
          <FiUsers /> Customer
        </Link>

        <Link to="/order" onClick={closeMenu}>
          <FiShoppingCart /> Order
        </Link>

        <div className="category-logout">
          <button onClick={handleLogout}>
            <FiLogOut /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;