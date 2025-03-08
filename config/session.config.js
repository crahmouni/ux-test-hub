const expressSession = require("express-session");
const MongoStore = require("connect-mongo");

const sessionMaxDays = parseInt(process.env.SESSION_MAX_DAYS || "1");

// Crear la instancia de MongoStore y guardarla
const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  ttl: sessionMaxDays * 24 * 60 * 60
});

const sessionMiddleware = expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === "true",
    maxAge: sessionMaxDays * 24 * 60 * 60 * 1000
  },
  store: store
});

// Exportamos la sesión y la instancia de MongoStore
module.exports = {
  loadSession: sessionMiddleware,
  store // Exportamos el store para cerrarlo en los tests
};
