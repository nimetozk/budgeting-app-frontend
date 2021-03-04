import SelectBank from "components/Controls/SelectionBank";
import react, { useState, useEffect } from "react";
import { Button, Row, Form, Col, Card } from "react-bootstrap";
import { CardBody, CardHeader } from "reactstrap";

import moment from "moment";
import service from "services/service";
import to from "await-to-js";
import CategoryTransactionChart from "components/Charts/CategoryTransactionChart";

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

  const [firstDateChecked, setFirstDateCheck] = useState(false);
  const [lastDateChecked, setLastDateCheck] = useState(false);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  //
  const [monthTransactions, setMonthTransactions] = useState([]);

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

  //
  const getMonthlyData = () => {
    return to(
      service.getMonthGroupTransactions(
        selectedBanks.value,
        firstDateChecked ? firstDate : null,
        lastDateChecked ? lastDate : null
      )
    );
  };

  useEffect(async () => {
    const [incomeError, incomeResponse] = await getData(true);
    const [expenseError, expenseResponse] = await getData(false);
    //
    const [monthError, monthResponse] = await getMonthlyData();

    if (incomeError) {
      alert(incomeError);
      return;
    }

    if (expenseError) {
      alert(expenseError);
      return;
    }

    //
    if (monthError) {
      alert(monthError);
      return;
    }

    setIncomeTransactions(incomeResponse.data);
    setExpenseTransactions(expenseResponse.data);

    //
    setMonthTransactions(monthResponse.data);
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
    const [error2, responseExpense] = await to(
      service.getCategoryGroupTransactions(true, bankId, startDate, endDate)
    );
  };

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
          <CategoryTransactionChart
            transactionGroups={incomeTransactions}
          ></CategoryTransactionChart>
        </Col>
        <Col>
          <CategoryTransactionChart
            transactionGroups={expenseTransactions}
          ></CategoryTransactionChart>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
