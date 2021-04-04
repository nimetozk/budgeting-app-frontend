import React from "react";
import UserDetail from "./UserDetail";
import UserBankAccount from "./UserBankAccount";

import { Tab, Tabs } from "react-bootstrap";

const User = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        style={{ margin: "0px 15px" }}
      >
        <Tab eventKey="profile" title="Edit Profile">
          <UserDetail></UserDetail>
        </Tab>
        <Tab eventKey="bankAccount" title="Bank Account">
          <UserBankAccount></UserBankAccount>
        </Tab>
      </Tabs>
    </>
  );
};

export default User;
