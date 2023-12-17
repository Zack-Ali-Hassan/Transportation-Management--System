import React, { useState, createContext, useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLogin from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppSideBar from "./Components/SideBar";
import AppNav from "./Components/Nav";
import AppHome from "./Components/Home";
import AppRoutes from "./Components/Routes_table";
import AppVehicles from "./Components/Vehicles";
import AppDrivers from "./Components/Drivers";
import AppReports from "./Components/Reports";
import AppCustomers from "./Components/Customers";
import AppUsers from "./Components/Users";
import AppLayout from "./Components/Layout";
import AppForgetPassword from "./Components/ForgetPassword";
import AppFooter from "./Components/Footer";
import {Toaster} from 'react-hot-toast';
import AppFuel from "./Components/fuel_record";
import AppMaintenance from "./Components/maintenance_record";
import AppOrder from "./Components/Order";
import { AppContext } from "./Context";
export const userContext = createContext();

function App() {
  const [user, setUser] = useState("Abdi");
  const [toggle, setToggle] = useState(true);
  const HandleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="App">
      <AppContext>
      <BrowserRouter>
      <Toaster/>
        <div className="dashboard bg-white min-vh-100">
          <Container fluid>
            <Row>
              <AppLayout>
                {toggle && (
                  <Col sm={2} className=" bg-white min-vh-100 position-fixed">
                    <AppSideBar />
                  </Col>
                )}
                {toggle && <div className="col-md-2"></div>}
              </AppLayout>
              <Col
                sm={toggle ? 10 : 12}
                className="px-3 bg-secondary min-vh-100"
              >
                <AppLayout>
                  <AppNav HandleToggle={HandleToggle} />
                </AppLayout>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <div className="bg-secondary h-100 w-100 d-flex marginLogin">
                        <AppLogin />
                      </div>
                    }
                  ></Route>
                  <Route
                    path="/forget"
                    element={
                      <div className="bg-secondary h-100 w-100 d-flex marginLogin">
                        <AppForgetPassword />
                      </div>
                    }
                  ></Route>
                  <Route path="/home" element={<AppHome></AppHome>}></Route>
                  <Route path="/users" element={<AppUsers></AppUsers>}></Route>
                  <Route
                    path="/customers"
                    element={<AppCustomers></AppCustomers>}
                  ></Route>
                  <Route
                    path="/routes"
                    element={<AppRoutes></AppRoutes>}
                  ></Route>
                  <Route
                    path="/vehicles"
                    element={<AppVehicles></AppVehicles>}
                  ></Route>
                  <Route
                    path="/drivers"
                    element={<AppDrivers></AppDrivers>}
                  ></Route>
                  <Route
                    path="/fuel-record"
                    element={<AppFuel></AppFuel>}
                  ></Route>
                  <Route
                    path="/maintenance-record"
                    element={<AppMaintenance></AppMaintenance>}
                  ></Route>
                  <Route
                    path="/orders"
                    element={<AppOrder></AppOrder>}
                  ></Route>
                  <Route
                    path="/reports"
                    element={<AppReports></AppReports>}
                  ></Route>
                </Routes>
                <AppLayout>
                  <AppFooter></AppFooter>
                </AppLayout>
                {/* <AppHome></AppHome> */}
              </Col>
            </Row>
          </Container>
        </div>

        {/* <Routes>
          <Route path="/" element={<AppLogin />}></Route>
          <Route path="/signup" element={<AppSignUp />}></Route>
        </Routes> */}
      </BrowserRouter>
      </AppContext>
    </div>
  );
}

export default App;
