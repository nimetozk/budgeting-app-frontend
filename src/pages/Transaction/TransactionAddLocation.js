import react, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import { Map, AsyncMap } from "../../components/Map/map";
import { toast } from "react-toastify";
import { errorToString } from "utility";
import MapButtonEdit from "../../components/Map/MapButtonEdit";

const TransactionsAddLocation = () => {
  const [placeLabel, setPlaceLabel] = useState({
    name: "new",
    location: { type: "Point", coordinates: [-0.21, 51.5] },
  });

  const handlePlaceLabelChange = (newPlaceLabel) => {
    setPlaceLabel(newPlaceLabel);
  };

  return (
    <div>
      <Row>
        <Col>
          <Card style={{ height: "670px" }}>
            <Card.Body>
              <Row>
                <Col>
                  <h4>Edit Your Transaction: </h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>Date</label>
                        <Form.Control
                          disabled="true"
                          type="text"
                          name="transactionDate"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>Type</label>
                        <Form.Control
                          disabled="true"
                          type="text"
                          name="transactionType"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>Amount</label>
                        <Form.Control
                          disabled="true"
                          type="text"
                          name="transactionAmount"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>Description</label>
                        <Form.Control
                          disabled="true"
                          type="text"
                          name="description"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>External Code</label>
                        <Form.Control
                          disabled="true"
                          type="text"
                          name="externalCode"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>Category</label>
                        <Form.Control
                          disabled="true"
                          type="text"
                          name="refCategory"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>Longitude</label>
                        <Form.Control
                          type="text"
                          name="longitude"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>Latitude</label>
                        <Form.Control
                          type="text"
                          name="latitude"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>Name of the Location:</label>
                        <Form.Control
                          type="text"
                          name="refPlaceLabel"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Button
                          style={{
                            marginTop: "26px",
                            width: "100%",
                            height: "40px",
                          }}
                        >
                          Save
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <label>
                    Drop a pin to choose the location of the transaction:
                  </label>
                  <div></div>
                </Col>
              </Row>
              <Row>
                <MapButtonEdit
                  onPlaceLabelChanged={handlePlaceLabelChange}
                  placeLabel={placeLabel}
                ></MapButtonEdit>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionsAddLocation;
