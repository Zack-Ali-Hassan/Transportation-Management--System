import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
function AppSideBar() {
  return (
    <div className=" sidebar p-2">
      {/* <div className="m-2 ">
        <span className="brand-name fs-4">Zack</span>
      </div>
      <hr className="text-dark" /> */}
      <div className="list-group list-group-flush">
        <span className="Information">Transportation</span>
        <hr></hr>
        <a className="list-group-item py-2">
          <span>
            <Link to={"/home"} className="link">
              <i className="fa-solid fa-house fs-5 me-3"></i>
              Dashboard
            </Link>
          </span>
        </a>
        <a className="list-group-item py-2">
          <span>
            <Link to={"/users"} className="link">
              <i className="fa-solid fa-user fs-5 me-3"></i>
              Users
            </Link>
          </span>
        </a>
        <a className="list-group-item py-2">
          <span>
            <Link to={"/customers"}>
              <i className="fa-solid fa-users me-3"></i>Customers
            </Link>
          </span>
        </a>
        <a className="list-group-item py-2">
          <span>
            <Link to={"/routes"} className="link">
              <i className="fas fa-route fs-5 me-3"></i>
              Routes
            </Link>
          </span>
        </a>

        <a className="list-group-item py-2">
          <span>
            <Link to={"/vehicles"} className="link">
              <i className="fas fa-subway fs-5 me-3"></i>
              Vehicles
            </Link>
          </span>
        </a>
        <a className="list-group-item py-2">
          <span>
            <Link to={"/drivers"} className="link">
              <i className="fas fa-car-crash fs-5 me-3"></i>
              Drivers
            </Link>
          </span>
        </a>
        <a className="list-group-item py-2">
          <span>
            <Link to={"/fuel-record"} className="link">
              <i className="fas fa-gas-pump fs-5 me-3"></i>
              Fuel record
            </Link>
          </span>
        </a>
        <a className="list-group-item py-2">
          <span>
            <Link to={"/maintenance-record"} className="link">
              <i className="fas fa-tools fs-5 me-3"></i>
              Maintenance
            </Link>
          </span>
        </a>
        <a className="list-group-item py-2">
          <span>
            <Link to={"/orders"} className="link">
              <i className="fas fa-shopping-basket fs-5 me-3"></i>
              Orders
            </Link>
          </span>
        </a>
        <a className="list-group-item py-2">
          <span>
            <Link to={"/reports"} className="link">
              <i className="fa fa-file fs-5 me-3"></i>
              Reports
            </Link>
          </span>
        </a>
        <a className="list-group-item py-2">
          <span>
            <a href="/" className="link">
              <i className="fa-solid fa-arrow-right-from-bracket fs-5 me-3"></i>
              Logout
            </a>
          </span>
        </a>
      </div>
    </div>
  );
}

export default AppSideBar;
