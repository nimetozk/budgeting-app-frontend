import react, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Card, Row, Col } from "react-bootstrap";
import { to } from "await-to-js";
import service from "services/service";
import Box from "components/Box";
import { useConfirmation } from "components/Dialog/dialog-provider";
import { errorToString } from "utility";
import { toast } from "react-toastify";

const UserListPage = () => {
  const [userList, setUserList] = useState([]);
  const history = useHistory();
  const [userAccountList, setUserAccountList] = useState([]);

  const confirm = useConfirmation();

  const getData = async () => {
    const [error, response] = await to(service.getUserList());
    if (error) {
      toast.error(errorToString(error));
      return;
    }

    setUserList(response.data);
  };

  const handleUserEdit = (id) => {
    history.replace("/users/formStatus/edit/id/" + id);
  };

  const handleNewUser = () => {
    history.replace("/users/formStatus/new/id/0");
  };

  const handleUserDelete = (userId) => {
    confirm({
      title: "DELETE",
      description: "Are you sure to delete the user account ?",
    }).then(() => {
      service
        .getDeleteUserAccountById(userId)
        .then((response) => {
          const tempUserAccountList = [...userAccountList];
          const index = tempUserAccountList.findIndex(
            (userAccount) => userAccount._id === userAccountId
          );
          tempUserAccountList.splice(index, 1);
          setUserAccountList(tempUserAccountList);
          toast.success("Account is deleted successfully", { delay: 3000 });
        })
        .catch((error) => {
          toast.error(errorToString(error));
          return;
        });
    });
  };

  useEffect(() => {
    getData();
  }, [userAccountList]);

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Box>
                <Button
                  variant="primary"
                  onClick={handleNewUser}
                  style={{
                    backgroundColor: "rgb(52, 114, 247)",
                    color: "white",
                    borderColor: "white",
                  }}
                >
                  Add New User
                </Button>
              </Box>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>User Role</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {userList &&
                    userList.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.userRoles}</td>
                        <td
                          style={{
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Button
                            size="sm"
                            onClick={() => handleUserEdit(user._id)}
                          >
                            Edit
                          </Button>
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Button
                            size="sm"
                            onClick={() => handleUserDelete(user._id)}
                          >
                            Delete
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

export default UserListPage;
