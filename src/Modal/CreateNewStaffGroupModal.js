import React, { useState } from "react";
//import { Link, useHistory } from "react-router-dom";

import "./CreateNewStaffGroupModal.css";
import x from "../img/icon/x.png";
import confirm from "../img/icon/confirm_entry.png";
import StaffGroupModalSuccess from "../Modal/StaffGroupModalSuccess";
import multiple from "../img/icon/multiplepeople.png";

const CreateStaffGroupModal = ({ display, control }) => {
  const [groupName, updategroupName] = useState("");
  const [groupDescription, updateGroupDescription] = useState("");
  const [privacy, updatePrivacy] = useState("");
  const [displaySuccessMesg, updateDisplaySuccessMesg] = useState(false);

  const displayModal = display ? (
    <section className="modal create-staff-group-modal">
      <div className="modal__content">
        <h2 className="section-subtitle">
          <img src={multiple} alt="" className="btn__icon" />
          New Staff Group
        </h2>
        <form
          className="create-staff-group-form"
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
            <select className="select-role">
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
              <option value="msb">MSB</option>
              <option value="mik">MIK</option>
            </select>
          </fieldset>
          <fieldset className="fieldset field-input">
            <legend className="legend">Add Members</legend>
          </fieldset>

          <div className="create-staff-group-section">
            <h3 className="staff-group-section__title">User Group Privacy</h3>
            <label htmlFor="private" className="radio-label">
              <input
                type="radio"
                value="Female"
                id="private"
                name="privacy"
                className="radio-btn"
              />
              Private (User group would only be visible to you and the people
              you share access with)
            </label>

            <p>Share access with</p>
            <fieldset className="fieldset field-input">
              <legend className="legend">Add users</legend>
              <input type="text" value="" />
            </fieldset>

            <label htmlFor="public" className="radio-label">
              <input
                type="radio"
                value="Male"
                id="public"
                name="privacy"
                className="radio-btn"
              />
              Public (User Group will be visible to everyone)
            </label>
          </div>
        </form>

        <div className="create-staff-group-modal__controls">
          <button
            type="submit"
            className="btn btn_type_light btn_pos_left"
            onClick={() => control(false)}
          >
            <img src={x} alt="close icon" className="btn__icon" />
            close
          </button>
          <StaffGroupModalSuccess
            display={displaySuccessMesg}
            control={updateDisplaySuccessMesg}
          />
          <button
            type="submit"
            className="btn btn_type_dark btn_pos_right"
            onClick={() => updateDisplaySuccessMesg(true)}
          >
            <img src={confirm} alt="close icon" className="btn__icon" />
            confirm entry
          </button>
        </div>
      </div>
    </section>
  ) : null;

  return displayModal;
};

export default CreateStaffGroupModal;
