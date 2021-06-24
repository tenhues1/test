import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./LoginPage.css";

// Imported Images
import accessLogo from "../img/access-control-logo.png";
import bgLogo from "../img/babban-gona-logo.png";

const LoginPage = () => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [userData, updateUserData] = useState({});

  let history = useHistory();

  const loginForm = () => {
    const loginData = {
      username: email,
      password: password,
    };
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };
    const requestURL = "http://server.testenvironmentbg.com:4000/portal/login";

    async function verifyDetails() {
      let resp = await fetch(requestURL, requestData);

      if (!resp.ok) {
        throw new Error("HTTP error, status: " + resp.status);
      }
      let respData = await resp.json();
      updateUserData(respData);
      console.log(userData);
      if (userData.data.userInfo.length > 0) {
        console.log("You have been successfully logged in");

        localStorage.setItem("token", userData.token); //stores the token so it can be used across pages
        localStorage.setItem(
          "signin-email",
          userData.data.userInfo[0]["staff_email"]
        );
        localStorage.setItem(
          "signin-role",
          userData.data.userInfo[0]["staff_role"]
        );
        //redirects to Dashboard
        history.push({
          pathname: "./myusers",
          data: userData,
        });
      }
    }

    verifyDetails().catch((e) => console.log(e.message));
  };

  return (
    <section className="login-page">
      <img src={accessLogo} alt="Access Control Logo" className="ac-logo" />
      <h1 className="section-title login__section-title">Access Control</h1>
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <fieldset className="fieldset login__fieldset">
          <legend className="legend login__legend">Username</legend>
          <input
            type="email"
            name="user-email"
            id="user-email"
            value={email}
            placeholder="Useremail"
            onChange={(e) => updateEmail(e.target.value)}
            required
          />
        </fieldset>
        <fieldset className="fieldset login__fieldset">
          <legend className="legend login__legend">Password</legend>
          <input
            type="password"
            autoComplete="on"
            name="user-password"
            id="user-password"
            placeholder="Password"
            onChange={(e) => updatePassword(e.target.value)}
            required
          />
        </fieldset>
        <button
          type="submit"
          className="btn login__btn btn_type_dark "
          onClick={loginForm}
        >
          Login
        </button>
      </form>
      <Link to="/forgotpassword" className="link login__forgot-link">
        Forgot Password?
      </Link>

      <img src={bgLogo} alt="Babban Gona Logo" className="bg-logo" />
      <p className="app-version">V1.0.0</p>
    </section>
  );
};

export default LoginPage;
