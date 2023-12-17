import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import toast from "react-hot-toast";
import axios from "axios";
function AppUsers() {
  const [showModal, setshowModal] = useState(false);
  const [showModalUpdate, setshowModalUpdate] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [currentUserUpdate, setCurrentUserUpdate] = useState([]);

  useEffect(() => {
    try {
      const getUserData = async () => {
        let { data } = await axios.get("http://localhost:8000/api/v1/user");
        setDataUser(data);
        // console.log(data);
      };
      getUserData();
    } catch (error) {
      toast.error(error.response.data);
    }
  }, [dataUser]);
  const HandleShowModal = () => {
    setshowModal(true);
  };
  const HandleCloseModalUpdate = () => {
    setshowModalUpdate(false);
  };
  const HandleCloseModal = () => {
    setshowModal(false);
  };
  const HandleRegister = async (event) => {
    try {
      event.preventDefault();
      let { data } = await axios.post(
        "http://localhost:8000/api/v1/user/register-user",
        {
          name,
          type,
          mobile,
          email,
          password,
        }
      );
      console.log(data);
      HandleCloseModal();
      toast.success(data);
      // Swal.fire("Good job", "You have Registered successfully", "success");
    } catch (error) {
      toast.error(error.response.data);
      console.log("Error in register user : " + error);
    }
  };
  const HandleUpdated = async ()=>{
    try {
      let { data } = await axios.put(
        `http://localhost:8000/api/v1/user/update-user/${currentUserUpdate._id}`,
        {
          name : currentUserUpdate.name,
          type : currentUserUpdate.type,
          mobile : currentUserUpdate.mobile,
          email : currentUserUpdate.email,
          password : currentUserUpdate.password
        }
      );
      // setUpdateCustomerData(data);
      console.log(data);
      toast.success(data);
      setshowModalUpdate(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  }
  const HandleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete")) {
        let { data } = await axios.delete(
          `http://localhost:8000/api/v1/user/delete-user/${id}`
        );
        toast.success(data);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const HandleSHowUpdate = (info) => {
    setshowModalUpdate(true);
    setCurrentUserUpdate(info);
  };
  return (
    <section id="user" className="user">
      <div className="row">
        <div className="col-xl-12 ">
          <div className="card mt-3 ">
            <div className="card-header  mt-3">
              <h5>User Table</h5>
              <span className="d-block m-t-5">
                User <code style={{ color: "#ff0000" }}>information</code> table
              </span>
            </div>
            <div className="card-block table-border-style">
              <div className="table-responsive float-right ">
                <button
                  className="btn btn-primary btn1  mt-5"
                  id="addNewUser"
                  onClick={HandleShowModal}
                >
                  <i className="fas fa-plus"></i>Add New
                </button>
                <Container>
                  <Row>
                    <Col sm={4} className="">
                      <Form>
                        <Form.Group className="mt-5">
                          <InputGroup className="mb-3 ">
                            <InputGroup.Text id="basic-addon2">
                              <i class="fas fa-search" aria-hidden="true"></i>
                            </InputGroup.Text>
                            <Form.Control
                              type="search"
                              placeholder="Search"
                              required
                            />
                          </InputGroup>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Container>
                <table className="table mt-2 ms-4" id="CustomerTable">
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      <th>Name</th>
                      <th>Type</th>
                      <th>Telephone</th>
                      <th>Gmail</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUser.map((data) => (
                      <tr key={data._id}>
                        {/* <td>{data._id}</td> */}
                        <td>{data.name}</td>
                        <td>{data.type}</td>
                        <td>{data.mobile}</td>
                        <td>{data.email}</td>
                        <td>
                          <a
                            className="btn btn-info"
                            type="submit"
                            onClick={() => HandleSHowUpdate(data)}
                          >
                            <i
                              className="fas fa-edit"
                              style={{ color: "#fff" }}
                            ></i>
                          </a>

                          <a
                            className="btn btn-danger ms-3"
                            type="submit"
                            onClick={() => HandleDelete(data._id)}
                          >
                            <i
                              className="fas fa-trash"
                              style={{ color: "#fff" }}
                            ></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal show={showModal} onHide={HandleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>User Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form className="needs-validation">
                    <Form.Group className="mb-3 was-validated">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 was-validated">
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                      >
                        <option>choose Type</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3  was-validated">
                      <Form.Label>Telephone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter telephone number"
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3  was-validated">
                      <Form.Label>Gmail</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter gmail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3  was-validated">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={HandleCloseModal}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={HandleRegister}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* Updated Model */}
              <Modal show={showModalUpdate} onHide={HandleCloseModalUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit User Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form className="needs-validation">
                    <Form.Group className="mb-3 was-validated">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={currentUserUpdate.name}
                        onChange={(event) =>
                          setCurrentUserUpdate({
                            ...currentUserUpdate,
                            name: event.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 was-validated">
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        value={currentUserUpdate.type}
                        onChange={(event) =>
                          setCurrentUserUpdate({
                            ...currentUserUpdate,
                            type: event.target.value,
                          })
                        }
                      >
                        <option>choose Type</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3  was-validated">
                      <Form.Label>Telephone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter telephone number"
                        value={currentUserUpdate.mobile}
                        onChange={(event) => setCurrentUserUpdate({...currentUserUpdate, mobile : event.target.value})}
                        
                      />
                    </Form.Group>
                    <Form.Group className="mb-3  was-validated">
                      <Form.Label>Gmail</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter gmail"
                        value={currentUserUpdate.email}
                        onChange={(event) => setCurrentUserUpdate({...currentUserUpdate, email : event.target.value})}
                       
                      />
                    </Form.Group>
                    <Form.Group className="mb-3  was-validated">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={currentUserUpdate.password}
                        onChange={(event) => setCurrentUserUpdate({...currentUserUpdate, password : event.target.value})}
                       
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={HandleCloseModalUpdate}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={HandleUpdated}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppUsers;
