import SelectBank from "components/Controls/SelectionBank";
import react, { useState, useEffect } from "react";
import { Button, Row, Form, Col, Card } from "react-bootstrap";
import { CardBody, CardHeader } from "reactstrap";

import moment from "moment";
import service from "services/service";
import to from "await-to-js";
import CategoryTransactionChart from "components/Charts/CategoryTransactionChart";
import CategoryTransactionTable from "components/Charts/CategoryTransactionTable";
import BudgetBarChart from "components/Charts/BudgetBarChart";
import { toast } from "react-toastify";
import { errorToString } from "utility";
import { DashboardMap } from "components/Map/DashboardMap";

const DashboardPage = () => {
  const [selectedBanks, setSelectedBanks] = useState({
    value: null,
    label: "All Banks",
  });

  const [firstDate, setFirstDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [lastDate, setLastDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [locationTransactionList, setLocationTransactionList] = useState([]);

  const [firstDateChecked, setFirstDateCheck] = useState(false);
  const [lastDateChecked, setLastDateCheck] = useState(false);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);

  const getData = (income) => {
    return to(
      service.getCategoryGroupTransactions(
        income,
        selectedBanks.value,
        firstDateChecked ? firstDate : null,
        lastDateChecked ? lastDate : null
      )
    );
  };

  useEffect(async () => {
    const [error, response] = await to(service.getLocationTotalAmount());
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    setLocationTransactionList(response.data);
  }, []);

  useEffect(async () => {
    const [incomeError, incomeResponse] = await getData(true);
    const [expenseError, expenseResponse] = await getData(false);

    if (incomeError) {
      toast.error(errorToString(incomeError));
      return;
    }

    if (expenseError) {
      toast.error(errorToString(expenseError));
      return;
    }

    setIncomeTransactions(incomeResponse.data);
    setExpenseTransactions(expenseResponse.data);
  }, []);

  const handleBankChange = (option) => {
    setSelectedBanks({ ...option });
  };

  const handleBtnSearch = async () => {
    const bankId = selectedBanks.value;
    const startDate = firstDateChecked ? firstDate : null;
    const endDate = lastDateChecked ? lastDate : null;

    const [error, responseIncome] = await to(
      service.getCategoryGroupTransactions(true, bankId, startDate, endDate)
    );

    if (error) {
      toast.error(errorToString(error));
      return;
    }

    setIncomeTransactions(responseIncome.data);

    const [error2, responseExpense] = await to(
      service.getCategoryGroupTransactions(false, bankId, startDate, endDate)
    );

    if (error2) {
      toast.error(errorToString(error2));
      return;
    }

    setExpenseTransactions(responseExpense.data);
  };

  const handleDateCheck = (event) => {
    switch (event.target.name) {
      case "firstDateCheck":
        setFirstDateCheck(event.target.checked);
        break;
      case "lastDateCheck":
        setLastDateCheck(event.target.checked);
        break;

      default:
        break;
    }
  };
  const handleDateChange = (event) => {
    switch (event.target.name) {
      case "firstDate":
        setFirstDate(event.target.value);
        break;
      case "lastDate":
        setLastDate(event.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4>Filters: </h4>
              <Form>
                <Row>
                  <Col className="pr-1" md="3">
                    <Form.Group style={{ paddingRight: "25px" }}>
                      <label>Bank Name:</label>
                      <SelectBank
                        allBanks
                        value={selectedBanks}
                        onBankChange={handleBankChange}
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
                          onChange={handleDateChange}
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
                          onChange={handleDateChange}
                          disabled={!lastDateChecked}
                        ></Form.Control>
                      </Col>
                    </Col>
                  </Col>

                  <Col className="pr-1" md="1" style={{ paddingTop: "30px" }}>
                    <Button
                      onClick={handleBtnSearch}
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

      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <h4>Your Incomings</h4>
                  <CategoryTransactionChart
                    transactionGroups={incomeTransactions}
                  ></CategoryTransactionChart>
                  <CategoryTransactionTable
                    transactionGroups={incomeTransactions}
                  ></CategoryTransactionTable>
                </Col>
                <Col>
                  <h4>Your Spendings</h4>
                  <CategoryTransactionChart
                    transactionGroups={expenseTransactions}
                  ></CategoryTransactionChart>
                  <CategoryTransactionTable
                    transactionGroups={expenseTransactions}
                  ></CategoryTransactionTable>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <h4>Budget Trend Analysis:</h4>
                  <BudgetBarChart></BudgetBarChart>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <h4>Dashboard Map:</h4>
                  <DashboardMap
                    zoom={13}
                    center={{
                      lng: -0.042458496093746856,
                      lat: 51.554669354403345,
                    }}
                    list={locationTransactionList}
                  ></DashboardMap>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
