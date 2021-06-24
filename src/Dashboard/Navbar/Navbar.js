import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <NavLink
        to="/myusers"
        className="nav__link"
        exact
        activeClassName="active-link"
      >
        <ul className="nav__list">
          <li className="nav__list-item">
            <div className="nav__users-icon nav__icon"></div>
          </li>
          <li className="nav__list-item nav__text">My Users</li>
        </ul>
      </NavLink>
      <NavLink
        to="/pagenotfound"
        className="nav__link"
        activeClassName="active-link"
      >
        <ul className="nav__list">
          <li className="nav__list-item">
            <div className="nav__apps-icon nav__icon"></div>
          </li>
          <li className="nav__list-item nav__text">Apps/Modules</li>
        </ul>
      </NavLink>
      <NavLink to="/pagenotfound" className="nav__link">
        <ul className="nav__list">
          <li className="nav__list-item">
            <div className="nav__roles-icon nav__icon"></div>
          </li>
          <li className="nav__list-item nav__text">Roles/Permissions</li>
        </ul>
      </NavLink>
      <NavLink to="/pagenotfound" className="nav__link">
        <ul className="nav__list">
          <li className="nav__list-item">
            <div className="nav__audits-icon nav__icon"></div>
          </li>
          <li className="nav__list-item nav__text">Audit Logs</li>
        </ul>
      </NavLink>
    </nav>
  );
};

export default Navbar;
