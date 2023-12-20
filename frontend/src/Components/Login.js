import React, { createContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./loginSignUp.css";
import toast from "react-hot-toast";
import axios from 'axios';
import { UserAuth } from "../Context";
function AppLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const {setCurrentUser} = UserAuth();
  // console.log("The currentUser is : " + currentUser?.name);
  const [toggleEye, settoggleEye] = useState(false);
  const [inputToggleEye, setinputToggleEye] = useState("password");
  const navigate = useNavigate();
  useEffect(()=>{
    localStorage.clear();
  },[])
  const HandleClick = async () => {
    try {
      let {data} = await axios.post("http://localhost:8000/api/v1/user/user-login", {email,password})
      setCurrentUser(data);
      toast.success("Login successfull ......");
      // navigate("/home");
      window.location= "/home";
    } catch (error) {
      console.log("Login frontend error : " + error);
      toast.error(error.response.data);
    } 
   };
   const HandleToggle = (e) => {
    settoggleEye(!toggleEye);
    setinputToggleEye(inputToggleEye === "password" ? "text" : "password");
  }
  const HandleRegis = () => {
    navigate("/forget");
  };
  return (
    <section id="login" className="">
      <Container className="login">
        <h1>Log In</h1>
        <div className="form-goup">
          <Form className="needs-validation" onSubmit={HandleClick}>
            <Form.Group className="mt-3 was-validated">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Email Address"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                
              />
              <div className="invalid-feedback">Please enter your email</div>
            </Form.Group>
            <Form.Group className="mt-3 was-validated">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3 ">
                <Form.Control
                  value={password}
                  type={inputToggleEye}
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                 
                />
                {toggleEye ? (
                  <InputGroup.Text id="basic-addon2" onClick={HandleToggle}>
                    <i class="fa fa-eye show" aria-hidden="true"></i>
                  </InputGroup.Text>
                ) : (
                  <InputGroup.Text id="basic-addon2" onClick={HandleToggle}>
                    <i class="fa fa-eye-slash hide show" aria-hidden="true"></i>
                  </InputGroup.Text>
                )}
                <div className="invalid-feedback">
                  Please enter your password
                </div>
              </InputGroup>
              <div>
                <p>
                  <a onClick={HandleRegis} className="forgetPasswordLogin">
                    forget Password?
                  </a>
                </p>
              </div>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
            </Form.Group>
            <div className="d-grid gap-2 mt-4 ">
              <Button
                className="btn btn-primary"
                
                onClick={HandleClick}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </section>
  );
}

export default AppLogin;
