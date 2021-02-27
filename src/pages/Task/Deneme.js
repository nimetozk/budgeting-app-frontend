import react from "react";
import { CardHeader } from "reactstrap";
import Upload from "rc-upload";

import { Card, Form, Row, Col } from "react-bootstrap";

const TaskUpload = ({ entity, handleTextChange, uploadFile }) => {
  return (
    <Row>
      <Col>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader>
            <Card.Title as="h4" style={{ margin: "0px" }}>
              Upload Transactions
            </Card.Title>
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
  );
};

export default TaskUpload;
