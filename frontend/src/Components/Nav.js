import React, { useState } from "react";
// import Typed from "react-typed";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AppLayout from "./Layout";
import "./nav.css";
import { TypeAnimation } from "react-type-animation";
import AppProfile from "./profile";
import { UserAuth } from "../Context";
function AppNav({ HandleToggle }) {
  const { currentUser, setCurrentUser } = UserAuth();
  console.log("The nav current user : " + currentUser);
  const [showModal, setshowModal] = useState(false);
  const HandleShowModal = () => {
    setshowModal(true);
  };
  const HandleCloseModal = () => {
    setshowModal(false);
  };
  const HandleUpdate = () => {
    setshowModal(false);
    Swal.fire("Good job", "You have updated successfully", "success");
    window.location.reload();
  };
  const HandleDelete = () => {
    if (window.confirm("Are you sure you want to delete")) {
      setshowModal(false);
      Swal.fire("Good job!", "You Deleted!", "success");
    }
    window.location.reload();
  };
  return (
    <AppLayout>
      <section id="dashboard" className="nav">
        <Container fluid>
          <Navbar className="main-nav-container" expand="lg">
            <div className="brand-container">
              <Navbar.Brand>
                <i className="fa fa-align-left fs-4" onClick={HandleToggle}></i>
              </Navbar.Brand>
              <Navbar.Brand>
                <TypeAnimation
                  sequence={[
                    "Transportation Management System",
                    1000,
                    "Developed by :",
                    1000,
                    "Zack Ali Hassan",
                    1000,
                    "Abdijabar jama",
                    1000,
                    "Adan Saleban",
                    1000,
                    "Abshir Muse",
                    1000,
                    "Husein Omar",
                    1000,
                    "Salahudiin Abdirahman",
                    1000,
                    "Abdullahi Abdikarim",
                    1000,
                  ]}
                  speed={20}
                  style={{
                    fontSize: "25px",
                    display: "inline-block",
                    fontWeight: "bold",
                  }}
                  repeat={Infinity}
                />
                {/* <Typed
                  strings={["Al Hilaal Transportation Management System"]}
                  typeSpeed={55}
                  backSpeed={55}
                  pm
                  loop
                  className="trans"
                />*/}

                {/* <Link to={"/home"} ></Link> */}
              </Navbar.Brand>
            </div>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <div className="collapse-conatiner">
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown
                    title={currentUser?.name}
                    id="basic-nav-dropdown"
                    className="dropDown"
                  >
                    <NavDropdown.Item>
                      <Link
                        onClick={HandleShowModal}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <i className="fa fa-user px-2"></i>
                        Profile
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </Container>
        <AppProfile
          show={showModal}
          hanldeclose={HandleCloseModal}
          HandleUpdate={HandleUpdate}
          HandleDelete={HandleDelete}
        />
      </section>
    </AppLayout>
  );
}

export default AppNav;
