import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import ForgotPassword from "./LoginPage/ForgotPassword";
import MyUsers from "./Dashboard/MyUsers";
import AddNewUser from "./Dashboard/AddNewUser";
import StaffGroups from "./Dashboard/Staff/StaffGroups";
import PreviewBulkUpload from "./Dashboard/PreviewBulkUpload";
import PageNotFound from "./Dashboard/PageNotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/staffgroups">
            <StaffGroups />
          </Route>
          <Route exact path="/myusers">
            <MyUsers />
          </Route>
          <Route exact path="/myusers/add-new-user">
            <AddNewUser />
          </Route>
          <Route exact path="/myusers/add-new-user/preview-bulk-upload">
            <PreviewBulkUpload />
          </Route>
          <Route exact path="/pagenotfound">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
