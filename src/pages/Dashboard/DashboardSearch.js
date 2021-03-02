import react, { useState } from "react";
import { CardBody, CardHeader } from "reactstrap";
import SelectBank from "components/Controls/SelectionBank";
import moment from "moment";

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

const DashboardSearch = (
  handleDateChange,
  handleBtnSearch,
  handleBankChange,
  selectedBanks,
  firstDate,
  lastDate
) => {
  const [firstDateChecked, setFirstDateCheck] = useState(false);
  const [lastDateChecked, setLastDateCheck] = useState(false);

  const handleDateCheck = (event) => {
    console.log(event.target.name, event.target.checked);
    switch (event.target.name) {
      case "firstDateCheck":
        console.log("first check");
        setFirstDateCheck(event.target.checked);
        break;
      case "lastDateCheck":
        console.log("last check");
        setLastDateCheck(event.target.checked);
        break;

      default:
        break;
    }
  };

  return (
    <Row>
      <Col>
        <Card style={{ display: "flex", justifyContent: "space-evenly" }}>
          <CardHeader>
            <Card.Title as="h4">Dashboard Page</Card.Title>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col className="pr-1" md="3">
                  <Form.Group style={{ paddingRight: "25px" }}>
                    <label>Bank Name:</label>
                    <SelectBank
                      allBanks
                      value={selectedBanks}
                      onBankChange={() => handleBankChange}
                      style={{ paddingRight: "40px" }}
                    ></SelectBank>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="4">
                  <label style={{ paddingLeft: "43px" }}>From Date:</label>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="firstDateCheck"
                      checked={firstDateChecked}
                      onChange={handleDateCheck}
                      style={{ marginTop: "12px" }}
                    ></input>
                    <Col>
                      <Form.Control
                        type="date"
                        name="firstDate"
                        value={firstDate}
                        onChange={() => handleDateChange}
                        disabled={!firstDateChecked}
                      ></Form.Control>
                    </Col>
                  </Col>
                </Col>

                <Col className="pr-1" md="4">
                  <label style={{ paddingLeft: "43px" }}>To Date:</label>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="lastDateCheck"
                      checked={lastDateChecked}
                      onChange={handleDateCheck}
                      style={{ marginTop: "12px" }}
                    ></input>

                    <Col>
                      <Form.Control
                        type="date"
                        name="lastDate"
                        value={lastDate}
                        onChange={() => handleDateChange}
                        disabled={!lastDateChecked}
                      ></Form.Control>
                    </Col>
                  </Col>
                </Col>

                <Col className="pr-1" md="1" style={{ paddingTop: "30px" }}>
                  <Button
                    onClick={() => handleBtnSearch}
                    style={{ height: "40px" }}
                  >
                    Filter
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardSearch;
