import React from "react";

import "./Modal.css";
import "./SuccessModal.css";

const SuccessModal = ({ display, control, name, staffID }) => {
  if (display) {
    return (
      <div className="modal success-modal">
        <div className="modal__content">
          <div className="modal__paragraph modal__content_order_first bg_color_green">
            <p className="modal__text">User Created Successfully</p>
          </div>
          <div className="modal__paragraph modal__content_order_second bg_color_blue">
            <p className="modal__text">{name}</p>
            <p className="modal__text">{staffID}</p>
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

export default SuccessModal;
