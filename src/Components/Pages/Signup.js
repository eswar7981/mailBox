import React from "react";
import { useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { authActions } from "../Store/AuthStore";
import { useDispatch } from "react-redux";
import { useDebugValue } from "react";
import { useEffect } from "react";
const Signup = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [alert, setAlert] = useState({message:"",variant:''});
  const dispatch = useDispatch();

  dispatch(authActions.setLogin());

  const emailHandler = (e) => {
    setDetails({ ...details, ["email"]: e.target.value });
  };

  const passwordHandler = (e) => {
    setDetails({ ...details, ["password"]: e.target.value });
  };

  const confirmPasswordHandler = (e) => {
    setDetails({ ...details, ["passwordConfirm"]: e.target.value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();


    if (details.password === details.passwordConfirm) {
    
    
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGk2qPu-8-zXjImfJ8knoATMr5pYrhNKc",
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
      ).then((res) => {
        if (res.ok) {
          setAlert({...alert,message:'Signup is Successful',variant:'success'})
        }
        else{
          res.json().then((data)=>console.log(data))
        }
      });
    
    } else {
      setAlert({...alert,message:'Passwords are not matching',variant:'warning'});
    }

    setDetails({
      email: "",
      password: "",
      passwordConfirm: "",
    });
  };

  return (
    <>
      {alert !== "" && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <div className="form">
        <form onSubmit={formSubmitHandler}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            value={details.email}
            onChange={emailHandler}
            type="email"
            placeholder="emailaddress@gmail.com"
            required
          ></Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={details.password}
            onChange={passwordHandler}
            placeholder="min 6 characters"
            required
          ></Form.Control>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={confirmPasswordHandler}
            value={details.passwordConfirm}
            placeholder="min 6 characters"
            required
          ></Form.Control>
          <Button type="submit">SignUp</Button>
        </form>
      </div>
    </>
  );
};

export default Signup;
