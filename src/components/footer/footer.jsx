import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={3}>
            <h5>UX Test Hub</h5>
            <p className="text-muted">Simplifying UX testing for teams worldwide.</p>
          </Col>
          <Col md={3}>
            <h6>Company</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted">About Us</a></li>
              <li><a href="#" className="text-muted">Careers</a></li>
              <li><a href="#" className="text-muted">Press</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Help</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted">Support</a></li>
              <li><a href="#" className="text-muted">FAQ</a></li>
              <li><a href="#" className="text-muted">Privacy Policy</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Contact</h6>
            <p className="text-muted">info@uxtesthub.com</p>
            <p className="text-muted">+1 (234) 567-890</p>
          </Col>
        </Row>
        <div className="text-center mt-3 text-muted">
          © {new Date().getFullYear()} UX Test Hub. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
