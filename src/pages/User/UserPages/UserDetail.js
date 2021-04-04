import react, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useConfirmation } from "components/Dialog/dialog-provider";
import service from "../../../services/service";
import { to } from "await-to-js";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { errorToString } from "utility";

const UserDetail = () => {
  const [entity, setEntity] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const confirm = useConfirmation();

  const formik = useFormik({
    initialValues: {
      _id: entity._id,
      firstname: entity.firstname,
      lastname: entity.lastname,
      email: entity.email,
      phoneNumber: entity.phoneNumber,
      password: entity.password,
    },

    validationSchema: yup.object().shape({
      firstname: yup.string().required("Required"),
      lastname: yup.string().required("Required"),
      email: yup.string().required("Required").email(),
      phoneNumber: yup.string().required("Required").max(11).min(11),
      password: yup.string().required("Required"),
    }),

    enableReinitialize: true,
    onSubmit: async (values) => {
      const entity = { ...values };

      confirm({
        title: "Update User Details",
        description: "Are you sure you want to update your details ?",
      }).then(async () => {
        const [error, response] = await to(service.updateUser(entity));
        if (error) {
          toast.error(errorToString(error));
          return;
        }

        setEntity(response.data);

        toast.success("Your details are successfully updated !", {
          delay: 100,
        });
      });
    },
  });

  const getCurrentUser = async () => {
    const [error, response] = await to(service.getCurrentUser());
    setEntity(response.data);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pl" md="6">
                    <Form.Group>
                      <label>First Name</label>
                      <Form.Control
                        placeholder="First Name"
                        type="text"
                        name="firstname"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></Form.Control>
                      {formik.errors.firstname && formik.touched.firstname && (
                        <label style={{ color: "red" }}>
                          {formik.errors.firstname}
                        </label>
                      )}
                    </Form.Group>
                  </Col>
                  <Col className="pl" md="6">
                    <Form.Group>
                      <label>Last Name</label>
                      <Form.Control
                        placeholder="Last Name"
                        type="text"
                        name="lastname"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></Form.Control>
                      {formik.errors.lastname && formik.touched.lastname && (
                        <label style={{ color: "red" }}>
                          {formik.errors.lastname}
                        </label>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pl" md="4">
                    <Form.Group>
                      <label>Email address</label>
                      <Form.Control
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></Form.Control>
                      {formik.errors.email && formik.touched.email && (
                        <label style={{ color: "red" }}>
                          {formik.errors.email}
                        </label>
                      )}
                    </Form.Group>
                  </Col>
                  <Col className="pl" md="4">
                    <Form.Group>
                      <label>Phone Number</label>
                      <Form.Control
                        placeholder="Phone Number"
                        type="text"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></Form.Control>
                      {formik.errors.phoneNumber &&
                        formik.touched.phoneNumber && (
                          <label style={{ color: "red" }}>
                            {formik.errors.phoneNumber}
                          </label>
                        )}
                    </Form.Group>
                  </Col>
                  <Col className="pl" md="4">
                    <Form.Group>
                      <label>Password</label>
                      <Form.Control
                        placeholder="*******"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></Form.Control>
                      {formik.errors.password && formik.touched.password && (
                        <label style={{ color: "red" }}>
                          {formik.errors.password}
                        </label>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  className="btn-fill pull-right"
                  onClick={formik.handleSubmit}
                >
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
                    src={require("assets/img/faces/face-0.jpg").default}
                  ></img>
                  <h5 className="title">
                    {formik.values.firstname} {formik.values.lastname}
                  </h5>
                </a>
                <p className="description">{formik.values.email}</p>
              </div>
              <p className="description text-center">
                Account created in 2021! <br></br>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetail;
