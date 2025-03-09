import React from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";

function AnalyticsSection() {
  return (
    <section className="bg-light py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <h2 className="fw-bold">Real-Time UX Insights</h2>
            <p className="text-muted">
              Track user behavior, analyze patterns, and make informed decisions with our powerful analytics dashboard.
            </p>
            <div>
              <p className="fw-bold mb-1">Test Completion Rate</p>
              <ProgressBar now={92} label="92%" />
            </div>
          </Col>
          <Col lg={6} className="d-none d-lg-block">
            <img
              src="https://placehold.co/600x400"
              alt="Analytics"
              className="img-fluid rounded"
              aria-label="Illustration of analytics dashboard showing user behavior insights"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AnalyticsSection;