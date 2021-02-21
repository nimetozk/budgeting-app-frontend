import SelectBank from "components/Controls/SelectionBank";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import service from "../../../services/service";
import { to } from "await-to-js";
import UserDetail from "./UserDetail";
import UserBankAccount from "./UserBankAccount";

// react-bootstrap components
import { Tab, Tabs } from "react-bootstrap";

const User = () => {
  const handleDelete = async (bankAccount) => {
    if (id) {
      const [error, response] = await to(
        service.getDeleteBankAccountById(bankAccount)
      );
      if (error) {
        alert("error" + error.message ?? "");
        return;
      }
      history.push("/user");
    }
  };

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
