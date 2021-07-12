import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default ({ showModal, editMode, user, handleClose, handleUpdateUser, updateUser, handleCreateUser }) => (
  <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title data-testid="modal-title">
            {editMode ? "Update User" : "Create User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                data-testid="name"
                placeholder="Enter name"
                onChange={(e) =>
                  updateUser({
                    ...user,
                    name: e.target.value
                  })
                }
                value={user.name}
              />
            </Form.Group>
            <Form.Group controlId="mail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                data-testid="email"
                placeholder="Enter email"
                onChange={(e) =>
                  updateUser({
                    ...user,
                    email: e.target.value
                  })
                }
                value={user.email}
              />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                data-testid="role"
                value={user.role}
                onChange={(e) =>
                  updateUser({
                    ...user,
                    role: e.target.value
                  })
                }
              >
                <option>Admin</option>
                <option>User</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          {editMode ? (
            <Button
              variant="success"
              onClick={handleUpdateUser}
              disabled={!user.name || !user.email || !user.role}
              data-testid="update-user-modal"
            >
              Update User
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleCreateUser}
              disabled={!user.name || !user.email || !user.role}
              data-testid="create-user-modal"
            >
              Create User
            </Button>
          )}
        </Modal.Footer>
      </Modal>
)