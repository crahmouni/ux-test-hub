import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as UxTestHubAPI from "../../../services/api-service";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (user) => {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("avatar", user.avatar[0]);

    try {
      // Envía los datos de registro al backend
      await UxTestHubAPI.register(formData);

      // Muestra un mensaje de éxito
      setSuccessMessage("Registration successful! Please check your email to confirm your account.");

      // Redirige al usuario a una página de confirmación (opcional)
      setTimeout(() => navigate("/confirm-email"), 3000); // Cambia "/confirm-email" por la ruta que desees
    } catch (error) {
      // Maneja errores de validación o del servidor
      if (error.response?.data?.errors) {
        const { data } = error.response;
        Object.keys(data.errors).forEach((inputName) =>
          setError(inputName, { message: data.errors[inputName] })
        );
      } else {
        setErrorMessage("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="John Doe"
            {...register("name", { required: "Mandatory field" })}
          />
          {errors.name && (<div className="invalid-feedback">{errors.name.message}</div>)}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="user@example.org"
            {...register("email", { required: "Mandatory field" })}
          />
          {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)}
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text"><i className="fa fa-lock fa-fw"></i></span>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""} `}
            placeholder="****"
            {...register("password", { required: "Mandatory field" })}
          />
          {errors.password && (<div className="invalid-feedback">{errors.password.message}</div>)}
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text"><i className="fa fa-lock fa-fw"></i></span>
          <input
            type="file"
            className={`form-control ${errors.avatar ? "is-invalid" : ""} `}
            {...register("avatar", { required: "Mandatory field" })}
          />
          {errors.avatar && (<div className="invalid-feedback">{errors.avatar.message}</div>)}
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;