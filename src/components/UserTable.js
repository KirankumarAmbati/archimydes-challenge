import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default ({ users, handleEdit, handleDeleteUser }) => (
    <Table striped bordered hover className="p-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, email, role }, index) => (
            <tr key={id} data-testid="user-data">
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td style={{ display: "flex", justifyContent: "space-evenly"}}>
                <Button variant="secondary" data-testid="edit" onClick={() => handleEdit(id)}>
                  Edit
                </Button>
                <Button variant="danger" data-testid="delete" onClick={() => handleDeleteUser(id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
)