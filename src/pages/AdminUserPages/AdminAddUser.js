import react, { useEffect, useState } from "react";
import service from "services/service";
import { useHistory, useParams } from "react-router-dom";
import { to } from "await-to-js";
import { useConfirmation } from "../../components/Dialog/dialog-provider";
import Box from "../../components/Box";
import { Row, Card, Col, Form, Button } from "react-bootstrap";

const AdminUserPage = () => {
  const history = useHistory();
  const params = useParams();
  const [entity, setEntity] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    userRole: "",
  });

  const { formStatus, id } = params;
  const confirm = useConfirmation();

  useEffect(async () => {
    if (id) {
      const [error, response] = await to(service.getUserById(id));
      if (error) {
        alert(error);
        return;
      }

      setEntity(response.data);
    }
  }, []);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "firstname":
        setEntity({ ...entity, firstname: event.target.value });
        break;
      case "lastname":
        setEntity({ ...entity, lastname: event.target.value });
        break;
      case "email":
        setEntity({ ...entity, email: event.target.value });
        break;
      case "phoneNumber":
        setEntity({ ...entity, phoneNumber: event.target.value });
        break;
      case "password":
        setEntity({ ...entity, password: event.target.value });
        break;

      default:
        break;
    }
  };

  const confirmUserSave = async () => {
    const [error, response] = await to(service.insertUser(entity));
    if (error) {
      alert("error" + error.message ?? "");
      return;
    }

    history.replace("/users");
  };

  const handleSave = async () => {
    confirm({
      title: "Add User",
      description: "Are you sure you want to add a new user ?",
    }).then(() => {
      confirmUserSave();
    });
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Enter User Details</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col className="pl" md="6">
                <label>First Name</label>
                <Form.Control
                  placeholder="First Name"
                  type="text"
                  name="firstname"
                  value={entity.firstname}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
              <Col className="pl" md="6">
                <label>Last Name</label>
                <Form.Control
                  placeholder="Last Name"
                  type="text"
                  name="lastname"
                  value={entity.lastname}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col className="pl" md="4">
                <label>Email address</label>
                <Form.Control
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={entity.email}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
              <Col className="pl" md="4">
                <label>Phone Number</label>
                <Form.Control
                  placeholder="Phone Number"
                  type="text"
                  name="phoneNumber"
                  value={entity.phoneNumber}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
              <Col className="pl" md="4">
                <label>Password</label>
                <Form.Control
                  placeholder="*******"
                  type="password"
                  name="password"
                  value={entity.password}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
            </Row>
            <Box>
              <Button onClick={handleSave}>Add User</Button>
            </Box>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminUserPage;
