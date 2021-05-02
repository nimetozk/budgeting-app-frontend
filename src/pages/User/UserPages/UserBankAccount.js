/**
 * The part of the code renders the 'User Bank Accounts' tab on the 'User Profile' page.
 *
 * Throughout the implementation, I have used react documentation to understand different types of React hooks.
 * https://reactjs.org/
 */

import { useConfirmation } from "components/Dialog/dialog-provider";
import SelectBank from "components/Controls/SelectionBank";
import React, { useState, useEffect } from "react";
import { errorToString } from "utility";
import service from "../../../services/service";
import { to } from "await-to-js";
import { toast } from "react-toastify";
import { CardHeader } from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import SelectionCurrency from "../../../components/Controls/SelectionCurrency";
import SelectionCountryList from "../../../components/Controls/SelectionCountryList";

import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

const UserBankAccount = () => {
  const [bankAccountList, setBankAccountList] = useState([]);
  const [userBankAccount, setUserBankAccount] = useState({
    accountNo: "",
    sortCode: "",
    description: "",
    currency: "",
    country: "",
    refBank: null,
  });

  const confirm = useConfirmation();

  const formik = useFormik({
    initialValues: {
      _id: userBankAccount._id,
      accountNo: userBankAccount.accountNo,
      sortCode: userBankAccount.sortCode,
      description: userBankAccount.description,
      currency: !userBankAccount.currency
        ? null
        : {
            value: userBankAccount.currency,
            label: userBankAccount.currency,
          },
      country: !userBankAccount.country
        ? null
        : {
            value: userBankAccount.country,
            label: userBankAccount.country,
          },
      refBank: !userBankAccount.refBank
        ? null
        : {
            value: userBankAccount.refBank._id,
            label: userBankAccount.refBank.name,
          },
    },

    validationSchema: yup.object().shape({
      accountNo: yup.string().required("Required").max(6),
      sortCode: yup.string().required("Required").max(6),
      description: yup.string().required("Required"),
      currency: yup.object().nullable().required("Required"),
      country: yup.object().nullable().required("Required"),
      refBank: yup.object().nullable().required("Required"),
    }),

    enableReinitialize: true,
    onSubmit: async (values) => {
      const entity = {
        ...values,
        refBank: values.refBank.value,
        currency: values.currency.value,
        country: values.country.value,
      };

      confirm({
        title: "Save Bank Account",
        description: "Are you sure that you want to save the bank account ?",
      }).then(async () => {
        const [error, response] = await to(service.insertBankAccount(entity));
        if (error) {
          toast.error(errorToString(error));
          return;
        }
        getUserBankAccounts();

        toast.success("Your bank account is saved successully");
      });
    },
  });

  const getUserBankAccounts = async () => {
    const [error, response] = await to(service.getCurrentUserBankAccounts());
    if (error) {
      toast.error(errorToString(error));
      return;
    }
    setBankAccountList(response.data);
  };

  useEffect(() => {
    getUserBankAccounts();
  }, []);

  const handleBankChange = (option) => {
    formik.setFieldValue("refBank", { ...option });
  };

  const handleCurrencyChange = (option) => {
    formik.setFieldValue("currency", { ...option });
  };

  const handleCountryChange = (option) => {
    formik.setFieldValue("country", { ...option });
  };

  const handleDelete = async (bankAccountId) => {
    confirm({
      title: "DELETE",
      description: "Are you sure that you want to delete the item ?",
    }).then(() => {
      service
        .getDeleteBankAccountById(bankAccountId)
        .then(() => {
          const tempBankAccountList = [...bankAccountList];
          const index = tempBankAccountList.findIndex(
            (bankAccount) => bankAccount._id === bankAccountId
          );
          tempBankAccountList.splice(index, 1);
          setBankAccountList(tempBankAccountList);
          toast.success("Account is deleted successfully!");
        })
        .catch((error) => {
          toast.error(errorToString(error));
          return;
        });
    });
  };

  return (
    <Container fluid>
      <Row style={{ width: "1380px" }}>
        <Col md="8">
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <CardHeader>
                    <h4 style={{ marginTop: "2px" }}>
                      Enter Bank Accounts Details:
                    </h4>
                  </CardHeader>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <Form.Group>
                      <label>Select Bank Name </label>
                      <SelectBank
                        name="bankName"
                        value={formik.values.refBank}
                        onBankChange={handleBankChange}
                      ></SelectBank>
                      {formik.errors.refBank && formik.touched.refBank && (
                        <label style={{ color: "red" }}>
                          {formik.errors.refBank}
                        </label>
                      )}
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="4">
                    <Form.Group>
                      <label>Sort Code</label>
                      <Form.Control
                        name="sortCode"
                        type="text"
                        value={formik.values.sortCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></Form.Control>
                      {formik.errors.sortCode && formik.touched.sortCode && (
                        <label style={{ color: "red" }}>
                          {formik.errors.sortCode}
                        </label>
                      )}
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="4">
                    <Form.Group>
                      <label>Account Number</label>
                      <Form.Control
                        type="text"
                        name="accountNo"
                        value={formik.values.accountNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></Form.Control>
                      {formik.errors.accountNo && formik.touched.accountNo && (
                        <label style={{ color: "red" }}>
                          {formik.errors.accountNo}
                        </label>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <Form.Group>
                      <label>Country</label>
                      <SelectionCountryList
                        name="country"
                        value={formik.values.country}
                        onCountryChange={handleCountryChange}
                      ></SelectionCountryList>
                      {formik.errors.country && formik.touched.country && (
                        <label style={{ color: "red" }}>
                          {formik.errors.country}
                        </label>
                      )}
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="4">
                    <Form.Group>
                      <label>Currency</label>
                      <SelectionCurrency
                        name="currency"
                        value={formik.values.currency}
                        onCurrencyChange={handleCurrencyChange}
                      ></SelectionCurrency>
                      {formik.errors.currency && formik.touched.currency && (
                        <label style={{ color: "red" }}>
                          {formik.errors.currency}
                        </label>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <label>Account Description</label>
                      <Form.Control
                        type="text"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></Form.Control>
                      {formik.errors.description &&
                        formik.touched.description && (
                          <label style={{ color: "red" }}>
                            {formik.errors.description}
                          </label>
                        )}
                    </Form.Group>
                  </Col>
                </Row>

                <div className="clearfix"></div>
              </Form>
              <Button
                className="btn-fill pull-right"
                onClick={formik.handleSubmit}
              >
                Save Bank Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h4>List of Your Bank Accounts</h4>
            </CardHeader>
            <Card.Body>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserBankAccount;
