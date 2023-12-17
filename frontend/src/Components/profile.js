import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const userFname = localStorage.getItem("userFname");
const userLname = localStorage.getItem("userLname");
const userEmail = localStorage.getItem("emailData");
const userPassword = localStorage.getItem("passwordData");
function AppProfile(props) {
  return (
    <Modal show={props.show} onHide={props.hanldeclose}>
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-goup">
          <Form className="needs-validation">
            <Form.Group className="mt-1 was-validated">
              <Form.Control type="text" placeholder={userFname} required />
              <div className="invalid-feedback">
                Please Enter your first Name
              </div>
            </Form.Group>
            <Form.Group className="mt-3 was-validated">
              <Form.Control type="text" placeholder={userLname} required />
              <div className="invalid-feedback">
                Please Enter your Last Name
              </div>
            </Form.Group>
            <Form.Group className="mt-3 was-validated">
              <Form.Control type="email" placeholder={userEmail} required />
              <div className="invalid-feedback">
                Please Enter your Email Address
              </div>
            </Form.Group>
            <Form.Group className="mt-3 was-validated">
              <Form.Control type="text" placeholder={userPassword} required />
              <div className="invalid-feedback">Please Enter your Password</div>
            </Form.Group>
            {/* <Form.Group className="mt-3 was-validated">
                <Form.Control
                  type="text"
                  placeholder="Confirm Password"
                  required
                />
                <div className="invalid-feedback">
                  Please Enter your Confirm Password
                </div>
              </Form.Group> */}
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={props.HandleUpdate}>
          Edit Profile
        </Button>
        <Button variant="danger" onClick={props.HandleDelete}>
          Delete User
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AppProfile;
