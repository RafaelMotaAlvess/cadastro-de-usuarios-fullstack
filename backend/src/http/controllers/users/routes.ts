import { FastifyInstance } from "fastify";
import { createUser } from "./create-user-controller";
import { updateUser } from "./update-user-controller";
import { fetchUsers } from "./fetch-users-controller";

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', fetchUsers)
  app.post('/users', createUser)
  app.patch('/users/:userId/update', updateUser)
}