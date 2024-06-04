import { FastifyInstance } from "fastify";
import { createController } from "./controllers/createProductController";
import { findProductController } from "./controllers/findProductController";
import { deleteById } from "./controllers/deleteProductController";

export async function routes(app: FastifyInstance) {
  app.addHook("onRequest", async () => {
    console.log("Request received");
  });

  app.get("/", async (req, res) => {
    return { hello: "world" };
  });

  app.get("/products", findProductController);
  app.post("/products", createController);
  app.get("/products/:id", findProductController);
  app.delete("/products/:id", deleteById);
}
