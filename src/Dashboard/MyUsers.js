import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import "./MyUsers.css";

import Modal from "../Modal/Modal";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";

import search from "../img/icon/search-icon.png";
import plus from "../img/icon/plus-icon.png";
import link from "../img/icon/link-icon.png";
import eye from "../img/icon/eye-icon.png";
import prev from "../img/icon/prev-icon.png";
import next from "../img/icon/next-icon.png";

const HomePage = () => {
  const user = useLocation();
  const returnToLoginPage = useHistory();

  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setPage] = useState(1);
  const [users, setUsers] = useState("");
  const [usersPerPage, updateUsersPerPage] = useState(3);
  let totalPages = Math.ceil(users.length / usersPerPage);

  const [displayCreateModal, setDisplayCreateModal] = useState(false);

  const token = localStorage.getItem("token") || user.token;

  useEffect(() => {
    const requestData = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    const requestURL =
      "http://server.testenvironmentbg.com:4000/portal/users?page=" +
      currentPage +
      "&itemsPerPage=" +
      usersPerPage;

    fetch(requestURL, requestData)
      .then((resp) => resp.json())
      .then((usersDetails) => {
        console.log(usersDetails);
        if (usersDetails.message !== "success") {
          returnToLoginPage.push({
            pathname: "/",
          });
        } else return setUsers(usersDetails.data.staff);
      });
  }, []);

  console.log(users);

  const RowItem = (user, i) => {
    const {
      first_name,
      last_name,
      staff_id,
      staff_group,
      access_control_version,
    } = user;
    return (
      <ul className="row__item" key={i}>
        <li className="column column__1 staff-name">
          {first_name + " " + last_name}
        </li>
        <li className="column column__2 staff-id">{staff_id}</li>
        <li className="column column__3 version">{access_control_version}</li>
        <li className="column column__4 apps">4</li>
        <li className="column column__5 staff-group">{staff_group}</li>
        <li className="column column__6">
          <button className="btn btn-view">
            <img src={eye} alt="Eye Icon" className="btn__icon" />
            View
          </button>
        </li>
      </ul>
    );
  };

  const RowBody = () => {
    if (users.length > 0) {
      return (
        <div className="row-body">{users.map((item, i) => RowItem(item))}</div>
      );
    }
  };

  return (
    <section className="homepage">
      <Header />
      <Navbar />
      <section className="display">
        <div className="user__controls">
          <form className="search-filter">
            <fieldset className="search__input fieldset">
              <legend className="legend">Search Users</legend>
              <input
                type="text"
                name="search-user"
                id="search-user"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <img src={search} alt="Search" className="search-icon" />
            </fieldset>
            <fieldset className="search__input fieldset">
              <legend className="legend">Filter by App</legend>
              <select
                id="filter-app"
                name="filter-app"
                className="filter-by-app"
              >
                <option value="all-apps" disabled>
                  All Applications
                </option>
                <option value="asset-manager">Asset Manager</option>
                <option value="asset-tracking">Asset Tracking</option>
                <option value="auto-germ">Auto Germination App</option>
              </select>
            </fieldset>
            <fieldset className="search__input fieldset">
              <legend className="legend">Filter by Role</legend>
              <select
                id="filter-role"
                name="filter-role"
                className="filter-by-role"
              >
                <option value="all-roles" disabled>
                  All Roles
                </option>
                <option value="hr">HR</option>
                <option value="dept-admin">Departmental Admin</option>
                <option value="staff">Staff</option>
              </select>
            </fieldset>
          </form>
          <Link to="/staffgroups/staffgroups" className="form__staff-link">
            Staff Groups
            <img src={link} alt="Link icon" className="link-icon" />
          </Link>
          <button
            type="submit"
            className="btn btn-create btn_type_dark"
            onClick={() => setDisplayCreateModal(true)}
          >
            <img src={plus} alt="Plus icon" className="plus-icon btn__icon" />{" "}
            Create
          </button>
        </div>
        <Modal display={displayCreateModal} control={setDisplayCreateModal} />
        <ul className="row-headings">
          <li className="column-heading">staff name</li>
          <li className="column-heading">staff id</li>
          <li className="column-heading">version</li>
          <li className="column-heading">Application(s)</li>
          <li className="column-heading">staff group</li>
        </ul>

        <div className="row-body">
          <ul className="row__item">
            <li className="column column__1 staff-name">Aanu Babajide</li>
            <li className="column column__2 staff-id">IK0034900</li>
            <li className="column column__3 version">0.0.0</li>
            <li className="column column__4 apps">4</li>
            <li className="column column__5 staff-group">None</li>
            <li className="column column__6">
              <button className="btn btn-view">
                <img src={eye} alt="Eye icon" className="btn__icon" />
                View
              </button>
            </li>
          </ul>
        </div>
        {RowBody()}
        <section className="pagination">
          <div className="pagination-part-1">
            <p className="pagination__text">Users per page</p>

            <p className="pagination__text">
              {currentPage} - {usersPerPage} of 253 Users
            </p>
          </div>
          <div className="pagination-part-2">
            <p className="pagination__text">
              {currentPage} of {usersPerPage} Pages
            </p>
            <button className="pagin-prev pagin-btn">
              <img src={prev} alt="Prev icon" className="prev-icon" />
            </button>
            <button className="pagin-next pagin-btn">
              <img src={next} alt="Next icon" className="next-icon" />
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default HomePage;
