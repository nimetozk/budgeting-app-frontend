/**
 * This is the page that the bank list with add/edit options are displayed.
 *
 * Throughout the implementation, I have used react documentation to understand different types of React hooks.
 * https://reactjs.org/
 */

import react, { useEffect, useState } from "react";
import { Row, Container, Card, Col, Form, Button } from "react-bootstrap";
import service from "services/service";
import { useHistory, useParams } from "react-router-dom";
import { to } from "await-to-js";
import { useConfirmation } from "../../components/Dialog/dialog-provider";
import { toast } from "react-toastify";
import { errorToString } from "utility";
import { useFormik } from "formik";
import * as yup from "yup";

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

  const formik = useFormik({
    initialValues: {
      _id: entity._id,
      name: entity.name,
    },

    validationSchema: yup.object().shape({
      name: yup.string().required(),
    }),

    enableReinitialize: true,
    onSubmit: async (values) => {
      const entity = { ...values };
      confirm({
        title: "Save Bank",
        description: "Are you sure you want to save this bank?",
      }).then(async () => {
        if (formStatus === "new") {
          const [error, response] = await to(service.insertBank(entity));
          if (error) {
            alert("error" + error.message ?? "");
            return;
          }
        } else {
          const [error, response] = await to(service.updateBank(entity));
          if (error) {
            alert("error" + error.message ?? "");
            return;
          }
        }

        history.replace("/banks");
      });
    },
  });

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
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="LLoyds Sutton"
                      type="text"
                    ></Form.Control>
                    {formik.errors.name && formik.touched.name && (
                      <label style={{ color: "red" }}>
                        {formik.errors.name}
                      </label>
                    )}
                  </Form.Group>
                  <Button onClick={formik.handleSubmit}>Save Bank</Button>
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
