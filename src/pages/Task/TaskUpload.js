import react from "react";
import { CardHeader } from "reactstrap";
import Upload from "rc-upload";

import { Card, Form, Row, Col } from "react-bootstrap";

const TaskUpload = ({ entity, OnTextChange, uploadFile }) => {
  return (
    <Row>
      <Col>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Row md="10">
                    <CardHeader>
                      <Card.Title as="h4" style={{ margin: "0px" }}>
                        Upload Transactions
                      </Card.Title>
                    </CardHeader>
                  </Row>
                  <Row className="pr" md="10" style={{ marginLeft: "2px" }}>
                    <Form.Group style={{ marginTop: "20px", width: "100%" }}>
                      <label>Upload Date:</label>
                      <Form.Control
                        name="uploadDate"
                        value={entity.uploadDate}
                        placeholder={new Date().toUTCString()}
                        type="text"
                        readOnly
                        onChange={OnTextChange}
                      ></Form.Control>
                    </Form.Group>
                  </Row>
                </Col>
                <Col style={{ width: "100%" }}>
                  <Upload
                    {...uploadFile}
                    value={entity.fileName}
                    name="myTsvFile"
                  >
                    <a>Drag Your '.txt' (Tab-Delimited) File</a>
                  </Upload>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TaskUpload;
