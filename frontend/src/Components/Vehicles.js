import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import toast from "react-hot-toast";
import ProtectPage from "../utills/ProtectPage";
function AppVehicles() {
  const [showModal, setshowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [vehicle_number, setVehicle_number] = useState("");
  const [type, setType] = useState("");
  const [fual_type, setFual_type] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [vehicleData, setVehicleData] = useState([]);
  const [currentVehicleUpdate, setCurrentVehicleUpdate] = useState([]);
  const HandleShowModal = () => {
    setshowModal(true);
  };
  const HandleCloseModal = () => {
    setshowModal(false);
  };
  const HandleSHowUpdate = (info) => {
    setShowModalUpdate(true);
    setCurrentVehicleUpdate(info);
  };
  const HandleCloseModalUpdate = () => {
    setShowModalUpdate(false);
  };
  const HandleUpdated = async ()=>{
    try {
      let { data } = await axios.put(
        `http://localhost:8000/api/v1/vehicle/update-vehicle/${currentVehicleUpdate._id}`,
        {
          
          vehicle_number : currentVehicleUpdate.vehicle_number,
          type : currentVehicleUpdate.type,
          fual_type : currentVehicleUpdate.fual_type,
          capacity : currentVehicleUpdate.capacity,
          location : currentVehicleUpdate.location,
          status : currentVehicleUpdate.status,
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
  useEffect(() => {
    try {
      const getVehicleData = async () => {
        let { data } = await axios.get("http://localhost:8000/api/v1/vehicle");
        setVehicleData(data);
        console.log(data);
      };
      getVehicleData();
    } catch (error) {
      toast.error(error.response.data);
    }
  }, [vehicleData]);
 
  const HandleDelete = async (id)=>{
    
    try {
     
      if (window.confirm("Are you sure you want to delete")) {
        let { data } = await axios.delete(`http://localhost:8000/api/v1/vehicle/delete-vehicle/${id}`);
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
        "http://localhost:8000/api/v1/vehicle/register-vehicle",
        {
          vehicle_number,
          type,
          fual_type,
          capacity,
          location,
          status,
        }
      );
      console.log(data);
      HandleCloseModal();
      toast.success(data);
      // Swal.fire("Good job", "You have Registered successfully", "success");
    } catch (error) {
      toast.error(error.response.data);
      console.log("Error in register vehicle : " + error);
    }
  };

  return (
    <ProtectPage>
    <section id="vehicle" className="vehicle">
      <div className="row">
        <div className="col-xl-12">
          <div className="card mt-3 ">
            <div className="card-header mt-3">
              <h5>Vehicle Table</h5>
              <span className="d-block m-t-5">
                Vehicle <code style={{ color: "#ff0000" }}>information</code>{" "}
                table
              </span>
            </div>
            <div className="card-block table-border-style">
              <div className="table-responsive float-right ">
                <button
                  className="btn btn-primary btn1  mt-5"
                  id="addNewVehicle"
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
                {/* <AppVehicleTable /> */}
                <table className="table mt-2 ms-4" id="vehicleTable">
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      <th>Number</th>
                      <th>Vehicle type</th>
                      <th>Fuel type</th>
                      <th>Capacity</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {vehicleData.map((data) => (
                    
                    <tr key={data._id}>
                      {/* <td>{data._id}</td> */}
                      <td>{data.vehicle_number}</td>
                      <td>{data.type}</td>
                      <td>{data.fual_type}</td>
                      <td>{data.capacity}</td>
                      <td>{data.location}</td>
                      <td>{data.status}</td>
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
                  <Modal.Title>Vehicles Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Vehicle number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter vehicle number"
                        value={vehicle_number}
                        onChange={(event)=> setVehicle_number(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Select value={type} onChange={(event)=> setType(event.target.value)}>
                        <option>choose vehicle type</option>
                        <option value="cars">Cars</option>
                        <option value="trucks">Trucks</option>
                        <option value="buses">Buses</option>
                        <option value="trains">Trains</option>
                        <option value="airplanes">Airplanes</option>
                        <option value="cargo_ships">Cargo Ships</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Fuel Type</Form.Label>
                      <Form.Select   value={fual_type}
                        onChange={(event)=> setFual_type(event.target.value)}>
                        <option>choose fuel type</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electricity">Electricity</option>
                      </Form.Select>
                    </Form.Group>
                   
                    <Form.Group className="mb-3">
                      <Form.Label>Capacity</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter capacity"
                        value={capacity}
                        onChange={(event)=> setCapacity(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(event)=> setLocation(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select   value={status}
                        onChange={(event)=> setStatus(event.target.value)}>
                        <option>choose status</option>
                        <option value="active">Active</option>
                        <option value="inactive">In active</option>
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
              <Modal show={showModalUpdate} onHide={HandleCloseModalUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Vehicles Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Vehicle number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter vehicle number"
                        value={currentVehicleUpdate.vehicle_number}
                        onChange={(event)=> setCurrentVehicleUpdate({...currentVehicleUpdate, vehicle_number : event.target.value})}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Select
                       value={currentVehicleUpdate.type}
                       onChange={(event)=> setCurrentVehicleUpdate({...currentVehicleUpdate, type : event.target.value})} 
                     >
                        <option>choose vehicle type</option>
                        <option value="cars">Cars</option>
                        <option value="trucks">Trucks</option>
                        <option value="buses">Buses</option>
                        <option value="trains">Trains</option>
                        <option value="airplanes">Airplanes</option>
                        <option value="cargo_ships">Cargo Ships</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Fuel Type</Form.Label>
                      <Form.Select   
                       value={currentVehicleUpdate.fual_type}
                       onChange={(event)=> setCurrentVehicleUpdate({...currentVehicleUpdate, fuel_type : event.target.value})}
                     >
                        <option>choose fuel type</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electricity">Electricity</option>
                      </Form.Select>
                    </Form.Group>
                   
                    <Form.Group className="mb-3">
                      <Form.Label>Capacity</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter capacity"
                        value={currentVehicleUpdate.capacity}
                        onChange={(event)=> setCurrentVehicleUpdate({...currentVehicleUpdate, capacity : event.target.value})}
                        
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter location"
                        value={currentVehicleUpdate.location}
                        onChange={(event)=> setCurrentVehicleUpdate({...currentVehicleUpdate, location : event.target.value})}
                       
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select   
                       value={currentVehicleUpdate.status}
                       onChange={(event)=> setCurrentVehicleUpdate({...currentVehicleUpdate, status : event.target.value})}
                     >
                        <option>choose status</option>
                        <option value="active">Active</option>
                        <option value="inactive">In active</option>
                      </Form.Select>
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
    </ProtectPage>
  );
}

export default AppVehicles;
