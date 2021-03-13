import react, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { to } from "await-to-js";
import service from "services/service";
import SelectionYear from "components/Controls/SelectionYear";
import { Row, Col } from "react-bootstrap";
import { errorToString } from "utility";
import { toast } from "react-toastify";

const BudgetBarChart = (props) => {
  const [chartData, setChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState({
    value: 2021,
    label: "2021",
  });

  const getMonthlyData = () => {
    return to(service.getMonthGroupTransactions(selectedYear.value));
  };

  useEffect(async () => {
    const [monthError, monthResponse] = await getMonthlyData();

    if (monthError) {
      toast.error(errorToString(monthError));
      return;
    }

    if (!monthResponse.data || !monthResponse.data.length) {
      setChartData([]);
      return;
    }

    const tempData = [["Month", "Incoming", "Spending"]];
    for (const groupItem of monthResponse.data)
      tempData.push([groupItem.month, groupItem.income, groupItem.expense]);

    setChartData(tempData);
  }, [selectedYear]);

  const handleYearChange = (option) => {
    setSelectedYear({ ...option });
  };
  return (
    <div>
      <Row>
        <Col className="pl" md="2">
          <h5>Choose a Year: </h5>
          <SelectionYear
            value={selectedYear}
            onYearChange={handleYearChange}
          ></SelectionYear>
        </Col>
      </Row>
      {chartData && chartData.length > 0 && (
        <Row>
          <Col>
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="ComboChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                vAxis: { title: "Amount" },
                seriesType: "bars",
                series: { 5: { type: "line" } },
              }}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BudgetBarChart;
