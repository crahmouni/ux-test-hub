import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

function HeroSection() {
  return (
    <section className="bg-light py-5 text-center">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="text-lg-start">
            <h1 className="fw-bold">Test your UX ideas with real users</h1>
            <p className="lead text-muted">
              Get valuable feedback in minutes and make data-driven design decisions.
            </p>
            <Button variant="primary" className="me-3">Start Testing Now</Button>
            <Button variant="outline-dark">Learn More</Button>
          </Col>
          <Col lg={6} className="d-none d-lg-block">
            <img src="https://placehold.co/600x400" alt="UX Testing" className="img-fluid rounded" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
