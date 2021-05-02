/**
  A table chart created to give users insight into their budgets. 
  The component is used on the dashboard page.
*/

import react from "react";
import { Table } from "react-bootstrap";

const CategoryTransactionTable = (props) => {
  const { transactionGroups } = props;

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Category</th>
          <th>Number of Transactions</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactionGroups &&
          transactionGroups.map((groupItem, index) => (
            <tr key={index}>
              <td>{groupItem.category}</td>
              <td>{groupItem.count}</td>
              <td>{groupItem.totalAmount}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default CategoryTransactionTable;
