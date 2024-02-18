import { FastifyInstance } from "fastify";
import { createUser } from "./create-user-controller";

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
}