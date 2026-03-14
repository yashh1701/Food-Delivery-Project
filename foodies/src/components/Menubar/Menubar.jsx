import React, { useContext, useState, useEffect } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Menubar = () => {

  const [active, setActive] = useState("home");
  const { quantities, token, setToken, setQuantities } = useContext(StoreContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const uniqueItemsInCart = Object.values(quantities).filter(q => q > 0).length;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  };

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="navbar navbar-expand-lg premium-navbar">
      <div className="container">

        {/* LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={assets.logo} alt="" height={42} width={42} className="logo-img"/>
          <span className="brand-text">FoodHub</span>
        </Link>

        {/* MOBILE HEADER ACTIONS */}
        <div className="mobile-header">

          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* NAV LINKS */}
          <ul className="navbar-nav mx-auto nav-links">

            <li className="nav-item">
              <Link
                className={active === "home" ? "nav-link active-link" : "nav-link"}
                to="/"
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={active === "explore" ? "nav-link active-link" : "nav-link"}
                to="/explore"
                onClick={() => setActive("explore")}
              >
                Explore
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={active === "contact-us" ? "nav-link active-link" : "nav-link"}
                to="/contact"
                onClick={() => setActive("contact-us")}
              >
                Contact
              </Link>
            </li>

          </ul>

          {/* RIGHT ACTIONS */}
          <div className="nav-actions">

            {/* DESKTOP THEME BUTTON */}
            <button className="theme-toggle-btn desktop-theme" onClick={toggleTheme}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* CART */}
            <Link to="/cart" className="cart-link">
              <div className="cart-container">
                <img src={assets.cart} alt="" height={26} width={26}/>
                {uniqueItemsInCart > 0 && (
                  <span className="cart-badge">{uniqueItemsInCart}</span>
                )}
              </div>
            </Link>

            {/* AUTH */}
            {!token ? (
              <>
                <button className="login-btn" onClick={() => navigate("/login")}>
                  Login 
                </button>

                <button className="register-btn" onClick={() => navigate("/register")}>
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown text-end">

                <a className="profile-toggle" data-bs-toggle="dropdown">
                  <img
                    src={assets.profile}
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-circle"
                  />
                </a>

                <ul className="dropdown-menu dropdown-menu-end profile-menu shadow">

                  <li
                    className="dropdown-item"
                    onClick={() => navigate("/myorders")}
                  >
                    My Orders
                  </li>

                  <li
                    className="dropdown-item"
                    onClick={logout}
                  >
                    Logout
                  </li>

                </ul>

              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Menubar;