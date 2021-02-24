import to from "await-to-js";
import react, { useState, useEffect } from "react";
import service from "../../services/service";
import { Row, Table } from "react-bootstrap";

const TransactionsTable = ({ transactions }) => {
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
              <tr>
                <td hidden>{transaction._id}</td>
                <td>{transaction.transactionDate}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.transactionAmount}</td>
                <td>{transaction.externalCode}</td>
                <td>{transaction.description}</td>
                <td>{transaction.refCategory.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default TransactionsTable;
