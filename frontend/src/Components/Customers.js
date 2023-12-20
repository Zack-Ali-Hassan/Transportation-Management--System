import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import toast from "react-hot-toast";
import ProtectPage from "../utills/ProtectPage";
function AppCustomers() {
  const [showModal, setshowModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataCustomer, setDataCustomer] = useState([]);

  const HandleCloseModalUpdate = () => {
    setShowModalUpdate(false);
  };


  useEffect(() => {
    try {
      const getCustomerData = async () => {
        let { data } = await axios.get("http://localhost:8000/api/v1/customer");
        setDataCustomer(data);
        // console.log(data);
      };
      getCustomerData();
    } catch (error) {
      toast.error(error.response.data);
    }
  }, [dataCustomer]);
  const HandleUpdated = async ()=>{
    try {
      let { data } = await axios.put(
        `http://localhost:8000/api/v1/customer/update-customer/${currentCustomer._id}`,
        {
          name :currentCustomer.name,
          gender :currentCustomer.gender,
          address :currentCustomer.address,
          mobile :currentCustomer.mobile,
        }
      );
      // setUpdateCustomerData(data);
      console.log(data);
      toast.success(data);
      setShowModalUpdate(false);
      setName("")
      setGender("")
      setAddress("");
      setMobile("")
    } catch (error) {
      toast.error(error.response.data);
    }
  }
  const HandleDelete = async (id)=>{
    
    try {
     
      if (window.confirm("Are you sure you want to delete")) {
        let { data } = await axios.delete(`http://localhost:8000/api/v1/customer/delete-customer/${id}`);
        toast.success(data);
      }
     
    } catch (error) {
      toast.error(error.response.data);
    }
  }
  const HandleShowModal = () => {
    setshowModal(true);
  };
  const HandleShowModalUpdate = (info) => {
    setCurrentCustomer(info);
    setShowModalUpdate(true);
  };
  const HandleCloseModal = () => {
    setshowModal(false);
  };
  const HandleRegister = async (event) => {
    try {
      event.preventDefault();
      let { data } = await axios.post(
        "http://localhost:8000/api/v1/customer/register-customer",
        {
          name,
          gender,
          address,
          mobile,
        }
      );
      console.log(data);
      HandleCloseModal();
      toast.success(data);
      setName("")
      setGender("")
      setAddress("");
      setMobile("")
      // Swal.fire("Good job", "You have Registered successfully", "success");
    } catch (error) {
      toast.error(error.response.data);
      console.log("Error in register customer : " + error);
    }
  };
  return (
    <ProtectPage>
    <section id="customer" className="customer">
      <div className="row">
        <div className="col-xl-12">
          <div className="card mt-3">
            <div className="card-header mt-3">
              <h5>Customer Table</h5>
              <span className="d-block m-t-5">
                Customer <code style={{ color: "#ff0000" }}>information</code>{" "}
                table
              </span>
            </div>
            <div className="card-block table-border-style">
              <div className="table-responsive float-right">
                <button
                  className="btn btn-primary btn1  mt-5 me-5 mb-3"
                  id="addNewCustomer"
                  onClick={HandleShowModal}
                >
                  <i className="fas fa-plus"></i>Add New
                </button>
                {/* <Container>
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
                </Container> */}
                {/* <AppCustomerTable /> */}
                <table className="table mt-2 ms-4" id="CustomerTable">
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Telephone</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCustomer.map((data) => (
                    
                      <tr key={data._id}>
                        {/* <td>{data._id}</td> */}
                        <td>{data.name}</td>
                        <td>{data.gender}</td>
                        <td>{data.address}</td>
                        <td>{data.mobile}</td>
                        <td>
                          <a
                            className="btn btn-info"
                            type="submit"
                            onClick={() => HandleShowModalUpdate(data)}
                          >
                            <i
                              className="fas fa-edit"
                              style={{ color: "#fff" }}
                            ></i>
                          </a>
                        
                          <a
                            className="btn btn-danger ms-3"
                            type="submit"
                            onClick={()=> HandleDelete(data._id)}
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
                  <Modal.Title>Customer Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter you name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        required
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                      >
                        <option>Choose Your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        required
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Telephone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter you telephone"
                        required
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
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
              {/* Updated modal */}
              <Modal show={showModalUpdate} onHide={HandleCloseModalUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Customer Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter you name"
                        required
                        value={currentCustomer.name}
                        onChange={(event) => setCurrentCustomer({
                          ...currentCustomer, name : event.target.value
                        })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        required
                        value={currentCustomer.gender}
                        onChange={(event) => setCurrentCustomer({
                          ...currentCustomer, gender : event.target.value
                        })}
                      >
                         <option>choose Type</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        required
                        value={currentCustomer.address}
                        onChange={(event) => setCurrentCustomer({
                          ...currentCustomer, address : event.target.value
                        })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Telephone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter you telephone"
                        required
                        value={currentCustomer.mobile}
                        onChange={(event) => setCurrentCustomer({
                          ...currentCustomer, mobile : event.target.value
                        })}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={HandleCloseModalUpdate}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={HandleUpdated}>
                    Edit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
    </ProtectPage>
  );
}

export default AppCustomers;
