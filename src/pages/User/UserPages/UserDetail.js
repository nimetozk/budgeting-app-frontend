import react, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import service from "../../../services/service";
import { to } from "await-to-js";

const UserDetail = () => {
  const [entity, setEntity] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const getCurrentUser = async () => {
    const [error, response] = await to(service.getCurrentUser());
    setEntity(response.data);
  };

  useEffect(() => {
    getCurrentUser();
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    const [error, response] = await to(service.updateUser(entity));
    if (error) {
      alert();
    }

    setEntity(response.data);
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>FirstName</label>
                      <Form.Control
                        placeholder="FirstName"
                        type="text"
                        name="firstname"
                        value={entity.firstname}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label>Last Name</label>
                      <Form.Control
                        placeholder="Last Name"
                        type="text"
                        name="lastname"
                        value={entity.lastname}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl" md="4">
                    <Form.Group>
                      <label>Email address</label>
                      <Form.Control
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={entity.email}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl" md="4">
                    <Form.Group>
                      <label>Phone Number</label>
                      <Form.Control
                        placeholder="Phone Number"
                        type="text"
                        name="phoneNumber"
                        value={entity.phoneNumber}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl" md="4">
                    <Form.Group>
                      <label>Password</label>
                      <Form.Control
                        placeholder="*******"
                        type="text"
                        name="password"
                        value={entity.password}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Button className="btn-fill pull-right" onClick={handleUpdate}>
                  Update Profile
                </Button>
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card className="card-user">
            <div className="card-image">
              <img
                alt="..."
                src={
                  require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                    .default
                }
              ></img>
            </div>
            <Card.Body>
              <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={require("assets/img/faces/face-3.jpg").default}
                  ></img>
                  <h5 className="title">Mike Andrew</h5>
                </a>
                <p className="description">michael24</p>
              </div>
              <p className="description text-center">
                "Lamborghini Mercy <br></br>
                Your chick she so thirsty <br></br>
                I'm in that two seat Lambo"
              </p>
            </Card.Body>
            <hr></hr>
            <div className="button-container mr-auto ml-auto">
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-google-plus-square"></i>
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetail;
