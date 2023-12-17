import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import toast from "react-hot-toast";
function AppMaintenance() {
  const [showModal, setshowModal] = useState(false);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [vehicleData, setVehicleData] = useState([]);
  const [maintenanceRecordData, setMaintenanceRecordData] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [currentMaintenance_recordUpdate, setCurrentMaintenance_recordUpdate] =
    useState([]);
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
      const getMaintenanceRecordData = async () => {
        let { data } = await axios.get(
          "http://localhost:8000/api/v1/maintenance-record"
        );
        setMaintenanceRecordData(data);
        // console.log(data);
      };
      getMaintenanceRecordData();
    } catch (error) {
      toast.error(error.response.data);
      console.log("The error in reading maintenance record : " + error);
    }
  }, [maintenanceRecordData]);
  const HandleShowModal = () => {
    setshowModal(true);
  };
  const HandleCloseModal = () => {
    setshowModal(false);
  };
  const HandleSHowUpdate = (info) => {
    setShowModalUpdate(true);
    setCurrentMaintenance_recordUpdate(info);
  };
  const HandleCloseModalUpdate = () => {
    setShowModalUpdate(false);
  };
  const HandleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete")) {
        let { data } = await axios.delete(
          `http://localhost:8000/api/v1/maintenance-record/delete-maintenance/${id}`
        );
        toast.success(data);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const HandleUpdated = async () => {
    try {
      let { data } = await axios.put(
        `http://localhost:8000/api/v1/maintenance-record/update-maintenance/${currentMaintenance_recordUpdate._id}`,
        {
          type: currentMaintenance_recordUpdate.type,
          description: currentMaintenance_recordUpdate.description,
          cost: currentMaintenance_recordUpdate.cost,
          vehicle: currentMaintenance_recordUpdate.vehicle,
        }
      );
      // setUpdateCustomerData(data);
      console.log(data);
      toast.success(data);
      setShowModalUpdate(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const HandleRegister = async () => {
    try {
      event.preventDefault();
      let { data } = await axios.post(
        "http://localhost:8000/api/v1/maintenance-record/register-maintenance",
        {
          type,
          description,
          cost,
          vehicle,
        }
      );
      console.log(data);
      HandleCloseModal();
      toast.success(data);
      // Swal.fire("Good job", "You have Registered successfully", "success");
    } catch (error) {
      toast.error(error.response.data);
      console.log("Error in register maintenance : " + error);
    }
  };

  return (
    <section id="driver" className="driver">
      <div className="row">
        <div className="col-xl-12">
          <div className="card mt-3">
            <div className="card-header mt-3">
              <h5>Maintenance record Table</h5>
              <span className="d-block m-t-5">
                Maintenance record{" "}
                <code style={{ color: "#ff0000" }}>information</code> table
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
                      <th>Type</th>
                      <th>Description</th>
                      <th>Cost</th>
                      <th>Vehicle</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceRecordData.map((data) => (
                      <tr key={data._id}>
                        {/* <td>{data._id}</td> */}
                        <td>{data.type}</td>
                        <td>{data.description}</td>
                        <td>{data.cost}</td>
                        <td>{data.vehicle.type}</td>
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
                  <Modal.Title>Maintenance record Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Maintenance Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter maintenance record"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Cost</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter cost"
                        value={cost}
                        onChange={(event) => setCost(event.target.value)}
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
              <Modal show={showModalUpdate} onHide={HandleCloseModalUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Maintenance record Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Maintenance Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter maintenance record"
                        value={currentMaintenance_recordUpdate.type}
                        onChange={(event) =>
                          setCurrentMaintenance_recordUpdate({
                            ...currentMaintenance_recordUpdate,
                            type: event.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        value={currentMaintenance_recordUpdate.description}
                        onChange={(event) =>
                          setCurrentMaintenance_recordUpdate({
                            ...currentMaintenance_recordUpdate,
                            description: event.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Cost</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter cost"
                        value={currentMaintenance_recordUpdate.cost}
                        onChange={(event) =>
                          setCurrentMaintenance_recordUpdate({
                            ...currentMaintenance_recordUpdate,
                            cost: event.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Vehicle</Form.Label>
                      <Form.Select
                        value={currentMaintenance_recordUpdate.vehicle}
                        onChange={(event) =>
                          setCurrentMaintenance_recordUpdate({
                            ...currentMaintenance_recordUpdate,
                            vehicle: event.target.value,
                          })
                        }
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
  );
}

export default AppMaintenance;
