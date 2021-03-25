import react from "react";
import { Row, Table, Col, Card } from "react-bootstrap";
import SelectionCategory from "components/Controls/SelectionCategory";
import moment from "moment";
import { toast } from "react-toastify";
import { CardBody } from "reactstrap";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MapButtonEdit from "components/Map/MapButtonEdit";

moment.locale("en-gb");

const TransactionsTable = ({ transactions, onTransactionChange }) => {
  const history = useHistory();

  const handleCategoryChange = (option, index) => {
    const transaction = { ...transactions[index] };
    transaction.refCategory = { _id: option.value, name: option.label };
    onTransactionChange(transaction, index);
  };

  const handlePlaceLabelChange = (placeLabel, index) => {
    const transaction = { ...transactions[index] };
    transaction.refPlaceLabel = placeLabel;
    onTransactionChange(transaction, index);
  };

  console.log("transactions", transactions);
  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4>Transactions</h4>
              <h5>You can change the categories of the transactions!</h5>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>External Code</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td hidden>{transaction._id}</td>
                      <td>
                        {moment(transaction.transactionDate).format(
                          "DD/MM/YYYY"
                        )}
                      </td>
                      <td>{transaction.transactionType}</td>
                      <td>{transaction.transactionAmount}</td>
                      <td>{transaction.externalCode}</td>
                      <td>{transaction.description}</td>
                      <td
                        style={{
                          padding: "10px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Row>
                          <MapButtonEdit
                            onPlaceLabelChanged={(placeLabel) =>
                              handlePlaceLabelChange(placeLabel, index)
                            }
                            placeLabel={transaction.refPlaceLabel}
                          ></MapButtonEdit>
                        </Row>
                      </td>
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionsTable;
