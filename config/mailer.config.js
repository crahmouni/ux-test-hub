const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

module.exports.sendValidationEmail = (user) => {
  const validateUrl = `${process.env.APP_URL}/api/v1/users/${user.id}/validate?token=${user.activateToken}`;

  return transporter.sendMail({
    from: `"UX Test Hub" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Confirma tu cuenta en UX Test Hub",
    html: `
      <h1>Hola, ${user.name}!</h1>
      <p>Gracias por registrarte en UX Test Hub.</p>
      <p>Por favor, confirma tu cuenta haciendo clic en el siguiente enlace:</p>
      <a href="${validateUrl}">Validar cuenta</a>
      <p>Si no has solicitado esta cuenta, ignora este correo.</p>
    `,
  });
};

module.exports.sendWelcomeEmail = (userEmail, userName) => {
  return transporter.sendMail({
    from: `"UX Test Hub" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Bienvenido a UX Test Hub!",
    html: `
      <h1>Hola, ${userName}!</h1>
      <p>Gracias por unirte a UX Test Hub.</p>
      <p>Explora y testea prototipos, deja feedback y colabora con la comunidad!</p>
      <p>💡 Si tienes dudas, contáctanos.</p>
      <p>El equipo de UX Test Hub 🚀</p>
    `,
  });
};
