import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth-context";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

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
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#blog">Blog</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            {user?.role === "admin" && (
              <Nav.Link as={Link} to="/create-prototype">Create Prototype</Nav.Link>
            )}
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
