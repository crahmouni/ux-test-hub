const app = require("../app");

const port = Number(process.env.PORT || 5000);

const server = app.listen(port, () => {
  console.info(`Application running at port ${port}`);
});

module.exports = server; // ✅ Exportamos el servidor para usarlo en los tests
