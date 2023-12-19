import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import video1 from "../Images/video1.mp4";
import "./style.css";
import axios from "axios";
import ProtectPage from "../utills/ProtectPage";
function AppHome() {

  const [userCount, setUserCount] = useState("");
  const [customerCount, setCustomerCount] = useState("");
  const [routesCount, setRoutesCount] = useState("");
  const [vehicleCount, setVehicleCount] = useState("");
  const [driverCount, setDriverCount] = useState("");
  const [orderCount, setOrderCount] = useState("");
  useEffect(()=>{
    const getUserCount = async ()=>{
      let {data} = await axios.get("http://localhost:8000/api/v1/dashboard/user");
    setUserCount(data);
    }
    const getCustomerCount = async ()=>{
      let {data} = await axios.get("http://localhost:8000/api/v1/dashboard/customer");
    setCustomerCount(data);
    }
    const getRoutesCount = async ()=>{
      let {data} = await axios.get("http://localhost:8000/api/v1/dashboard/routes");
    setRoutesCount(data);
    }
    const getVehicleCount = async ()=>{
      let {data} = await axios.get("http://localhost:8000/api/v1/dashboard/vehicle");
    setVehicleCount(data);
    }
    const getDriverCount = async ()=>{
      let {data} = await axios.get("http://localhost:8000/api/v1/dashboard/driver");
    setDriverCount(data);
    }
    const getOrderCount = async ()=>{
      let {data} = await axios.get("http://localhost:8000/api/v1/dashboard/orders");
    setOrderCount(data);
    }
    getOrderCount();
    getDriverCount();
    getVehicleCount();
    getRoutesCount();
    getCustomerCount();
    getUserCount();
  },[])
  return (
    <ProtectPage>
    <section id="home" className="home">
      <Container fluid>
        <Row className="ms-5 mt-5">
          <Col
            sm={3}
            className="p-5 m-5  bg-white shadow-sm d-flex justify-content-around align-items-center rounded"
          >
            <div>
              <h3 className="fs-2 p-3 fw-bold">{userCount}</h3>
              <p className="fs-5 fw-bold">Users</p>
            </div>
            <i className="fa-solid fa-user p-2 fs-1"></i>
          </Col>
          <Col
            sm={3}
            className="p-5 m-5  bg-white shadow-sm d-flex justify-content-around align-items-center rounded"
          >
            <div>
              <h3 className="fs-2 p-3 fw-bold">{orderCount}</h3>
              <p className="fs-5 fw-bold">Orders</p>
            </div>
            <i className="fas fa-shopping-basket p-2 fs-1"></i>
          </Col>
          <Col
            sm={3}
            className="p-5 m-5  bg-white shadow-sm d-flex justify-content-around align-items-center rounded"
          >
            <div>
              <h3 className="fs-2 p-3 fw-bold">{routesCount}</h3>
              <p className="fs-5 fw-bold">Routes</p>
            </div>
            <i className="fas fa-cart-arrow-down p-2 fs-1"></i>
          </Col>

          <Col
            sm={3}
            className="p-5 m-5  bg-white shadow-sm d-flex justify-content-around align-items-center rounded"
          >
            <div>
              <h3 className="fs-2 p-3 fw-bold">{vehicleCount}</h3>
              <p className="fs-5 fw-bold">Vehicles</p>
            </div>
            <i className="fas fa-subway p-2 fs-1"></i>
          </Col>
          <Col
            sm={3}
            className="p-5 m-5  bg-white shadow-sm d-flex justify-content-around align-items-center rounded"
          >
            <div>
              <h3 className="fs-2 p-3 fw-bold">{driverCount}</h3>
              <p className="fs-5 fw-bold">Drivers</p>
            </div>
            <i className="fas fa-car-crash p-2 fs-1"></i>
          </Col>
          <Col
            sm={3}
            className="p-5 m-5  bg-white shadow-sm d-flex justify-content-around align-items-center rounded"
          >
            <div>
              <h3 className="fs-2 p-3 fw-bold">{customerCount}</h3>
              <p className="fs-5 fw-bold">Customers</p>
            </div>
            <i className="far fa-address-card p-2 fs-1"></i>
          </Col>
         

          {/* Charts */}
          {/* <Row className="mt-3 mb-4">
            <h3 className="text-white fw-bold justify-content-center align-item-center d-flex mt-4">
              Charts
            </h3>
            <Col
              sm={5}
              className="p-4 m-3  bg-white shadow-sm d-flex justify-content-around align-items-center rounded"
            >
              <Chart
                options={chart.options}
                series={chart.series}
                type="bar"
                width="450"
              />
            </Col>
            <Col
              sm={5}
              className="p-4 m-3  bg-white shadow-sm d-flex justify-content-around align-items-center rounded"
            >
              <Chart
                options={chart1.options}
                series={chart1.series}
                type="line"
                width="450"
              />
            </Col>
          </Row> */}
        </Row>
        <Row className="mt-2 ms-3 bg-secondary ">
          <h3 className="text-white fw-bold justify-content-center align-item-center d-flex mt-5">
            Video Transportation
          </h3>
          <div className="">
            <video
              controls
              src={video1}
              type="video/mp4"
              className="w-100 min-vh-100"
            ></video>
          </div>
        </Row>
      </Container>
    </section>
    </ProtectPage>
  );
}

export default AppHome;
