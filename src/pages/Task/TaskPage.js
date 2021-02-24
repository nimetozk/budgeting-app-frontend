import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import SelectionBank from "components/Controls/SelectionBank";

import service from "../../services/service";

import { to } from "await-to-js";
import Upload from "rc-upload";

import {
  Table,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import SelectionBankAccount from "components/Controls/SelectionBankAccounts";
import { CardHeader } from "reactstrap";
import TransactionsTable from "./TransactionsTable";

const TaskPage = () => {
  const [bankOption, setBankOption] = useState({ value: "", label: "" });
  const [bankAccountOption, setBankAccountOption] = useState({
    value: "",
    label: "",
  });
  const [entity, setEntity] = useState({
    id: "",
    name: "",
    uploadDate: "",
    fileName: "",
    status: "",
    refBankAccount: "",
  });

  const params = useParams();
  const [formStatus, setFormStatus] = useState(params.formStatus);
  const [id, setId] = useState(params.id);
  const [transactions, setTransactions] = useState([]);

  const getTask = async (id) => {
    const [error, response] = await to(service.getTaskById(id));
    if (error) {
      alert(error);
      return;
    }

    setEntity(response.data);
    setBankOption({
      value: response.data.refBankAccount.refBank._id,
      label: response.data.refBankAccount.refBank.name,
    });
    setBankAccountOption({
      value: response.data.refBankAccount._id,
      label: `${response.data.refBankAccount.sortCode} ${response.data.refBankAccount.accountNo}`,
    });

    getTransactions(response.data._id);
  };

  useEffect(async () => {
    if (!id || id === "0") return;
    getTask(id);
  }, [id]);

  const handleSave = async () => {
    const task = { ...entity, refBankAccount: bankAccountOption.value };

    if (formStatus === "new") {
      const [error, response] = await to(service.insertTask(task));
      if (error) {
        alert(error);
        return;
      }

      setEntity(response.data);
      setId(response.data._id);
      setFormStatus("edit");
    } else {
      // update yapılacak
    }
  };

  const getTransactions = async (taskId) => {
    const [error, response] = await to(service.getTransactionsByTaskId(taskId));
    if (error) {
      alert(error);
      return;
    }

    setTransactions(response.data);
  };

  const handleBankChange = (option) => {
    setBankOption({ ...option });
    setBankAccountOption({ value: "", label: "" });
  };

  const handleBankAccountChange = (option) => {
    setBankAccountOption({ ...option });
  };

  const handleTextChange = (event) => {
    switch (event.target.name) {
      case "name":
        setEntity({ ...entity, name: event.target.value });
        break;

      case "uploadDate":
        setEntity({ ...entity, uploadDate: event.target.value });
        break;

      default:
        break;
    }
  };

  const uploadFile = {
    action: "http://localhost:4000/api/transaction/upload/" + entity._id,
    type: "drag",

    headers: {
      Authorization: localStorage.getItem("token"),
    },

    beforeUpload(file) {
      console.log("beforeUpload", file.name);

      /*
      const formData = new FormData();
      formData.append("myTsvFile", file);
      return new Promise((resolve) => resolve(formData));
      */
    },
    onStart: (file) => {
      console.log("onStart", file.name);
    },
    onSuccess(file) {
      getTask(entity._id);
      getTransactions(entity._id);
      console.log("onSuccess", file);
    },
    onProgress(step, file) {
      console.log("onProgress", Math.round(step.percent), file.name);
    },
    onError(err) {
      console.log("onError", err);
    },
    style: {
      display: "inline-block",
      width: 370,
      height: 50,
      background: "#eee",
      border: "1px dashed black",
      marginBottom: "10px",
      textAlign: "center",
    },
    // openFileDialogOnClick: false,
  };

  //get current task id
  const handleFileSubmit = async (task, file) => {
    formData = new FormData();
    formData.append("myTsvFile", file);
    if (!file) {
      const [error, response] = await to(service.uploadFile(task, file));
      if (error) {
        alert(error);
        return;
      }

      setFormData(response.data);
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">New Task: Upload Bank Statement</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr" md="4">
                      <Form.Group>
                        <label>Task Name: </label>
                        <Form.Control
                          value={entity.name}
                          name="name"
                          onChange={handleTextChange}
                          placeholder="Upload Bank Statement"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl" md="4">
                      <Form.Group>
                        <label>Bank Name:</label>
                        <SelectionBank
                          value={bankOption}
                          onBankChange={handleBankChange}
                        ></SelectionBank>
                      </Form.Group>
                    </Col>
                    <Col className="pr" md="4">
                      <Form.Group>
                        <label>Bank Account Description:</label>
                        <SelectionBankAccount
                          value={bankAccountOption}
                          onBankAccountChange={handleBankAccountChange}
                          bankId={bankOption.value}
                        ></SelectionBankAccount>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="
                    btn
                    btn-outline-secondary"
                    onClick={handleSave}
                    style={{
                      cursor: "pointer",
                      borderColor: "#3472F7",
                    }}
                  >
                    Add New Task
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {formStatus === "edit" && (
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Card.Title as="h4">Upload Transactions</Card.Title>
                </CardHeader>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pl" md="4">
                        <Form.Group>
                          <label>Upload Date:</label>
                          <Form.Control
                            name="uploadDate"
                            value={entity.uploadDate}
                            placeholder="01/01/2021"
                            type="text"
                            onChange={handleTextChange}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Upload
                          {...uploadFile}
                          value={entity.fileName}
                          name="myTsvFile"
                        >
                          <a>Drag Your File</a>
                        </Upload>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {formStatus === "edit" && (
          <TransactionsTable transactions={transactions}></TransactionsTable>
        )}
      </Container>
    </>
  );
};

export default TaskPage;
