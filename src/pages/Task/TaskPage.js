import React from "react";

import { Link } from "react-router-dom";

import {
  Table,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const TaskPage = () => {
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
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Link to="/tasks">
              <span></span>
              <button
                class="btn btn-primary"
                type="button"
                style={{
                  backgroundColor: "rgb(52, 114, 247)",
                  color: "white",
                  borderColor: "white",
                }}
              >
                Tasks
              </button>
            </Link>
          </div>
        </Row>
        <Row>
          <Col style={{ width: "100%" }}>
            <Card>
              <Card.Header>
                <Card.Title as="h4">New Task: Upload Bank Statement</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Task Name: </label>
                        <Form.Control
                          placeholder="Upload Bank Statement"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Bank Name:</label>
                        <Form.Control
                          placeholder="LLoyds Sutton"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>ACCOUNT TYPE????</label>
                        <Form.Control
                          placeholder="Debit/Credit"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Account Number:</label>
                        <Form.Control
                          placeholder="12-34-56"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Sort Code:</label>
                        <Form.Control
                          placeholder="123456"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Upload Date:</label>
                        <Form.Control
                          placeholder="01/01/2021"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Currency:</label>
                        <Form.Control
                          placeholder="GBP"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Country:</label>
                        <Form.Control
                          placeholder="England"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pl" md="6">
                      <Form.Group>
                        <label>Choose a file to upload:</label>
                        <label className="file-label">
                          <span className="file-cta">
                            <span
                              className="file-icon"
                              style={{
                                padding: "10px",
                                flexDirection: "column",
                                margin: "0px",
                              }}
                            >
                              <i className="fas fa-upload"></i>
                            </span>
                            <input
                              style={{
                                padding: "5px",
                                flexDirection: "column",
                                margin: "0px",
                              }}
                              className="file-input"
                              type="file"
                              name="resume"
                            />
                          </span>
                          <span className="file-name"></span>
                        </label>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="
                    btn
                    btn-outline-secondary"
                    type="submit"
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

        <Row
          style={{
            padding: "10px",
            backgroundColor: "white",
            margin: "3px",
            border: "1px solid #e1e1e1",
          }}
        >
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
      </Container>
    </>
  );
};

export default TaskPage;
