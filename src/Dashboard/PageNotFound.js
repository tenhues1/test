import React from "react";

import "../Modal/Modal.css";
import Header from "../Dashboard/Header/Header";
import Navbar from "../Dashboard/Navbar/Navbar";

const PageNotFound = () => {
  return (
    <section className="page-not-found">
      <Header />
      <Navbar />
      <div className="modal__paragraph bg_color_brown">
        <p className="modal__text">Page Not Found</p>
      </div>
    </section>
  );
};

export default PageNotFound;
