import { FastifyInstance } from "fastify";
import { createUser } from "./create-user-controller";
import { updateUser } from "./update-user-controller";
import { fetchUsers } from "./fetch-users-controller";
import { deleteUser } from "./delete-user-controller";

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', fetchUsers)

  app.post('/users', createUser)

  app.patch('/users/:userId/update', updateUser)

  app.delete('/users/:userId/delete', deleteUser)
}