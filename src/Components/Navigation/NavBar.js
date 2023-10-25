import React, { useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const login = useSelector((state) => state.auth.token);
  const mode = useSelector((state) => state.auth.mode);
  console.log("hii");
  useEffect(() => {
    const print=()=>{
      console.log("rendered")
    }
    print()
  }, [login]);
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Mail Box</Navbar.Brand>
          <Nav>
            {login && (
              <Nav.Link as={Link} to="/sent">
                Mails Sent
              </Nav.Link>
            )}
            {login && (
              <Nav.Link as={Link} to="/inbox">
                Inbox
              </Nav.Link>
            )}
            {login && (
              <Nav.Link as={Link} to="/composeEmail">
                Compose Email
              </Nav.Link>
            )}
            {mode === "signUp" && !login && (
              <Nav.Link as={Link} to="/signup">
                SignUp
              </Nav.Link>
            )}
            {mode === "login" && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {login && (
              <Nav.Link as={Link} to="/logout">
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
