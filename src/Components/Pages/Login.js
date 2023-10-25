import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./Login.css";
import { useState } from "react";
import { authActions } from "../Store/AuthStore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history=useHistory()
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [details, setDetails] = useState({ email: "", password: "" });

  const setEmailHandler = (e) => {
    setDetails({ ...details, ["email"]: e.target.value });
  };

  const dispatch = useDispatch();
  dispatch(authActions.setSignUp());

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGk2qPu-8-zXjImfJ8knoATMr5pYrhNKc",
      {
        method: "POST",
        body: JSON.stringify({
          email: details.email,
          password: details.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
        }
      })
      .then((data) => {
        if (data.idToken) {
          setAlert({
            ...alert,

            message: "Login is Successful",
            variant: "success",
          });
          const trimmedEmail = details.email.replace("@gmail.com", "");
          dispatch(authActions.setUserEmail(trimmedEmail));
        }

        dispatch(authActions.setTokenId(data.idToken));
      })
      .catch((err) => {
        setAlert({
          ...alert,
          message: "wrong credentials",
          variant: "warning",
        });
      });

    setDetails({ email: "", password: "" });
    history.push('/inbox')
  };

  const setPasswordHandler = (e) => {
    setDetails({ ...details, ["password"]: e.target.value });
  };

  return (
    <>
      {alert !== "" && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <div className="form">
        <Container fluid="justify-content-md">
          <form onSubmit={submitHandler}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              size="sm w-20"
              value={details.email}
              type="email"
              placeholder="email@gmail.com"
              onChange={setEmailHandler}
              required
            ></Form.Control>
            <Form>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={details.password}
                placeholder="enter min 6 characters"
                onChange={setPasswordHandler}
                required
              ></Form.Control>
            </Form>

            <Button type="submit">Login</Button>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Login;
