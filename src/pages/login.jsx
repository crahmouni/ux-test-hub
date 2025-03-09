import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "../components/users/login/login-form"; // Importa el formulario de login

function LoginPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <LoginForm /> {/* Usa el componente LoginForm */}
              <div className="text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link> {/* Enlace para recuperar contraseña */}
              </div>
              <div className="text-center mt-3">
                <span>Don't have an account? </span>
                <Link to="/register">Sign Up</Link> {/* Enlace para registrarse */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;