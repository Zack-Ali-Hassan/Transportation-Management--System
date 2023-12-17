import axios from "axios";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function AppForgetPassword() {
  const navigation = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const HandleClick = async (e) => {
    e.preventDefault();
    try {
      let {data} = await axios.put("http://localhost:8000/api/v1/user/forgetPassword", {email,password})
      toast.success("password updated successfull ......");
      navigation("/");
    } catch (error) {
      console.log("forgetpassword frontend error : " + error);
      toast.error(error.response.data);
    } 
  };
  const HandleReset = async (e) => {
    e.preventDefault();
    navigation("/");
  };
  const HandleBack = () => {
    navigation("/");
  };
  return (
    <section>
      <Container className="forgetPssword">
        <h1>Reset Password</h1>
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
                  setemail(e.target.value);
                }}
              />
             
            </Form.Group>
            <Form.Group className="mt-3 was-validated">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                value={password}
                type="text"
                placeholder="New Password"
                
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </Form.Group>
           
            <div className=" mt-4">
              <a
                className="btn btn-primary btn2"
                type="submit"
                onClick={HandleClick}
              >
                <i className="fa fa-sign-in"> </i> Reset Password
              </a>
              <a
                className="btn btn-primary btn1"
                type="submit"
                onClick={HandleBack}
              >
                <i className="	fa fa-angle-left "> </i> Back
              </a>
            </div>
          </Form>
        </div>
      </Container>
    </section>
  );
}

export default AppForgetPassword;
