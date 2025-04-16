import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next"; 
import "./NavBar.css";
import { Language } from "../Language/Language";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { t } = useTranslation(); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="top-navbar">
        <div className="logo-title">
          <img src="/logo.svg" alt="Logo" className="logo" />
          <span className="title">{t("appTitle")}</span> 
        </div>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            <i className="ri-home-5-line"></i>
            <span>{t("home")}</span> 
          </Link>
          <Link
            to="/reports"
            className={`nav-item ${location.pathname === "/reports" ? "active" : ""}`}
          >
            <i class="ri-bookmark-line"></i>
            <span>{t("reports-nav")}</span> 
          </Link>
          <Link
            to="/dashboard"
            className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}
          >
            <i class="ri-bar-chart-box-line"></i>
            <span>{t("dashboard-nav")}</span> 
          </Link>

          {/* Profile Link */}
          {isSignedIn ? (
            <div className="nav-item" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <UserButton />
              <span>{user.firstName}</span>
            </div>
          ) : (
            <div className="nav-item" onClick={() => navigate("/register")}>
              <i className="ri-user-star-line"></i>
              <span>{t("profile")}</span> 
            </div>
          )}

          <Language />
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="bottom-navbar">
        <Link
          to="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
        >
          <i className="ri-home-5-line"></i>
          <span>{t("home")}</span> 
        </Link>
        <Link
          to="/reports"
          className={`nav-item ${location.pathname === "/reports" ? "active" : ""}`}
        >
          <i class="ri-bookmark-line"></i>
          <span>{t("reports-nav")}</span> 
        </Link>
        <Link
          to="/dashboard"
          className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          <i class="ri-bar-chart-box-line"></i>
          <span>{t("dashboard-nav")}</span> 
        </Link>

        {/* Profile Link */}
        {isSignedIn ? (
          <div className="nav-item" style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <UserButton />
            <span>{user.firstName}</span>
          </div>
        ) : (
          <div className="nav-item" onClick={() => navigate("/register")}>
            <i className="ri-user-star-line"></i>
            <span>{t("profile")}</span> 
          </div>
        )}
      </nav>
    </>
  );
};
