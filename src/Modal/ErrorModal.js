import React from "react";

import "./Modal.css";
import "./SuccessModal.css";
import "./ErrorModal.css";

const ErrorModal = ({ display, control }) => {
  if (display) {
    return (
      <div className="modal error-modal">
        <div className="modal__content">
          <div className="modal__paragraph bg_color_brown">
            <p className="modal__text">User(s) Not Created Successfully</p>
          </div>

          <button
            className="btn modal__btn btn_type_light"
            onClick={() => control(false)}
          >
            close
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ErrorModal;
