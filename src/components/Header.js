import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default ({ updateShowModal }) => (
    <Container className="p-4">
        <Row style={{ justifyContent: "space-evenly" }}>
          <Col sm={10}>
            <h1>Users</h1>
          </Col>
          <Col>
            <Button
              variant="primary"
              onClick={() => updateShowModal(true)}
              data-testid="create-user"
              style={{ color: 'white' }}
            >
              Create user
            </Button>
          </Col>
        </Row>
      </Container>
)