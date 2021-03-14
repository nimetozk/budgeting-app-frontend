import react, { useEffect, useState } from "react";
import service from "services/service";
import { useHistory, useParams } from "react-router-dom";
import { to } from "await-to-js";
import { useConfirmation } from "../../components/Dialog/dialog-provider";
import Box from "../../components/Box";
import { Row, Card, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { errorToString } from "../../utility";

const AdminUserPage = () => {
  const history = useHistory();
  const params = useParams();
  const [entity, setEntity] = useState({
    _id: "",
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
    if (id && id !== "0") {
      const [error, response] = await to(service.getUserById(id));
      if (error) {
        toast.error(errorToString(error));

        return;
      }

      setEntity(response.data);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      _id: entity._id,
      email: entity.email,
      password: entity.password,
      firstname: entity.firstname,
      lastname: entity.lastname,
      phoneNumber: entity.phoneNumber,
      userRole: entity.userRole,
    },

    validationSchema: yup.object().shape({
      firstname: yup.string().required("Required"),
      lastname: yup.string().required("Required"),
      email: yup.string().required("Required").email(),
      phoneNumber: yup.string().required("Required").max(11).min(11),
      password: yup.string().required("Required"),
      userRole: yup.string(),
    }),

    enableReinitialize: true,

    onSubmit: async (values) => {
      const user = { ...values };

      confirm({
        title: "Add User",
        description: "Are you sure you want to add a new user?",
      }).then(async () => {
        if (formStatus === "edit") {
          const [error, response] = await to(service.updateUser(user));
          if (error) {
            toast.error(errorToString(error));
            return;
          }
        } else {
          const [error, response] = await to(service.insertUser(user));
          if (error) {
            toast.error(errorToString(error));
            return;
          }
        }

        history.replace("/users");
      });
    },
  });

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
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></Form.Control>
                {formik.errors.firstname && formik.touched.firstname && (
                  <label style={{ color: "red" }}>
                    {formik.errors.firstname}
                  </label>
                )}
              </Col>
              <Col className="pl" md="6">
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
              </Col>
            </Row>
            <Row>
              <Col className="pl" md="4">
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
                  <label style={{ color: "red" }}>{formik.errors.email}</label>
                )}
              </Col>
              <Col className="pl" md="4">
                <label>Phone Number</label>
                <Form.Control
                  placeholder="Phone Number"
                  type="text"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></Form.Control>
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <label style={{ color: "red" }}>
                    {formik.errors.phoneNumber}
                  </label>
                )}
              </Col>
              <Col className="pl" md="4">
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
              </Col>
            </Row>
            <Box>
              <Button onClick={formik.handleSubmit}>Save User</Button>
            </Box>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminUserPage;
