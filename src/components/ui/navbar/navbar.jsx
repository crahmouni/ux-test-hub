import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth-context";

function AppNavbar() {
  const { user, logout } = useAuthContext();

  return (
    <Navbar expand="lg" bg="white" variant="light" fixed="top" className="shadow-sm border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/">UX Test Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/ux-tests">UX Tests</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
          </Nav>

          {user ? (
            <>
              <Nav.Link as={Link} to="/profile" className="ms-3">{user.email}</Nav.Link>
              <Button variant="outline-danger" className="ms-2" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" variant="outline-dark" className="ms-3">Login</Button>
              <Button as={Link} to="/register" variant="primary" className="ms-2">Sign Up</Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;