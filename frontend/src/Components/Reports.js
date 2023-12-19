import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ProtectPage from "../utills/ProtectPage";
import axios from "axios";
import toast from "react-hot-toast";
import Form from "react-bootstrap/Form";
function AppReports() {
  const [showTableMaintenance, setTableMaintenance] = useState(false);
  const [showTableFuel, setTableFuel] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [getAllMaintenanceReport, setGetAllMaintenanceReport] = useState([]);
  const [getAllFuelReport, setGetAllFuelReport] = useState([]);
  const componentRef = useRef();
  useEffect(() => {
    try {
      const getData = async () => {
        let { data } = await axios.get(
          "http://localhost:8000/api/v1/report/maintenance"
        );
        setGetAllMaintenanceReport(data);
      };
      getData();
    } catch (error) {
      toast.error(error.response.data);
      console.log("The reading all report : " + error);
    }
  }, []);
  useEffect(() => {
    try {
      const getData = async () => {
        let { data } = await axios.get(
          "http://localhost:8000/api/v1/report/fuel"
        );
        setGetAllFuelReport(data);
      };
      getData();
    } catch (error) {
      toast.error(error.response.data);
      console.log("The reading all report : " + error);
    }
  }, []);

  const HandleOrderTable = () => {
    setTableMaintenance(true);
    setTableFuel(false);
  };
  const HandleVehicleTable = () => {
    setTableFuel(true);
    setTableMaintenance(false);
  };
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return (
    <ProtectPage>
      <section id="report" className="report">
        <div className="row ">
          <div className="col-xl-12">
            <div className="card mt-3 ">
              <div className="card-header mt-3">
                <h5>Reports</h5>
                <span className="d-block m-t-5">
                  Report <code>information</code>
                </span>
              </div>
              <div className="card-block table-border-style me-5">
                <Nav className="me-auto mt-3 ms-4">
                  <NavDropdown
                    title="Reports"
                    id="basic-nav-dropdown"
                    className="dropDown "
                  >
                    <NavDropdown.Item>
                      <a
                        style={{ textDecoration: "none", color: "black" }}
                        onClick={HandleOrderTable}
                      >
                        <i className="fas fa-cart-arrow-down fs-5 me-3"></i>
                        Maintenance Report
                      </a>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <a
                        style={{ textDecoration: "none", color: "black" }}
                        onClick={HandleVehicleTable}
                      >
                        <i className="fa-solid fa-book fs-5 me-3"></i>
                        Fuel Report
                      </a>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>

                {/* Maintenance REPORT */}
                {showTableMaintenance && (
                  <div
                    ref={(el) => (componentRef.current = el)}
                    className="p-5"
                  >
                    <>
                      <h1 className="fs-4 fw-bold justify-content-end d-flex">
                        {date}
                      </h1>
                      <h1 className="fs-4 fw-bold justify-content-center d-flex">
                        Maintenance Information
                      </h1>
                      <table className="table mt-4 ms-4" id="orderTable">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Vehicle</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                        {getAllMaintenanceReport.map((data) => (
                            <tr key={data._id}>
                              <td>{data.type}</td>
                              <td>{data.description}</td>
                              <td>{data.cost}</td>
                              <td>{data.vehicle.type}</td>
                              <td>{data.createdAt}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  </div>
                )}

                {/* FUEL REPORT */}
                {showTableFuel && (
                  <div
                    ref={(el) => (componentRef.current = el)}
                    className="p-5 "
                  >
                    <>
                      <h1 className="fs-4 fw-bold justify-content-end d-flex">
                        {date}
                      </h1>
                      <h1 className="fs-4 fw-bold justify-content-center d-flex">
                        Fuel Information
                      </h1>
                      <table className="table mt-4 ms-4" id="fuelTable">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                            <th>Vehicle</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getAllFuelReport.map((data) => (
                            <tr key={data._id}>
                              <td>{data.type}</td>
                              <td>{data.quantity}</td>
                              <td>{data.cost}</td>
                              <td>{data.vehicle.type}</td>
                              <td>{data.createdAt}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  </div>
                )}

                {/* PRINT REPORT */}

                <div>
                  <ReactToPrint
                    trigger={() => {
                      return (
                        <button className="btn btn-info mt-3 ms-4 mb-4">
                          <i className="fas fa-print"></i> Print / download
                        </button>
                      );
                    }}
                    content={() => componentRef.current}
                    documentTitle="New report"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProtectPage>
  );
}
export default AppReports;
