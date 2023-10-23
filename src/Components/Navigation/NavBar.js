import React from "react";
import { Container, Navbar } from "react-bootstrap";
import {NavLink} from "react-router-dom"
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const NavBar = () => {
  const mode=useSelector(state=>state.auth.mode)
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >Mail Box</Navbar.Brand>
          <Nav>
           {mode==='signUp' &&  <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>}
            {mode==='login' && <Nav.Link as={Link}  to="/login">Login</Nav.Link>}
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
