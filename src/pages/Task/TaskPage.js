/**
 * This page renders the 'Task' page where the list of tasks, option for uploading the tasks and table of transactions are displayed.
 *
 * Throughout the implementation, I have used react documentation to understand different types of React hooks.
 * https://reactjs.org/
 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SelectionBankAccount from "components/Controls/SelectionBankAccounts";
import SelectionBank from "components/Controls/SelectionBank";
import service from "../../services/service";
import { to } from "await-to-js";
import TransactionsTable from "./TransactionsTable";
import TaskUpload from "./TaskUpload";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { errorToString } from "utility";
import { useConfirmation } from "../../components/Dialog/dialog-provider";

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
  const [bankInfoDisabled, setBankInfoDisabled] = useState(false);

  const confirm = useConfirmation();

  const getTask = async (id) => {
    const [error, response] = await to(service.getTaskById(id));
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    setEntity(response.data);
    setBankOption({
      value: response.data.refBankAccount.refBank._id,
      label: response.data.refBankAccount.refBank.name,
    });

    setBankAccountOption({
      value: response.data.refBankAccount._id,
      label: ` ${response.data.refBankAccount.sortCode} ${response.data.refBankAccount.accountNo}`,
    });

    getTransactions(response.data._id);
  };

  useEffect(async () => {
    if (!id || id === "0") return;
    getTask(id);
  }, [id]);

  useEffect(() => {
    setBankInfoDisabled((transactions && transactions.length) ?? false);
  }, [transactions]);

  const confirmSave = async () => {
    const task = { ...entity, refBankAccount: bankAccountOption.value };

    if (formStatus === "new") {
      const [error, response] = await to(service.insertTask(task));
      if (error) {
        toast.error(errorToString(error));
        return;
      }

      setEntity(response.data);
      setFormStatus("edit");
    } else {
      const [error, response] = await to(service.updateTask(task));
      if (error) {
        toast.error(errorToString(error));
        return;
      }

      setEntity(response.data);
    }

    toast.success("Task is saved successfuly !");
  };

  const handleSave = async () => {
    confirm({
      title: "Save Task",
      description: "Do you want to process?",
    }).then(() => {
      confirmSave();
    });
  };

  const getTransactions = async (taskId) => {
    const [error, response] = await to(service.getTransactionsByTaskId(taskId));
    if (error) {
      toast.error(errorToString(error));
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
        setEntity({
          ...entity,
          uploadDate: event.target.value,
        });

        break;

      default:
        break;
    }
  };

  const uploadFile = {
    // action: "http://localhost:4000/api/transaction/upload/" + entity._id,
    action:
      "https://nimet-budget-api.herokuapp.com/api/transaction/upload/" +
      entity._id,
    type: "drag",

    headers: {
      Authorization: localStorage.getItem("token"),
    },

    beforeUpload(file) {
      console.log("beforeUpload", file.name);
    },
    onStart: (file) => {
      console.log("onStart", file.name);
    },
    onSuccess(file) {
      getTask(entity._id);
      getTransactions(entity._id);
      toast.success(" Your file is uploaded successfully, scroll down ! ", {
        delay: 0,
      });
      console.log("onSuccess", file);
    },
    onProgress(step, file) {
      console.log("onProgress", Math.round(step.percent), file.name);
    },
    onError(err) {
      console.log("onError", err);
      toast.error("An error occured, check the format of the file ! ", {
        delay: 0,
      });
    },
    style: {
      display: "inline-block",
      width: 570,
      height: 120,
      background: "#eee",
      border: "1px dashed black",
      margin: "15px 5px",
      textAlign: "center",
    },
  };

  const handleFileSubmit = async (task, file) => {
    formData = new FormData();
    formData.append("myTsvFile", file);
    if (!file) {
      const [error, response] = await to(service.uploadFile(task, file));
      if (error) {
        toast.error(errorToString(error));
        return;
      }

      setFormData(response.data);
    }
  };

  const handleTransactionChange = async (transaction, index) => {
    transactions[index] = transaction;
    const [error, response] = await to(
      service.partialTransactionUpdate(transaction, transaction._id)
    );
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    toast.success("Transaction is updated !");
    setTransactions([...transactions]);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <h4>Enter Task Details:</h4>
                    </Col>
                  </Row>
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
                          disabled={bankInfoDisabled}
                          value={bankOption}
                          onBankChange={handleBankChange}
                        ></SelectionBank>
                      </Form.Group>
                    </Col>
                    <Col className="pr" md="4">
                      <Form.Group>
                        <label>Sort Code | Account Number:</label>
                        <SelectionBankAccount
                          disabled={bankInfoDisabled}
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
                    Save Task
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {formStatus === "edit" && (
          <TaskUpload
            entity={entity}
            OnTextChange={handleTextChange}
            uploadFile={uploadFile}
          ></TaskUpload>
        )}

        {formStatus === "edit" && (
          <TransactionsTable
            transactions={transactions}
            onTransactionChange={handleTransactionChange}
            bankAccount={bankAccountOption.value}
          ></TransactionsTable>
        )}
      </Container>
    </>
  );
};

export default TaskPage;
