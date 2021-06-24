import React, { useState } from "react";

import "./Modal.css";
import "./SuccessModal.css";

const SuccessModal = ({ display, control }) => {
  const bulkData = JSON.parse(localStorage.getItem("bulkUsers"));
  console.log(bulkData);

  const failedRows = bulkData["failedRows"].join(", ");

  console.log(failedRows);

  if (display) {
    return (
      <div className="modal success-modal">
        <div className="modal__content">
          <div className="modal__paragraph bg_color_green">
            <p className="modal__text">
              {bulkData["No_of_users_created"] + " "} User(s) Created
              Successfully
            </p>
          </div>
          {failedRows && (
            <div className="modal__paragraph bg_color_brown">
              <p className="modal__text">Failed rows are: </p>
              <p className="modal__text">{failedRows}</p>
            </div>
          )}
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
