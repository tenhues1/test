import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import "./MyUsers.css";
import "./PreviewBulkUpload.css";

import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";

import leftArrow from "../img/icon/left-arrow.png";
import search from "../img/icon/search-icon.png";
import plus from "../img/icon/plus-icon.png";
import link from "../img/icon/link-icon.png";
import eye from "../img/icon/eye-icon.png";
import prev from "../img/icon/prev-icon.png";
import next from "../img/icon/next-icon.png";

const PreviewBulkUpload = () => {
  const user = useLocation();
  const [users, setUsers] = useState([1, 2, 3, 4]);
  const [usersPerPage, updateUsersPerPage] = useState(3);
  const [currentPage, setPage] = useState(1);
  //let totalPages = Math.ceil(users.length / usersPerPage);

  const token = localStorage.getItem("token") || user.token;
  const pageName = "Home/My Users/Add New User/Preview Bulk Upload";

  const RowItem = (users, i) => {
    //const { first_name, last_name, staff_email, phone, dept, role } = users;
    return (
      <ul className="row__item" key={i}>
        <li className="column column__1 ">Aanu Babajide</li>
        <li className="column column__2 ">Babajide</li>
        <li className="column column__3 ">aanubabajide@babbangona.com</li>
        <li className="column column__4 ">+2348166778866</li>
        <li className="column column__5 ">Engineering</li>
        <li className="column column__6">Departmental Admin</li>
      </ul>
    );
  };

  const RowBody = () => {
    if (users.length > 0) {
      return (
        <div className="row-body">{users.map((item) => RowItem(item))}</div>
      );
    }
  };

  return (
    <section className="preview-upload">
      <Header pageName={pageName} />
      <Navbar />
      <div className="page__control">
        <Link to="/myusers/add-new-user" className="back-link">
          <img
            src={leftArrow}
            alt="Left arrow"
            className="left-arrow btn__icon"
          />
          Back
        </Link>
        <h2 className="section-subtitle">Upload Preview</h2>
        <button className="btn btn-view-missing bg_color_brown">
          View missing entries
        </button>
      </div>
      <section className="display">
        <ul className="row-headings">
          <li className="column-heading column__1">first name</li>
          <li className="column-heading column__2">last name</li>
          <li className="column-heading column__3">email</li>
          <li className="column-heading column__4">phone</li>
          <li className="column-heading column__5">department</li>
          <li className="column-heading column__6">role</li>
        </ul>

        <div className="row-body">
          <ul className="row__item">
            <li className="column column__1 ">Aanu Babajide</li>
            <li className="column column__2 ">Babajide</li>
            <li className="column column__3 ">aanubabajide@babbangona.com</li>
            <li className="column column__4 ">+2348166778866</li>
            <li className="column column__5 ">Engineering</li>
            <li className="column column__6">Departmental Admin</li>
          </ul>
        </div>
        {RowBody()}
        <section className="pagination">
          <div className="pagination-part-1">
            <p className="pagination__text">Staffs per page</p>
            <p className="pagination__text">
              {currentPage} - {usersPerPage} of 253 Staffs
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

export default PreviewBulkUpload;
