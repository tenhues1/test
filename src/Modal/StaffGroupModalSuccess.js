import React from "react";
//import { Link, useHistory } from "react-router-dom";

import "./Modal.css";
import "./StaffGroupModalSuccess.css";
import check from "../img/icon/check.png";
import x from "../img/icon/x.png";

const StaffGroupSuccessModal = ({ display, control }) => {
  if (display) {
    return (
      <div className="modal staff-group-success-modal">
        <div className="modal__content">
          <div className="modal__paragraph bg_color_green">
            <img src={check} alt="check icon" />
            <p className="modal__text">Staff Group Created Successfully</p>
          </div>
          <button
            className="btn modal__btn btn_type_light btn-align"
            onClick={() => control(false)}
          >
            <img src={x} alt="close icon" className="close-icon btn__icon" />
            close
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default StaffGroupSuccessModal;
