import React from "react";
import "./Header.css";

import accessWhite from "../../img/access-logo_color_white.png";
import home from "../../img/icon/home-icon.png";
import dots from "../../img/icon/three-dots.png";

const Header = ({ pageName }) => {
  let staffEmail =
      localStorage.getItem("signin-email") || "user@babbangona.com",
    staffRole = localStorage.getItem("signin-role") || "Super Admin";

  let headerSubtitle = pageName || "Home";
  return (
    <header className="header">
      <section className="header__logo-name">
        <img src={accessWhite} alt="Access Logo" width="35px" height="19px" />
        <h1 className="section-title header__section-title">Access Control</h1>
      </section>
      <section className="header__directory">
        <img src={home} alt="Home icon" />
        <h2 className="section-subtitle header__section-subtitle">
          {headerSubtitle}
        </h2>
      </section>
      <section className="signin-details">
        <p className="signin__email">{staffEmail}</p>
        <p className="signin__role">{staffRole}</p>
      </section>
      <img src={dots} alt="Three dots" className="three-dots" />
    </header>
  );
};

export default Header;
