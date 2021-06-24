import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "../MyUsers.css";
import "./StaffGroups.css";

import CreateNewStaffGroupModal from "../../Modal/CreateNewStaffGroupModal";
import ViewStaffGroupModal from "../../Modal/ViewStaffGroupModal";
import EditStaffGroupModal from "../../Modal/EditStaffGroupModal";

import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

import search from "../../img/icon/search-icon.png";
import outline from "../../img/icon/outline-edit.png";
import eye from "../../img/icon/eye-icon.png";
import prev from "../../img/icon/prev-icon.png";
import next from "../../img/icon/next-icon.png";
import arrow from "../../img/icon/baseline-arrow-back.png";
import leftArrow from "../../img/icon/left-arrow.png";
import people from "../../img/icon/people.png";

const HomePage = () => {
  const returnToLoginPage = useHistory();

  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setPage] = useState(1);
  const [staffGroups, updateStaffGroups] = useState("");
  const [itemsPerPage, updateItemsPerPage] = useState(4);
  //let totalPages = Math.ceil(staffGroups.length / itemsPerPage);

  const [displayCreateModal, setDisplayCreateModal] = useState(false);
  const [viewGroupModal, setViewGroupModal] = useState(false);
  const [editStaffModal, setEditStaffModal] = useState(false);

  const [staffGroupID, updateStaffGroupID] = useState("");
  const token = localStorage.getItem("token");

  // console.log(token);

  useEffect(() => {
    const requestData = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const requestURL =
      "http://server.testenvironmentbg.com:4000/portal/staff-groups";

    fetch(requestURL, requestData)
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData.message === "jwt expired" || respData.status !== 200) {
          console.log(respData);
          returnToLoginPage.push({
            pathname: "/",
          });
        } else {
          return updateStaffGroups(respData.result);
        }
      });
  }, []);

  const actionBeforeEditModal = (i) => {
    updateStaffGroupID(staffGroupIDs[i]);
    console.log(staffGroupID);
    setEditStaffModal(true);
  };

  const actionBeforeViewModal = (i) => {
    updateStaffGroupID(staffGroupIDs[i]);
    console.log(staffGroupID);
    setViewGroupModal(true);
  };

  console.log(staffGroups);

  const staffGroupIDs =
    staffGroups.length > 0 ? staffGroups.map((item) => item.id) : [];
  console.log(staffGroupIDs);

  const RowItem = (item, i) => {
    const { id, role_type, visibility, members_count } = item;
    const group_privacy = visibility == "1" ? "Public" : "Private";

    return (
      <ul className="row__item">
        <li className="column column__1" key={i}>
          {id}
        </li>
        <li className="column column__2">{role_type}</li>
        <li className="column column__3">{members_count}</li>
        <li className="column column__4">{group_privacy}</li>
        <li className="column column__5">
          <button
            className="btn staff-group-btn"
            onClick={() => actionBeforeEditModal(i)}
          >
            <img
              src={outline}
              alt="Outline icon"
              className="outline-icon btn__icon"
            />
            Edit
          </button>
        </li>
        <li className="column column__6">
          <button
            className="btn staff-group-btn"
            onClick={() => actionBeforeViewModal(i)}
          >
            <img src={eye} alt="Eye Icon" className="eye-icon btn__icon" />
            View
          </button>
        </li>
      </ul>
    );
  };

  const RowBody = () => {
    if (staffGroups.length > 0) {
      return (
        <div className="row-body">
          {staffGroups.map((item, i) => {
            //updateStaffGroupID(item.id);
            return RowItem(item, i);
          })}
        </div>
      );
    }
  };

  return (
    <section className="staffgroup">
      <Header />
      <Navbar />
      <div className="add-user__control page__control">
        <Link to="/myusers" className="add-user__back-link back-link ">
          <img
            src={leftArrow}
            alt="Left arrow"
            className="left-arrow btn__icon"
          />
          Back
        </Link>
        <h2 className="section-subtitle">
          <img
            src={people}
            alt="people icon"
            className="outline-icon btn__icon"
          />
          Staff Groups
        </h2>
      </div>
      <section className="display">
        <div className="user__controls">
          <form action="" className="search-filter">
            <fieldset className="search__input fieldset">
              <legend className="legend">Search Groups</legend>
              <input
                type="text"
                name="search-user"
                id="search-user"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <img src={search} alt="Search" className="search-icon" />
            </fieldset>
          </form>
          <button
            type="submit"
            className="btn btn-create btn_type_dark"
            onClick={() => setDisplayCreateModal(true)}
          >
            <img src={arrow} alt="staff icon" className="staff-icon" /> Create
            Staff Group
          </button>
        </div>
        <CreateNewStaffGroupModal
          display={displayCreateModal}
          control={setDisplayCreateModal}
        />
        <ul className="row-headings">
          <li className="column-heading">NAME OF GROUP</li>
          <li className="column-heading">ROLE TYPE</li>
          <li className="column-heading">NO. OF MEMBERS</li>
          <li className="column-heading">GROUP PRIVACY</li>
        </ul>

        <div className="row-body">
          <ul className="row__item">
            <li className="column column__1 ">Staff Group 1</li>
            <li className="column column__2 ">Lead Coach</li>
            <li className="column column__3 ">3</li>
            <li className="column column__4 ">Private</li>
            <li className="column column__5">
              <button
                className="btn staff-group-btn"
                onClick={() => setEditStaffModal(true)}
              >
                <img
                  src={outline}
                  alt="Outline icon"
                  className="outline-icon btn__icon"
                />
                Edit
              </button>
              <EditStaffGroupModal
                display={editStaffModal}
                control={setEditStaffModal}
                groupID={staffGroupID}
              />
            </li>
            <li className="column column__6">
              <button
                type="submit"
                onClick={() => setViewGroupModal(true)}
                className="btn staff-group-btn"
              >
                <img src={eye} alt="Eye icon" className="eye-icon btn__icon" />
                View
              </button>
              <ViewStaffGroupModal
                display={viewGroupModal}
                control={setViewGroupModal}
                groupID={staffGroupID}
              />
            </li>
          </ul>
        </div>
        {RowBody()}
        <section className="pagination">
          <div className="pagination-part-1">
            <p className="pagination__text">groups per page</p>
            <p className="pagination__text">
              {currentPage} - {itemsPerPage} of 200 groups
            </p>
          </div>
          <div className="pagination-part-2">
            <p className="pagination__text">
              {currentPage} of {itemsPerPage} Pages
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
