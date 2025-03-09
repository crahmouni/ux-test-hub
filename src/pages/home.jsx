import React from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import PrototypeList from "../components/prototypes/prototype-list/prototype-list";

// Secciones de la Home Page
import HeroSection from "../components/hero/hero-section";
import HowItWorksSection from "../components/how-it-works-section/how-it-works-section";
import FeaturesSection from "../components/features/features-section";
import AnalyticsSection from "../components/analytics/analytics-section";
import TestimonialsSection from "../components/testimonials/testimonials-section";
import CommunitySection from "../components/community/community-section";
import CTASection from "../components/cta-section/cta-section";

function HomePage() {
  const featuredPrototypes = [
    { id: 1, title: "Featured Prototype 1", description: "This is a featured prototype.", poster: "https://placehold.co/600x400" },
    { id: 2, title: "Featured Prototype 2", description: "This is another featured prototype.", poster: "https://placehold.co/600x400" },
  ];

  return (
    <main className="pt-[72px]">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AnalyticsSection />
      <TestimonialsSection />
      <CommunitySection />
      <CTASection />

      <Container className="py-4">
        <h2>Featured Prototypes</h2>
        <Carousel>
          {featuredPrototypes.map((prototype) => (
            <Carousel.Item key={prototype.id}>
              <img
                className="d-block w-100"
                src={prototype.poster}
                alt={prototype.title}
              />
              <Carousel.Caption>
                <h3>{prototype.title}</h3>
                <p>{prototype.description}</p>
                <Button as={Link} to={`/prototype/${prototype.id}`} variant="primary">
                  View Details
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </main>
  );
}

export default HomePage;