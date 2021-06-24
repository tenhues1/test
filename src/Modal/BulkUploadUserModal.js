import React, { useState } from "react";

//import styles
import "./Modal.css";
import "./BulkUploadUserModal.css";

//import images
import multiply from "../img/icon/multiply.png";
import download from "../img/icon/download.png";
import warning from "../img/icon/warning.png";
import upload from "../img/icon/upload.png";

//import Modals
import BulkSuccessModal from "../Modal/BulkSuccessModal";

const BulkUploadUserModal = ({ display, control }) => {
  const [uploadedFileName, updateUploadedFileName] = useState("");
  const [uploadedFile, updateUploadedFile] = useState("");
  const [successMesg, updateSuccessMesg] = useState("");
  const [displaySuccessMesg, updateDisplaySuccessMesg] = useState(false);

  const token = localStorage.getItem("token");
  //console.log(token);

  const changeHandler = (e) => {
    updateUploadedFile(e.target.files[0]);
    updateUploadedFileName(e.target.value);
    console.log(uploadedFileName);
    console.log(uploadedFile);
  };

  const downloadFile = () => {
    const requestURL =
      "http://server.testenvironmentbg.com:4000/portal/template";
    const requestData = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    fetch(requestURL, requestData)
      .then((resp) => {
        return resp.blob();
      })
      .then((blob) => {
        console.log(blob);
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "template.csv";
        a.click();
      });
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", uploadedFile);

    const requestURL =
      "http://server.testenvironmentbg.com:4000/portal/create-bulk-user";

    const requestData = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };

    fetch(requestURL, requestData)
      .then((resp) => resp.json())
      .then((respData) => updateSuccessMesg(respData));

    if (successMesg) {
      console.log(successMesg);
      updateUploadedFile("");
      updateUploadedFileName("");
      localStorage.setItem("bulkUsers", JSON.stringify(successMesg.data));
      updateDisplaySuccessMesg(true);
      console.log(successMesg.data["created_user"][0]);
    }
  };

  if (display) {
    return (
      <div className="modal bulk-upload-modal">
        <div className="modal__content">
          <button
            className="bulk-upload-modal__close-btn"
            onClick={() => control(false)}
          >
            <img src={multiply} alt="Multiply symbol" />
          </button>
          <button
            className="btn modal__btn btn_type_light"
            onClick={downloadFile}
          >
            <img src={download} alt="Download icon" className="btn__icon" />
            download template
          </button>
          <BulkSuccessModal
            display={displaySuccessMesg}
            control={updateDisplaySuccessMesg}
          />

          <div className="modal__paragraph  bg_color_blue">
            <img src={warning} alt="Warning icon" />
            <p className="modal__text">
              If you have filled the download template
            </p>
            <p className="modal__text">please select the upload button</p>
          </div>
          <div className="modal__paragraph bulk-upload-modal__upload-sect">
            <fieldset className="fieldset bulk-upload-modal__fieldset">
              <input
                id="uploaded-file"
                type="file"
                name="uploaded-file"
                value={uploadedFileName}
                onChange={(e) => changeHandler(e)}
                placeholder="Select file to upload"
                required
              />
            </fieldset>
            <button
              className="btn modal__btn btn_type_dark"
              onClick={uploadFile}
            >
              <img src={upload} alt="Upload icon" className="btn__icon" />
              upload staff (csv)
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default BulkUploadUserModal;
