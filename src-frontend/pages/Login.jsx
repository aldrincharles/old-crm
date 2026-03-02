import "../styles/Login.css";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Label,
  Input,
  Form,
  FormGroup,
  Card,
  CardBody,
} from "reactstrap";

import { publicAxios } from "api/axios";
import { AuthContext } from "context/Auth";
import { PageTitle } from "components";

const Login = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email_address: "",
    password: "",
  });
  const [error, setError] = useState("");

  let from = location.state?.from?.pathname || "/";

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await publicAxios.post(
        "/login",
        {
          email_address: formData.email_address,
          password: formData.password,
        },
        { withCredentials: true }
      );
      const result = response.data;
      setAuth(result);
      navigate(from, { replace: true });
    } catch (error) {
      if (error.response) {
        const { msg } = error.response.data;
        setError(msg);
      }
    }
  };

  const handleOnChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value ? value : "",
    });
  };

  return (
    <>
      <PageTitle title={`Login`} />
      <div
        style={{
          backgroundColor: "lightgray",
          // backgroundImage: `url(${"/assets/login-bg.jpg"})`,
          // backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Card className="login-card d-flex text-white">
          <CardBody>
            <h1 className="text-primary fw-bold">
              <span
                style={{ fontFamily: "Times New Roman", color: "white" }}
                className="h1"
              >
                Itel
              </span>
            </h1>
            <h5 className="mt-3 fw-bold">Welcome, please sign in!</h5>
            <Form className="form" id="LoginForm" onSubmit={handleOnSubmit}>
              {error && <Alert color="danger">{error}</Alert>}
              <FormGroup>
                <Label for="exampleEmail">Email:</Label>
                <Input
                  id="exampleEmail"
                  type="email"
                  maxLength={40}
                  value={formData.email_address}
                  onChange={(e) => {
                    handleOnChange("email_address", e.target.value);
                  }}
                  placeholder="your_email@itel-international.com"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password:</Label>
                <Input
                  id="examplePassword"
                  type="password"
                  maxLength={40}
                  value={formData.password}
                  onChange={(e) => {
                    handleOnChange("password", e.target.value);
                  }}
                  required
                />
              </FormGroup>
            </Form>
            <Button
              form="LoginForm"
              // className="d-flex justify-align-center"
              color="primary"
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Login;
