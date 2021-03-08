import react, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { to } from "await-to-js";
import service from "services/service";
import SelectionYear from "components/Controls/SelectionYear";
import { Row, Col } from "react-bootstrap";

const BudgetBarChart = (props) => {
  const { chartTitle } = props;
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
      alert(monthError);
      return;
    }
    if (!monthResponse.data || !monthResponse.data.length) {
      setChartData([]);
      return;
    }

    const tempData = [["Month", "In", "Out"]];
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
        <Col>
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
              width={"500px"}
              height={"300px"}
              chartType="ComboChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                title: "Monthly Coffee Production by Country",
                vAxis: { title: "Cups" },
                hAxis: { title: "Month" },
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
