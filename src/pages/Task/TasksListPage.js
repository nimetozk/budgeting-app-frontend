import react, { useEffect, useState } from "react";
import service from "services/service";
import { to } from "await-to-js";
import { Table, Button } from "react-bootstrap";
import Box from "components/Box";
import { useHistory } from "react-router-dom";
import moment from "moment";

const TaskListPage = () => {
  const [taskList, setTaskList] = useState([]);
  const history = useHistory();

  const getData = async () => {
    const [error, response] = await to(service.getTaskList());
    console.log(response);
    setTaskList(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const hanldeUploadTask = () => {
    history.replace("/tasks/formStatus/new/id/0");
  };

  const handleTaskEdit = (taskId) => {
    history.replace("/tasks/formStatus/edit/id/" + taskId);
  };

  return (
    <>
      <Box>
        <Button
          variant="primary"
          onClick={hanldeUploadTask}
          style={{
            backgroundColor: "rgb(52, 114, 247)",
            color: "white",
            borderColor: "white",
          }}
        >
          Add Task
        </Button>
      </Box>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Upload Date</th>
            <th>Bank</th>
            <th>Sort Code</th>
            <th>Account No</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {taskList &&
            taskList.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.status}</td>
                <td>{moment(task.uploadDate).format("DD/MM/YYYY")}</td>
                <td>{task.refBankAccount.refBank.name}</td>
                <td>{task.refBankAccount.accountNo}</td>
                <td>{task.refBankAccount.sortCode}</td>
                <td
                  style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button size="sm" onClick={() => handleTaskEdit(task._id)}>
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

export default TaskListPage;
