import React, { useState } from "react";
import { Link } from "react-router-dom";

import user_icon_color_white from "../img/icon/user-icon_color_white.png";
import users_icon_color_white from "../img/icon/users-icon_color_white.png";
import multiply from "../img/icon/multiply.png";

import "./Modal.css";
import CreateNewStaffGroupModal from "../Modal/CreateNewStaffGroupModal";
import "./CreateNewStaffGroupModal.css";

const Modal = ({ display, control }) => {
  const [displayCreateModal, setDisplayCreateModal] = useState(false);
  if (display) {
    return (
      <div className="modal">
        <div className="modal__content">
          <Link
            to="/myusers/add-new-user"
            className="btn modal__btn modal__btn_type_dark btn_type_dark"
          >
            <img
              src={user_icon_color_white}
              alt="User icon"
              className="btn__icon"
            />
            Add new staff(s)
          </Link>
          <button
            className="btn modal__btn modal__btn_type_dark btn_type_dark"
            onClick={() => setDisplayCreateModal(true)}
          >
            <img
              src={users_icon_color_white}
              alt="Users icon"
              className="btn__icon"
            />
            create staff group
          </button>
          <CreateNewStaffGroupModal
            display={displayCreateModal}
            control={setDisplayCreateModal}
          />
          <button
            type="submit"
            className="btn modal__btn modal__btn_type_light btn_type_light"
            onClick={() => control(false)}
          >
            <img src={multiply} alt="Multiply icon" className="btn__icon" />
            close
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
