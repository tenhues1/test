import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Modal.css";
import "./EditStaffGroupModal.css";

import x from "../img/icon/x.png";
import confirm from "../img/icon/confirm_entry.png";
import outline from "../img/icon/outline-edit.png";

import StaffGroupModalSuccess from "../Modal/StaffGroupModalSuccess";

const EditStaffGroupModal = ({ display, control, groupID }) => {
  const returnToLoginPage = useHistory();
  const [displaySuccessMesg, updateDisplaySuccessMesg] = useState(false);
  const [groupData, updateGroupData] = useState([]);
  const token = localStorage.getItem("token");

  const [groupName, updategroupName] = useState("");
  const [groupDescription, updateGroupDescription] = useState("");
  const [groupRole, updateGroupRole] = useState("");
  const [groupVisibility, updateGroupVisibility] = useState("");
  const [groupMembers, updateGroupMembers] = useState("");
  const [sharedAdmins, updateSharedAdmins] = useState("");

  const [privacy, updatePrivacy] = useState("");

  console.log(groupID);
  console.log(privacy);

  const groupURL = groupID.replace(" ", "%20");

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
          returnToLoginPage.push({
            pathname: "/staffgroups",
          });
        } else return updateGroupData(respData.result);
      });

    if (groupData) {
      updategroupName(groupData.id);
      updateGroupDescription(groupData.description);
      updateGroupRole(groupData.role_type);
      updateGroupVisibility(groupData.visibility);
      updateGroupMembers(groupData.group_Members);
    }
  }, [groupID]);

  const displayModal = display ? (
    <section className="modal edit-staff-group-modal ">
      <div className="modal__content ">
        <h2 className="section-subtitle">
          <img src={outline} alt="" className="btn__icon" />
          Edit Staff Group
        </h2>
        <form
          className="edit-staff-group-modal-form"
          onSubmit={(e) => e.stopPropagation()}
        >
          <fieldset className="fieldset field-input">
            <legend className="legend">Enter Name of Group</legend>
            <input
              type="text"
              value={groupName}
              onChange={(e) => updategroupName(e.target.value)}
              required
            />
          </fieldset>
          <fieldset className="fieldset field-input">
            <legend className="legend">Enter group description</legend>
            <input
              type="text"
              value={groupDescription}
              onChange={(e) => updateGroupDescription(e.target.value)}
              required
            />
          </fieldset>

          <fieldset className="fieldset field-input">
            <legend className="legend">Select Role</legend>
            <select
              className="select-role"
              value={groupRole}
              onChange={(e) => updateGroupRole(e.target.value)}
            >
              <option value="lead coach">Lead Coach</option>
              <option value="supervisor">Supervisor</option>
              <option value="msb">MSB</option>
              <option value="mik">MIK</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="legend">Add Members</legend>
            <input
              type="text"
              value=""
              onChange={(e) => updateGroupMembers(e.target.value)}
              required
            />
          </fieldset>

          <section className="edit-modal-section">
            <h3 className="edit-modal-section__title">User Group Privacy</h3>
            <label htmlFor="private" className="radio-label">
              <input
                type="radio"
                value="Private"
                id="private"
                name="privacy"
                className="radio-btn"
                onChange={(e) => updatePrivacy(e.target.value)}
              />
              Private (User group would only be visible to you and the people
              you share access with)
            </label>

            <p>Share access with</p>
            <fieldset className="fieldset field-input">
              <legend className="legend">Add users</legend>
              <input
                type="text"
                value=""
                onChange={(e) => updateSharedAdmins(e.target.value)}
              />
            </fieldset>

            <label htmlFor="public" className="radio-label">
              <input
                type="radio"
                value="Public"
                id="public"
                name="privacy"
                className="radio-btn"
                onChange={(e) => updatePrivacy(e.target.value)}
              />
              Public (User Group will be visible to everyone)
            </label>
          </section>
        </form>
        <div className="edit-staff-group-modal__controls">
          <button
            type="submit"
            className="btn btn_type_light btn_pos_left"
            onClick={() => control(false)}
          >
            <img src={x} alt="close icon" className="close-icon btn__icon" />
            close
          </button>
          <StaffGroupModalSuccess
            display={displaySuccessMesg}
            control={updateDisplaySuccessMesg}
          />
          <button
            type="submit"
            className="btn btn_type_dark btn_pos_right "
            onClick={() => updateDisplaySuccessMesg(true)}
          >
            <img
              src={confirm}
              alt="close icon"
              className="close-icon btn__icon"
            />
            confirm entry
          </button>
        </div>
      </div>
    </section>
  ) : null;

  return displayModal;
};

export default EditStaffGroupModal;
