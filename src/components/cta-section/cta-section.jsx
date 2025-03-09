import React from "react";
import { Container, Button } from "react-bootstrap";

function CTASection() {
  return (
    <section className="bg-primary text-white py-5">
      <Container className="text-center">
        <h2 className="fw-bold mb-3">Ready to Improve Your UX?</h2>
        <p className="lead mb-4">
          Join thousands of designers who are creating better user experiences
          with UX Test Hub.
        </p>
        <Button variant="light" className="text-primary">
          Start Free Trial
        </Button>
      </Container>
    </section>
  );
}

export default CTASection;