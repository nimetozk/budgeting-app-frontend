import react, { useEffect, useState } from "react";
import { Row, Table, Col, Card } from "react-bootstrap";
import SelectionCategory from "components/Controls/SelectionCategory";
import moment from "moment";
import { toast } from "react-toastify";
import { CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import MapButtonEdit from "components/Map/MapButtonEdit";
import to from "await-to-js";
import service from "services/service";
import { errorToString } from "utility";

moment.locale("en-gb");

const TransactionsTable = ({
  transactions,
  onTransactionChange,
  bankAccount,
}) => {
  const history = useHistory();

  const [currency, setCurrency] = useState([]);

  const getCurrency = async (userBankAccount) => {
    const [error, response] = await to(service.getCurrency(userBankAccount));

    if (error) {
      toast.error(errorToString(error));
      return;
    }

    switch (response.data.currency) {
      case "GBP":
        setCurrency("£");
        break;
      case "EUR":
        setCurrency("€");
        break;
      case "USD":
        setCurrency("$");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (!bankAccount) return;
    getCurrency(bankAccount);
  }, [bankAccount]);

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
                    <th>Currency</th>
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
                      <td style={{ textAlign: "center" }}>
                        {moment(transaction.transactionDate).format(
                          "DD/MM/YYYY"
                        )}
                      </td>
                      <td>{transaction.transactionType.toUpperCase()}</td>
                      <td style={{ textAlign: "center" }}>{currency}</td>
                      <td>{transaction.transactionAmount}</td>
                      <td style={{ textAlign: "center" }}>
                        {transaction.externalCode}
                      </td>
                      <td style={{ width: "250px" }}>
                        {transaction.description}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <MapButtonEdit
                          onPlaceLabelChanged={(placeLabel) =>
                            handlePlaceLabelChange(placeLabel, index)
                          }
                          placeLabel={transaction.refPlaceLabel}
                          transactionId={transaction._id}
                        ></MapButtonEdit>
                      </td>
                      <td style={{ width: "220px" }}>
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
