import react, { useEffect, useState } from "react";
import { Row, Container, Card, Col, Form, Button } from "react-bootstrap";
import service from "services/service";
import { useHistory, useParams } from "react-router-dom";
import { to } from "await-to-js";
import SelectBank from "../../components/Controls/SelectionBank";
import { useConfirmation } from "../../components/Dialog/dialog-provider";
import { toast } from "react-toastify";
import { errorToString } from "utility";

const BankPage = () => {
  const history = useHistory();
  const params = useParams();
  const [entity, setEntity] = useState({
    name: "",
  });

  const { formStatus, id } = params;
  const confirm = useConfirmation();

  useEffect(async () => {
    if (id && id !== "0") {
      const [error, response] = await to(service.getBankById(id));

      if (error) {
        toast.error(errorToString(error));
        return;
      }

      setEntity(response.data);
    }
  }, []);

  const handleChange = (event) => {
    setEntity({ ...entity, name: event.target.value });
  };

  const confirmBankSave = async () => {
    if (formStatus === "new") {
      const [error, response] = await to(service.insertBank(entity));
      if (error) {
        alert("errror" + error.message ?? "");
        return;
      }
    } else {
      const [error, response] = await to(service.updateBank(entity));
      if (error) {
        alert("errror" + error.message ?? "");
        return;
      }
    }

    history.replace("/banks");
  };

  const handleSave = async () => {
    confirm({
      title: "Add Bank",
      description: "Are you sure you want to add new bank ?",
    }).then(() => {
      confirmBankSave();
    });
  };

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4>Bank Definition</h4>
              <Row>
                <Col className="px" md="3">
                  <Form.Group>
                    <label>Bank Name:</label>
                    <Form.Control
                      style={{ marginBottom: "10px" }}
                      value={entity.name}
                      onChange={handleChange}
                      placeholder="LLoyds Sutton"
                      type="text"
                    ></Form.Control>
                    <Button onClick={handleSave}>Save Bank</Button>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BankPage;
