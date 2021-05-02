/**
 * This is the table created to display the list of baks to the admin.
 *
 * Throughout the implementation, I have used react documentation to understand different types of React hooks.
 * https://reactjs.org/
 */

import react, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import { to } from "await-to-js";
import service from "../../services/service";
import Box from "../../components/Box";
import { toast } from "react-toastify";
import { errorToString } from "utility";

const BankListPage = () => {
  const [bankList, setBankList] = useState([]);
  const history = useHistory();

  const getData = async () => {
    const [error, response] = await to(service.getBankList());
    if (error) {
      toast.error(errorToString(error));
      return;
    }
    setBankList(response.data);
  };

  const handleBankEdit = (id) => {
    history.replace("/banks/formStatus/edit/id/" + id);
  };

  const handleNewBank = () => {
    history.replace("/banks/formStatus/new/id/0");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Box>
                <Button
                  variant="primary"
                  onClick={handleNewBank}
                  style={{
                    backgroundColor: "rgb(52, 114, 247)",
                    color: "white",
                    borderColor: "white",
                  }}
                >
                  Add New Bank
                </Button>
              </Box>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {bankList &&
                    bankList.map((bank) => (
                      <tr key={bank._id}>
                        <td>{bank._id}</td>
                        <td>{bank.name}</td>
                        <td
                          style={{
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Button
                            size="sm"
                            onClick={() => handleBankEdit(bank._id)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BankListPage;
