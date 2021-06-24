import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Modal.css";
import "./ViewStaffGroupModal.css";
import x from "../img/icon/x.png";
//import confirm from "../img/icon/confirm_entry.png";
//import StaffGroupModalSuccess from "../Modal/StaffGroupModalSuccess";
import eye from "../img/icon/eye-icon.png";
import EditStaffGroupModal from "./EditStaffGroupModal";
import outline from "../img/icon/outline-edit.png";

const ViewStaffGroupModal = ({ display, control, groupID }) => {
  const [groupName, updategroupName] = useState("");
  const [groupDescription, updateGroupDescription] = useState("");
  const [editNewStaff, displayEditNewStaff] = useState(false);
  const [displaySuccessMesg, updateDisplaySuccessMesg] = useState(false);
  const [groupData, updateGroupData] = useState([]);

  const token = localStorage.getItem("token");
  const returnToLoginPage = useHistory();
  const groupURL = groupID.replace(" ", "%20");

  console.log(groupURL);

  useEffect(() => {
    const requestData = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const requestURL =
      "http://server.testenvironmentbg.com:4000/portal/staff-group?id=" +
      groupURL;

    console.log(requestURL);
    fetch(requestURL, requestData)
      .then((resp) => resp.json())
      .then((respData) => {
        if (respData.status !== 200) {
          /*          returnToLoginPage.push({
            pathname: "/staffgroups",
          }); */
          console.log(respData);
        } else return updateGroupData(respData.result);
      });
  }, [groupID]);

  console.log(groupData);

  const StaffGroupMembers = groupData["group_Members"] ? (
    <ul className="staff-group-members" key={groupID}>
      {groupData["group_Members"].map((item) => {
        return (
          <li className="staff-group-member bg_color_blue">
            {item.member_name + "  " + item.staff_id + " "}
            <button
              className="btn-edit"
              onClick={() => displayEditNewStaff(true)}
            >
              X
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  const displayModal = display ? (
    <section className="modal view-staff-group-modal">
      <div className="modal__content">
        <div className="view-staff-group-section">
          <h2 className="section-subtitle">
            <img src={eye} alt="" className="btn__icon" />
            View Staff Group
          </h2>

          <button
            type="submit"
            className="view-staff-group-modal__close-btn"
            onClick={() => control(false)}
          >
            <img src={x} alt="close icon" className="close-icon btn__icon" />
          </button>
        </div>

        <div className="staff-group-details">
          <h3 className="details-heading">Name of Group</h3>
          <p className="details-paragraph">{groupID || "Staff Group 1"}</p>
          <h3 className="details-heading">Description of Group</h3>
          <p className="details-paragraph">
            {groupData.description ||
              "This is a randomly generated staff group"}
          </p>
          <h3 className="details-heading">Role type</h3>
          <p className="details-paragraph">
            {groupData.role_type || "Lead Coach"}
          </p>
          <h3 className="details-heading">Group Members</h3>
          {StaffGroupMembers}
          <h3 className="details-heading">User Group Privacy</h3>
          <p className="details-paragraph">
            Private (User group would only be visible to you and the people you
            share access with)
          </p>
          <p className="details-paragraph">You currently share access with</p>
          <ul className="staff-group-members">
            <li className="staff-group-member bg_color_blue">Bello Adamu</li>
            <li className="staff-group-member bg_color_blue">Ihasan Aminu</li>
            <li className="staff-group-member bg_color_blue">
              Admulmutalib Abubakar
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className="btn btn_type_light view-staff-group__edit-btn"
          onClick={() => displayEditNewStaff(true)}
        >
          <img
            src={outline}
            alt="close icon"
            className="close-icon btn__icon"
          />
          Edit
        </button>
        <EditStaffGroupModal
          display={editNewStaff}
          control={displayEditNewStaff}
          groupID={groupID}
        />
      </div>
    </section>
  ) : null;

  return displayModal;
};

export default ViewStaffGroupModal;
