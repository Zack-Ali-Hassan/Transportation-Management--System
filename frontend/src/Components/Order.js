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
function AppOrder() {
  const [showModal, setshowModal] = useState(false);
  const [pickup_location, setPickup_location] = useState("");
  const [delivery_location, setDelivery_location] = useState("");
  const [weight, setWeight] = useState("");
  const [status, setStatus] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [customer, setCustomer] = useState("");
  const [vehicleData, setVehicleData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [currentOrderUpdate, setCurrentOrderUpdate] = useState([]);
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
      const getCustomerData = async () => {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/customer/data"
        );
        setCustomerData(data);
        // console.log(data);
      };
      getCustomerData();
    } catch (error) {
      toast.error(error.response.data);
      console.log("The reading customer name : " + error);
    }
  }, [customerData]);
  useEffect(() => {
    try {
      const getOrderData = async () => {
        let { data } = await axios.get("http://localhost:8000/api/v1/order");
        setOrderData(data);
        // console.log(data);
      };
      getOrderData();
    } catch (error) {
      toast.error(error.response.data);
      console.log("The error in reading driver : " + error);
    }
  }, [orderData]);
  const HandleShowModal = () => {
    setshowModal(true);
  };
  const HandleCloseModal = () => {
    setshowModal(false);
  };
  const HandleSHowUpdate = (info) => {
    setShowModalUpdate(true);
    setCurrentOrderUpdate(info);
  };
  const HandleCloseModalUpdate = () => {
    setShowModalUpdate(false);
  };
  const HandleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete")) {
        let { data } = await axios.delete(
          `http://localhost:8000/api/v1/order/delete-order/${id}`
        );
        toast.success(data);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const HandleRegister = async () => {
    try {
      event.preventDefault();
      let { data } = await axios.post(
        "http://localhost:8000/api/v1/order/register-order",
        {
          pickup_location,
          delivery_location,
          weight,
          status,
          vehicle,
          customer,
        }
      );
      console.log(data);
      HandleCloseModal();
      toast.success(data);
      // Swal.fire("Good job", "You have Registered successfully", "success");
    } catch (error) {
      toast.error(error.response.data);
      console.log("Error in register order : " + error);
    }
  };
  const HandleUpdated = async () => {
    try {
      let { data } = await axios.put(
        `http://localhost:8000/api/v1/order/update-order/${currentOrderUpdate._id}`,
        {
          pickup_location: currentOrderUpdate.pickup_location,
          delivery_location: currentOrderUpdate.delivery_location,
          weight: currentOrderUpdate.weight,
          status: currentOrderUpdate.status,
          vehicle: currentOrderUpdate.vehicle,
          customer: currentOrderUpdate.customer,
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
  return (
    <section id="driver" className="driver">
      <div className="row">
        <div className="col-xl-12">
          <div className="card mt-3">
            <div className="card-header mt-3">
              <h5>Order Table</h5>
              <span className="d-block m-t-5">
                Order <code style={{ color: "#ff0000" }}>information</code>{" "}
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
                      <th>Pickup location</th>
                      <th>Delivery location</th>
                      <th>Weight</th>
                      <th>Status</th>
                      <th>Vehicle</th>
                      <th>Customer</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.map((data) => (
                      <tr key={data._id}>
                        {/* <td>{data._id}</td> */}
                        <td>{data.pickup_location}</td>
                        <td>{data.delivery_location}</td>
                        <td>{data.weight}</td>
                        <td>{data.status}</td>
                        <td>{data.vehicle.type}</td>
                        <td>{data.customer.name}</td>
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
                  <Modal.Title>Order Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Pickup location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter pickup location"
                        value={pickup_location}
                        onChange={(event) =>
                          setPickup_location(event.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Delivery location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter delivery location"
                        value={delivery_location}
                        onChange={(event) =>
                          setDelivery_location(event.target.value)
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter weight"
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        required
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                      >
                        <option>Choose status</option>
                        <option value="pending">Pending</option>
                        <option value="intransit">In transit</option>
                        <option value="delivered">Delivered</option>
                      </Form.Select>
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
                    <Form.Group className="mb-3">
                      <Form.Label>Customer</Form.Label>
                      <Form.Select
                        value={customer}
                        onChange={(event) => setCustomer(event.target.value)}
                      >
                        <option>Choose customer</option>
                        {customerData.map((data) => (
                          <>
                            <option value={data._id}>{data.name}</option>
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
                  <Modal.Title>Edit Order Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Pickup location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter pickup location"
                        value={currentOrderUpdate.pickup_location}
                        onChange={(event) =>
                          setCurrentOrderUpdate({
                            ...currentOrderUpdate,
                            pickup_location: event.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Delivery location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter delivery location"
                        value={currentOrderUpdate.delivery_location}
                        onChange={(event) =>
                          setCurrentOrderUpdate({
                            ...currentOrderUpdate,
                            delivery_location: event.target.value,
                          })
                        }
                     
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter weight"
                        value={currentOrderUpdate.weight}
                        onChange={(event) =>
                          setCurrentOrderUpdate({
                            ...currentOrderUpdate,
                            weight: event.target.value,
                          })
                        }
                       
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        required
                        value={currentOrderUpdate.status}
                        onChange={(event) =>
                          setCurrentOrderUpdate({
                            ...currentOrderUpdate,
                            status: event.target.value,
                          })
                        }
                      >
                        <option>Choose status</option>
                        <option value="pending">Pending</option>
                        <option value="intransit">Intransit</option>
                        <option value="delivered">Delivered</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Vehicle</Form.Label>
                      <Form.Select
                       value={currentOrderUpdate.vehicle}
                       onChange={(event) =>
                         setCurrentOrderUpdate({
                           ...currentOrderUpdate,
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
                    <Form.Group className="mb-3">
                      <Form.Label>Customer</Form.Label>
                      <Form.Select
                       value={currentOrderUpdate.customer}
                       onChange={(event) =>
                         setCurrentOrderUpdate({
                           ...currentOrderUpdate,
                           customer: event.target.value,
                         })
                       }
                      >
                        <option>Choose customer</option>
                        {customerData.map((data) => (
                          <>
                            <option value={data._id}>{data.name}</option>
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

export default AppOrder;
