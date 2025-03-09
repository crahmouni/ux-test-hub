import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link para la navegación

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
              <li><Link to="/about" className="text-muted">About Us</Link></li>
              <li><Link to="/careers" className="text-muted">Careers</Link></li>
              <li><Link to="/press" className="text-muted">Press</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Help</h6>
            <ul className="list-unstyled">
              <li><Link to="/support" className="text-muted">Support</Link></li>
              <li><Link to="/faq" className="text-muted">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="text-muted">Privacy Policy</Link></li>
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