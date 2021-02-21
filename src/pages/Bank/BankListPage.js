import react, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { to } from "await-to-js";
import service from "../../services/service";
import Box from "../../components/Box";

const BankListPage = () => {
  const [bankList, setBankList] = useState([]);
  const history = useHistory();

  const getData = async () => {
    const [error, response] = await to(service.getBankList());
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
    <>
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
              <tr>
                <td>{bank._id}</td>
                <td>{bank.name}</td>
                <td
                  style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button size="sm" onClick={() => handleBankEdit(bank._id)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default BankListPage;
