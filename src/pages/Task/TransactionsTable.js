import react from "react";

import { Row, Table } from "react-bootstrap";
import SelectionCategory from "components/Controls/SelectionCategory";
import moment from "moment";
import { toast } from "react-toastify";

moment.locale("en-gb");

const TransactionsTable = ({ transactions, onTransactionChange }) => {
  const handleCategoryChange = (option, index) => {
    console.log("combo change", option, index);
    const transaction = { ...transactions[index] };
    transaction.refCategory = { _id: option.value, name: option.label };
    onTransactionChange(transaction, index);
    toast.success("Category is updated!", { delay: 0 });
  };

  return (
    <>
      <Row
        style={{
          padding: "10px",
          backgroundColor: "white",
          margin: "1px",
          border: "1px solid #e1e1e1",
        }}
      >
        <h4>Edit: Transactions</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>External Code</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td hidden>{transaction._id}</td>
                <td>
                  {moment(transaction.transactionDate).format("DD/MM/YYYY")}
                </td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.transactionAmount}</td>
                <td>{transaction.externalCode}</td>
                <td>{transaction.description}</td>
                <td style={{ width: "300px" }}>
                  <SelectionCategory
                    value={{
                      value: transaction.refCategory._id,
                      label: transaction.refCategory.name,
                    }}
                    onCategoryChange={(option) => {
                      handleCategoryChange(option, index);
                    }}
                  ></SelectionCategory>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default TransactionsTable;
