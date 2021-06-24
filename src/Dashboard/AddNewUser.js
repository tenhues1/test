import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../Dashboard/Header/Header";
import Navbar from "../Dashboard/Navbar/Navbar";
import AddNewUserModal from "../Modal/AddNewUserModal";
import BulkUploadUserModal from "../Modal/BulkUploadUserModal";

import "./MyUsers.css";
import "./AddNewUser.css";

import leftArrow from "../img/icon/left-arrow.png";
import plus from "../img/icon/plus-icon.png";
import upload_color_blue from "../img/icon/upload_color_blue.png";

const AddNewUser = () => {
  const [displayAddUserModal, setDisplayAddUserModal] = useState(false);
  const [displayBulkUploadUserModal, setDisplayBulkUploadUserModal] =
    useState(false);
  let pageName = "Home/My Users/Add New Users";

  return (
    <section className="add-user-page">
      <Header pageName={pageName} />
      <Navbar />
      <div className="add-user__control page__control">
        <Link to="/myusers" className=" back-link">
          <img
            src={leftArrow}
            alt="Left arrow"
            className="left-arrow btn__icon"
          />{" "}
          Back
        </Link>
        <h2 className="section-subtitle">Add new staff(s)</h2>
      </div>
      <section className="add-user">
        <AddNewUserModal
          display={displayAddUserModal}
          control={setDisplayAddUserModal}
        />
        <BulkUploadUserModal
          display={displayBulkUploadUserModal}
          control={setDisplayBulkUploadUserModal}
        />
        <button
          className="btn add-user__btn btn_type_dark"
          onClick={() => setDisplayAddUserModal(true)}
        >
          <img src={plus} alt="Plus icon" className="plus-icon btn__icon" />
          add single staff
        </button>
        <button
          className="btn add-user__btn btn_type_light"
          onClick={() => setDisplayBulkUploadUserModal(true)}
        >
          <img
            src={upload_color_blue}
            alt="Upload icon"
            className="btn__icon"
          />
          bulk upload staff (csv)
        </button>
      </section>
    </section>
  );
};

export default AddNewUser;
