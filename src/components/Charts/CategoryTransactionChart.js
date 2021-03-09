import react, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const CategoryTransactionChart = (props) => {
  const { transactionGroups } = props;
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!transactionGroups) return;

    const tempData = [["Category", "Sum of the TransactionAmount by category"]];

    for (const groupItem of transactionGroups)
      tempData.push([groupItem.category, groupItem.totalAmount]);

    setChartData(tempData);
  }, [transactionGroups]);

  return (
    <Chart
      width={"500px"}
      height={"350px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        is3D: true,
        fontName: "Roboto",
        fontSize: 16,
        legend: {
          textStyle: {
            color: "black",
            fontSize: 13,
            fontName: "Roboto",
            bold: true,
          },
        },
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
};

export default CategoryTransactionChart;
