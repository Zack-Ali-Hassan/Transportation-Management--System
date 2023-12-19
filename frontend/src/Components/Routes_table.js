import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import toast from "react-hot-toast";
import axios from "axios";
import ProtectPage from "../utills/ProtectPage";

function AppRoutes() {
  const [showModal, setshowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [source_location, setSourceLocation] = useState("");
  const [destination_location, setDistinationLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [estimated_time, setEstimated_time] = useState("");
  const [routesData, setRoutesData] = useState([]);
  const [currentRoutesUpdate, setCurrentRoutesUpdate] = useState([]);
  useEffect(() => {
    try {
      const getRoutesData = async () => {
        let { data } = await axios.get("http://localhost:8000/api/v1/routes");
        setRoutesData(data);
        console.log(data);
      };
      getRoutesData();
    } catch (error) {
      toast.error(error.response.data);
    }
  }, [routesData]);
  const HandleShowModal = () => {
    setshowModal(true);
  };
  const HandleCloseModal = () => {
    setshowModal(false);
  };
  const HandleSHowUpdate = (info) => {
    setShowModalUpdate(true);
    setCurrentRoutesUpdate(info);
  };
  const HandleCloseModalUpdate = () => {
    setShowModalUpdate(false);
  };
  const HandleDelete = async (id)=>{
    
    try {
     
      if (window.confirm("Are you sure you want to delete")) {
        let { data } = await axios.delete(`http://localhost:8000/api/v1/routes/delete-route/${id}`);
        toast.success(data);
      }
     
    } catch (error) {
      toast.error(error.response.data);
    }
  }
  const HandleRegister = async(event) => {
    try {
      event.preventDefault();
      let { data } = await axios.post(
        "http://localhost:8000/api/v1/routes/register-route",
        {
          source_location,
          distination_location,
          distance,
          estimated_time,
        }
      );
      console.log(data);
      setshowModal(false);
      toast.success(data);
    } catch (error) {
      toast.error(error.response.data);
      console.log("Error in register routes : " + error);
    }
  };
  const HandleUpdated = async ()=>{
    try {
      let { data } = await axios.put(
        `http://localhost:8000/api/v1/routes/update-route/${currentRoutesUpdate._id}`,
        {
          source_location : currentRoutesUpdate.source_location,
          destination_location : currentRoutesUpdate.destination_location,
          distance : currentRoutesUpdate.distance,
          estimated_time : currentRoutesUpdate.estimated_time,
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
    <section id="service" className="service">
      <div className="row">
        <div className="col-xl-12">
          <div className="card mt-3">
            <div className="card-header mt-3">
              <h5>Routes Table</h5>
              <span className="d-block m-t-5">
                Routes <code style={{ color: "#ff0000" }}>information</code>{" "}
                table
              </span>
            </div>
            <div className="card-block table-border-style">
              <div className="table-responsive float-right ">
                <button
                  className="btn btn-primary btn1  mt-5"
                  id="addNewService"
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
                {/* <AppServiceTable /> */}
                <table className="table mt-2 ms-4" id="serviceTable">
                  <thead>
                    <tr>
                      {/* <th>#</th> */}
                      <th>Source location</th>
                      <th>Destination location</th>
                      <th>Distance</th>
                      <th>Estimated time</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                 <tbody>
                 {routesData.map((data) => (
                    
                    <tr key={data._id}>
                      {/* <td>{data._id}</td> */}
                      <td>{data.source_location}</td>
                      <td>{data.destination_location}</td>
                      <td>{data.distance}</td>
                      <td>{data.estimated_time}</td>
                      <td>{data.createdAt}</td>
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
                  <Modal.Title>Service Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Source_location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Source location"
                        required
                        value={source_location}
                        onChange={(event) =>
                          setSourceLocation(event.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Destination_location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Destination location"
                        required
                        value={destination_location}
                        onChange={(event) =>
                          setDistinationLocation(event.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Distance</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter distance"
                        required
                        value={distance}
                        onChange={(event) => setDistance(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Estimated_time</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter estimated time"
                        required
                        value={estimated_time}
                        onChange={(event) =>
                          setEstimated_time(event.target.value)
                        }
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
              <Modal show={showModalUpdate} onHide={HandleCloseModalUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Service Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Source_location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Source location"
                        required
                        value={currentRoutesUpdate.source_location}
                        onChange={(event) =>
                          setCurrentRoutesUpdate({...currentRoutesUpdate, source_location: event.target.value})
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Destination_location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Destination location"
                        required
                        value={currentRoutesUpdate.destination_location}
                        onChange={(event) =>
                          setCurrentRoutesUpdate({...currentRoutesUpdate, destination_location: event.target.value})
                        }
                        
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Distance</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter distance"
                        required
                        value={currentRoutesUpdate.distance}
                        onChange={(event) =>
                          setCurrentRoutesUpdate({...currentRoutesUpdate, distance: event.target.value})
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Estimated_time</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter estimated time"
                        required
                        value={currentRoutesUpdate.estimated_time}
                        onChange={(event) =>
                          setCurrentRoutesUpdate({...currentRoutesUpdate, estimated_time: event.target.value})
                        }
                        
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
    </ProtectPage>
  );
}

export default AppRoutes;
