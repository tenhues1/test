import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import "./ForgotPassword.css";

import accessLogo from "../img/access-logo-m.png";
import bgLogo from "../img/babban-gona-logo.png";
import leftArrow from "../img/icon/left-arrow.png";

import ForgotPasswordSuccessModal from "../Modal/ForgotPasswordSuccessModal";
import ForgotPasswordErrorModal from "../Modal/ForgotPasswordErrorModal";

const ForgotPassword = () => {
  const [forgotStaffID, updateForgotStaffID] = useState("");
  const [serverResp, updateServerResp] = useState("");
  const [forgotPasswordModal, updateForgotPasswordModal] = useState(false);
  const [forgotErrorModal, updateForgotErrorModal] = useState(false);

  const forgotForm = (e) => {
    e.preventDefault();

    const requestURL =
      "http://server.testenvironmentbg.com:4000/portal/reset-admin?id=" +
      forgotStaffID;

    fetch(requestURL, {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((respData) => updateServerResp(respData));

    console.log(serverResp);

    if (serverResp) {
      if (serverResp.status === 200) {
        updateForgotPasswordModal(true);
      } else {
        updateForgotErrorModal(true);
      }
    }
  };
  return (
    <section className="forgot-page">
      <img src={accessLogo} alt="Access Control Logo" className="ac-logo" />
      <h1 className="section-title">Access Control</h1>
      <h2 className="section-subtitle">Reset Password</h2>
      <form onSubmit={forgotForm} className="forgot-form">
        <fieldset className="fieldset forgot__fieldset">
          <legend className="legend forgot__legend">Staff ID</legend>
          <input
            type="text"
            name="staff-id"
            id="staff-id"
            value={forgotStaffID}
            placeholder="Staff ID"
            onChange={(e) => updateForgotStaffID(e.target.value)}
            required
          />
        </fieldset>
        <button type="submit" className="btn forgot__btn btn_type_dark ">
          Submit to reset
        </button>
      </form>
      <ForgotPasswordSuccessModal
        display={forgotPasswordModal}
        control={updateForgotPasswordModal}
        staffID={forgotStaffID}
      />
      <ForgotPasswordErrorModal
        display={forgotErrorModal}
        control={updateForgotErrorModal}
        staffID={forgotStaffID}
      />
      <Link to="/" className="forgot__login-link">
        <img
          src={leftArrow}
          alt="Left arrow"
          className="left-arrow btn__icon "
        />
        Back to Login
      </Link>
      <img src={bgLogo} alt="Babban Gona Logo" className="bg-logo" />
      <p className="app-version">V1.0.0</p>
    </section>
  );
};

export default ForgotPassword;
