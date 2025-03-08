const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../server/server"); // ✅ Importamos el servidor, NO la app
const { store } = require("../config/session.config");

beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/express-api-testing-test",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  console.log("✅ Connected to test database");
});

afterEach(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
});

afterAll(async () => {
    await mongoose.connection.close(); // Cierra la conexión a MongoDB
  
    if (store && typeof store.close === "function") {
      await store.close();
      console.log("🛑 MongoStore connection closed");
    }
  
    // Asegurarse de que Jest espera el cierre del servidor
    await new Promise((resolve) => server.close(resolve));
    console.log("🛑 Server closed after tests");
  });

describe("Users CRUD", () => {
  it("should create a user successfully", async () => {
    const newUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    const res = await request(server) // ✅ Usamos `server`
      .post("/api/v1/users")
      .send(newUser)
      .expect(201);

    expect(res.body).toMatchObject({
      name: "John Doe",
      email: "johndoe@example.com",
      id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    expect(res.body.password).toBeUndefined();
  });

  it("should return an error when email is missing", async () => {
    const newUser = {
      name: "John Doe",
      password: "password123",
    };

    const res = await request(server)
      .post("/api/v1/users")
      .send(newUser)
      .expect(400);

    expect(res.body.message).toBe("User validation failed: email: User email is required");
  });
});
