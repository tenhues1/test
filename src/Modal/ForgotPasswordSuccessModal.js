import React from "react";
import { Link } from "react-router-dom";

import "./Modal.css";

const ForgotPasswordSuccessModal = ({ display, control, staffID }) => {
  if (display) {
    return (
      <div className="modal">
        <div className="modal__content">
          <div className="modal__paragraph  bg_color_blue">
            <p className="modal__text">
              Password reset successful for User ID, {" " + staffID + " "}
              check your email for your new password
            </p>
          </div>
          <Link to="/" className="btn modal__btn btn_type_dark">
            back to login
          </Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ForgotPasswordSuccessModal;
