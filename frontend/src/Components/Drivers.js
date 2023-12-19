import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import toast from "react-hot-toast";
import ProtectPage from "../utills/ProtectPage";
function AppDrivers() {
  const [showModal, setshowModal] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [vehicleData, setVehicleData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [currentDriverUpdate, setCurrentDriverUpdate] = useState([]);
  useEffect(() => {
    try {
      const getVehicleData = async () => {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/vehicle/data"
        );
        setVehicleData(data);
        // console.log(data);
      };
      getVehicleData();
    } catch (error) {
      toast.error(error.response.data);
      console.log("The reading vehicle name : " + error);
    }
  }, [vehicleData]);
  useEffect(() => {
    try {
      const getDriverData = async () => {
        let { data } = await axios.get("http://localhost:8000/api/v1/driver");
        setDriverData(data);
        // console.log(data);
      };
      getDriverData();
    } catch (error) {
      toast.error(error.response.data);
      console.log("The error in reading driver : " + error);
    }
  }, [driverData]);
  const HandleShowModal = () => {
    setshowModal(true);
  };
  const HandleCloseModal = () => {
    setshowModal(false);
  };
  
  const HandleSHowUpdate = (info) => {
    setShowModalUpdate(true);
    setCurrentDriverUpdate(info);
  };
  const HandleCloseModalUpdate = () => {
    setShowModalUpdate(false);
  };
 
  const HandleDelete = async (id)=>{
    
    try {
     
      if (window.confirm("Are you sure you want to delete")) {
        let { data } = await axios.delete(`http://localhost:8000/api/v1/driver/delete-driver/${id}`);
        toast.success(data);
      }
     
    } catch (error) {
      toast.error(error.response.data);
    }
  }
  const HandleRegister = async (event) => {
    try {
      event.preventDefault();
      let { data } = await axios.post(
        "http://localhost:8000/api/v1/driver/register-driver",
        {
          name,
          mobile,
          email,
          vehicle,
        }
      );
      console.log(data);
      HandleCloseModal();
      toast.success(data);
      // Swal.fire("Good job", "You have Registered successfully", "success");
    } catch (error) {
      toast.error(error.response.data);
      console.log("Error in register driver : " + error);
    }
  };
  const HandleUpdated = async ()=>{
    try {
      let { data } = await axios.put(
        `http://localhost:8000/api/v1/driver/update-driver/${currentDriverUpdate._id}`,
        {
        
          name : currentDriverUpdate.name,
          mobile : currentDriverUpdate.mobile,
          email : currentDriverUpdate.email,
          vehicle : currentDriverUpdate.vehicle,
        }
      );
      // setUpdateCustomerData(data);
      console.log(data);
      toast.success(data);
      setShowModalUpdate(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  }
  return (
    <ProtectPage>
    <section id="driver" className="driver">
      <div className="row">
        <div className="col-xl-12">
          <div className="card mt-3">
            <div className="card-header mt-3">
              <h5>Driver Table</h5>
              <span className="d-block m-t-5">
                Driver <code style={{ color: "#ff0000" }}>information</code>{" "}
                table
              </span>
            </div>
            <div className="card-block table-border-style">
              <div className="table-responsive float-right">
                <button
                  className="btn btn-primary btn1  mt-5"
                  id="addNewDriver"
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
                {/* <AppDriverTable /> */}
                <table className="table mt-2 ms-4" id="driverTable">
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Email</th>
                      <th>Vehicle</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                 <tbody>
                 {driverData.map((data) => (
                    
                    <tr key={data._id}>
                      {/* <td>{data._id}</td> */}
                      <td>{data.name}</td>
                      <td>{data.mobile}</td>
                      <td>{data.email}</td>
                      <td>{data.vehicle.type}</td>
                      <td>
                        <a
                          className="btn btn-info"
                          type="submit"
                          onClick={()=> HandleSHowUpdate(data)}
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
                  <Modal.Title>Driver Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter you name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter you mobile"
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Vehicle</Form.Label>
                      <Form.Select
                        value={vehicle}
                        onChange={(event) => setVehicle(event.target.value)}
                      >
                        <option>Choose Your vehicle</option>
                        {vehicleData.map((data) => (
                          <>
                            <option value={data._id}>{data.type}</option>
                          </>
                        ))}
                      </Form.Select>
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
                  <Modal.Title>Edit Driver Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter you name"
                        value={currentDriverUpdate.name}
                        onChange={(event) => setCurrentDriverUpdate({...currentDriverUpdate , name: event.target.value})}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter you mobile"
                        value={currentDriverUpdate.mobile}
                        onChange={(event) => setCurrentDriverUpdate({...currentDriverUpdate , mobile: event.target.value})}
                       
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={currentDriverUpdate.email}
                        onChange={(event) => setCurrentDriverUpdate({...currentDriverUpdate , email: event.target.value})}
                        
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Vehicle</Form.Label>
                      <Form.Select
                      value={currentDriverUpdate.vehicle}
                      onChange={(event) => setCurrentDriverUpdate({...currentDriverUpdate , vehicle: event.target.value})}
                      
                      >
                        <option>Choose Your vehicle</option>
                        {vehicleData.map((data) => (
                          <>
                            <option value={data._id}>{data.type}</option>
                          </>
                        ))}
                      </Form.Select>
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

export default AppDrivers;
