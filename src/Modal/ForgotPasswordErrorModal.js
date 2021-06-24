import React from "react";
import { Link } from "react-router-dom";

import "./Modal.css";
import "./ForgotPasswordErrorModal.css";

const ForgotPasswordErrorModal = ({ display, control, staffID }) => {
  if (display) {
    return (
      <div className="modal">
        <div className="modal__content">
          <div className="modal__paragraph  bg_color_blue">
            <p className="modal__text">
              Password reset unsuccessful for User ID, {" " + staffID + " "},
              either user is not an admin or ID doesn't exist
            </p>
          </div>
          <div className="forgot-error-modal__controls">
            <button
              className="btn modal__btn btn_type_light"
              onClick={() => control(false)}
            >
              close
            </button>
            <Link to="/" className="btn modal__btn btn_type_dark">
              back to login
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ForgotPasswordErrorModal;
