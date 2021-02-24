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

  useEffect(async () => {
    if (!id || id === "0") return;

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

  const handleBankChange = (option) => {
    setBankOption({ ...option });
    setBankAccountOption({ value: "", label: "" });
  };

  const handleBankAccountChange = (option) => {
    setBankAccountOption({ ...option });
  };

  const handleTextChange = (event) => {
    setEntity({ ...entity, name: event.target.value });
  };

  return (
    <>
      <Container fluid>
        <Row
          style={{
            padding: "20px 0px",
            paddingLeft: "0px",
            flexDirection: "column",
            margin: "0px",
          }}
        ></Row>
        <Row>
          <Col style={{ width: "100%" }}>
            <Card>
              <Card.Header>
                <Card.Title as="h4">New Task: Upload Bank Statement</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
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
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Bank Name:</label>
                        <SelectionBank
                          value={bankOption}
                          onBankChange={handleBankChange}
                        ></SelectionBank>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
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

                  <Row>
                    <Col className="pl" md="4">
                      <Form.Group>
                        <label>Upload Date:</label>
                        <Form.Control
                          value={entity.uploadDate}
                          placeholder="01/01/2021"
                          type="date"
                        ></Form.Control>
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
                    Add Task
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {formStatus === "edit" && (
          <Row
            style={{
              padding: "10px",
              backgroundColor: "white",
              margin: "2px",
              border: "1px solid #e1e1e1",
            }}
          >
            <Upload />
            <h4>Edit: Transactions</h4>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Sort Code</th>
                  <th>Account Number</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Currency</th>
                  <th>Amount</th>
                  <th>External Code</th>
                  <th>Reference</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Row>
        )}
      </Container>
    </>
  );
};

export default TaskPage;
