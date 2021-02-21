import react, { useEffect, useState } from "react";
import { Row, Container, Card, Col, Form, Button } from "react-bootstrap";
import service from "services/service";
import { useHistory, useParams } from "react-router-dom";
import { to } from "await-to-js";
import SelectBank from "../../components/Controls/SelectionBank";

const BankPage = () => {
  const history = useHistory();
  const params = useParams();
  const [entity, setEntity] = useState({
    name: "",
  });

  const { formStatus, id } = params;

  useEffect(async () => {
    if (id) {
      const [error, response] = await to(service.getBankById(id));
      if (error) {
        alert(error);
        return;
      }

      setEntity(response.data);
    }
  }, []);

  const handleChange = (event) => {
    setEntity({ ...entity, name: event.target.value });
  };

  const handleSave = async () => {
    const [error, response] = await to(service.insertBank(entity));
    if (error) {
      alert("errror" + error.message ?? "");
      return;
    }

    history.replace("/banks");
  };
  return (
    <Container>
      <Card>
        <Card.Header>
          <Card.Title as="h4">Bank Definetion</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col className="px" md="3">
                <Form.Group>
                  <label>Bank Name:</label>
                  <Form.Control
                    value={entity.name}
                    onChange={handleChange}
                    placeholder="LLoyds Sutton"
                    type="text"
                  ></Form.Control>
                  <Button onClick={handleSave}>Save</Button>
                  <SelectBank />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BankPage;
