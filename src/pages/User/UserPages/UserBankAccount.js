import SelectBank from "components/Controls/SelectionBank";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import service from "../../../services/service";
import { to } from "await-to-js";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
  FormControl,
} from "react-bootstrap";

const UserBankAccount = () => {
  const [bankOption, setBankOption] = useState({ value: "", label: "" });
  const [userBankAccount, setUserBankAccount] = useState({
    accountNo: "",
    sortCode: "",
    description: "",
    currency: "",
    country: "",
    refBank: "",
  });

  const [bankAccountList, setBankAccountList] = useState([]);

  const getUserBankAccounts = async () => {
    const [error, response] = await to(service.getCurrentUserBankAccounts());
    if (error) {
      alert(error);
    }
    setBankAccountList(response.data);
  };

  useEffect(() => {
    getUserBankAccounts();
  }, []);

  const handleBankChange = (option) => {
    setBankOption({ ...option });
  };

  const handleSave = async () => {
    userBankAccount.refBank = bankOption.value;
    const [error, response] = await to(
      service.insertBankAccount(userBankAccount)
    );
    if (error) {
      alert(error);
      return;
    }
    getUserBankAccounts();
  };

  const handleDelete = async (bankAccountId) => {
    const [error, response] = await to(
      service.getDeleteBankAccountById(bankAccountId)
    );
    if (error) {
      alert(error);
      return;
    }

    const tempBankAccountList = [...bankAccountList];
    const index = tempBankAccountList.findIndex(
      (bankAccount) => bankAccount._id === bankAccountId
    );
    tempBankAccountList.splice(index, 1);
    setBankAccountList(tempBankAccountList);
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "accountNo":
        setUserBankAccount({
          ...userBankAccount,
          accountNo: event.target.value,
        });
        break;
      case "sortCode":
        setUserBankAccount({
          ...userBankAccount,
          sortCode: event.target.value,
        });
        break;
      case "description":
        setUserBankAccount({
          ...userBankAccount,
          description: event.target.value,
        });
        break;
      case "currency":
        setUserBankAccount({
          ...userBankAccount,
          currency: event.target.value,
        });
        break;
      case "country":
        setUserBankAccount({ ...userBankAccount, country: event.target.value });
        break;

      default:
        break;
    }
  };

  return (
    <Container fluid>
      <Row style={{ width: "1820px" }}>
        <Col md="8">
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pr-1" md="5">
                    <Form.Group>
                      <label>Select Bank Name </label>
                      <SelectBank
                        name="bankName"
                        value={bankOption}
                        onBankChange={handleBankChange}
                      ></SelectBank>
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="3">
                    <Form.Group>
                      <label>Sort Code</label>
                      <Form.Control
                        name="sortCode"
                        type="text"
                        value={userBankAccount.sortCode}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="4">
                    <Form.Group>
                      <label>Account Number</label>
                      <Form.Control
                        type="text"
                        name="accountNo"
                        value={userBankAccount.accountNo}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <Form.Group>
                      <label>Country</label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={userBankAccount.country}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="4">
                    <Form.Group>
                      <label>Currency</label>
                      <Form.Control
                        type="text"
                        name="currency"
                        value={userBankAccount.currency}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <label>Account Description</label>
                      <Form.Control
                        type="text"
                        name="description"
                        value={userBankAccount.description}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="clearfix"></div>
              </Form>
              <Button className="btn-fill pull-right" onClick={handleSave}>
                Save
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {bankAccountList.length && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Sort Code</th>
              <th>Account Number</th>
              <th>Country</th>
              <th>Currency</th>
              <th>Description</th>
              <th>
                <label>Delete Account</label>
              </th>
            </tr>
          </thead>
          <tbody>
            {bankAccountList.map((bankAccount) => (
              <tr key={bankAccount._id}>
                <td>{bankAccount.refBank.name}</td>
                <td>{bankAccount.sortCode}</td>
                <td>{bankAccount.accountNo}</td>
                <td>{bankAccount.country}</td>
                <td>{bankAccount.currency}</td>
                <td>{bankAccount.description}</td>
                <td
                  style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    size="sm"
                    onClick={() => handleDelete(bankAccount._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserBankAccount;
