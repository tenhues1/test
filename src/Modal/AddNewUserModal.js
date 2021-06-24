import React, { useState } from "react";
//import { Link, useHistory } from "react-router-dom";

import "./Modal.css";
import "./AddNewUserModal.css";

import SuccessModal from "../Modal/SuccessModal";
import ErrorModal from "../Modal/ErrorModal";

const AddNewUserModal = ({ display, control }) => {
  const [email, updateEmail] = useState("");
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [phone, updatePhone] = useState("");
  const [dept, updateDept] = useState("Sales");
  const [role, updateRole] = useState("Admin");

  const [staffID, updateStaffID] = useState("");
  const [staffName, updateStaffName] = useState("");

  const [successMesg, updateSuccessMesg] = useState("");
  const [displaySuccessMesg, updateDisplaySuccessMesg] = useState(false);
  const [displayErrorMesg, updateDisplayErrorMesg] = useState(false);

  const token = localStorage.getItem("token");

  const addUserForm = () => {
    if (email && firstName && lastName && phone) {
      const userToBeCreated = {
        user: {
          first_name: firstName,
          last_name: lastName,
          staff_name: firstName + " " + lastName,
          staff_role: role,
          staff_email: email,
          phone_number: phone,
          department: dept,
          hub: "Lekki",
          access_control_version: "2.0.5",
          staff_program: "TGE",
          staff_group: 1,
          staff_template: "",
        },
      };

      const requestData = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToBeCreated),
      };

      const requestURL =
        "http://server.testenvironmentbg.com:4000/portal/create-user";

      fetch(requestURL, requestData)
        .then((resp) => resp.json())
        .then((respMesg) => updateSuccessMesg(respMesg));

      if (successMesg) {
        console.log(successMesg.data);
        if (successMesg.data["No_of_users_created"] > 0) {
          console.log(successMesg);
          updateEmail("");
          updateFirstName("");
          updateLastName("");
          updatePhone("");
          updateStaffID(successMesg.data.created_user[0].staff_id);
          updateStaffName(successMesg.data.created_user[0].staff_name);
          updateDisplaySuccessMesg(true);
        } else {
          updateDisplayErrorMesg(true);
        }
      }
    } else {
      alert("Kindly fill in all the requested info");
    }
  };

  const displayModal = display ? (
    <section className="modal">
      <div className="add-user-modal modal__content">
        <h2 className="section-subtitle">Add New User</h2>
        <form className="add-user-form" onSubmit={(e) => e.stopPropagation()}>
          <fieldset className="fieldset field-input">
            <legend className="legend">Enter First Name</legend>
            <input
              type="text"
              value={firstName}
              onChange={(e) => updateFirstName(e.target.value)}
              required
            />
          </fieldset>
          <fieldset className="fieldset field-input">
            <legend className="legend">Enter Last Name</legend>
            <input
              type="text"
              value={lastName}
              onChange={(e) => updateLastName(e.target.value)}
              required
            />
          </fieldset>
          <fieldset className="fieldset field-input">
            <legend className="legend">Enter Email</legend>
            <input
              type="email"
              name="user-email"
              id="user-email"
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
              required
            />
          </fieldset>
          <fieldset className="fieldset field-input">
            <legend className="legend">Enter Phone Number</legend>
            <input
              type="tel"
              value={phone}
              onChange={(e) => updatePhone(e.target.value)}
              required
            />
          </fieldset>
          <fieldset className="fieldset field-input">
            <legend className="legend">Select Department</legend>
            <select
              className="select-dept"
              value={dept}
              onChange={(e) => updateDept(e.target.value)}
            >
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
            </select>
          </fieldset>
          <fieldset className="fieldset field-input">
            <legend className="legend">Select Role</legend>
            <select
              className="select-role"
              value={role}
              onChange={(e) => updateRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Supervisor">Supervisor</option>
              <option value="MSB">MSB</option>
              <option value="MIK">MIK</option>
            </select>
          </fieldset>
        </form>
        <div className="add-user-modal__controls">
          <button
            type="submit"
            className="btn btn_type_light btn_pos_left"
            onClick={() => control(false)}
          >
            close
          </button>
          <SuccessModal
            display={displaySuccessMesg}
            control={updateDisplaySuccessMesg}
            name={staffName}
            staffID={staffID}
          />
          <ErrorModal
            display={displayErrorMesg}
            control={updateDisplayErrorMesg}
          />
          <button
            type="submit"
            className="btn btn_type_dark btn_pos_right"
            onClick={() => addUserForm()}
          >
            confirm entry
          </button>
        </div>
      </div>
    </section>
  ) : null;

  return displayModal;
};

export default AddNewUserModal;
