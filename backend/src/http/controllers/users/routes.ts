import { FastifyInstance } from "fastify";
import { createUser } from "./create-user-controller";
import { updateUser } from "./update-user-controller";
import { fetchUsers } from "./fetch-users-controller";
import { deleteUser } from "./delete-user-controller";
import { fetchUsersByCreatedAt } from "./fetch-users-by-created-at-controller";
import { fetchUsersByPeriod } from "./fetch-users-by-period";
import { fetchUsersByCreatedAtAsc } from "./fetch-users-by-created-at-asc-controller";
import { fetchUsersByCreatedAtDesc } from "./fetch-users-by-created-at-desc-controller";

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', fetchUsers)
  app.get('/users/:date', fetchUsersByCreatedAt)
  app.get('/users/period', fetchUsersByPeriod)
  app.get('/users/asc', fetchUsersByCreatedAtAsc)
  app.get('/users/desc', fetchUsersByCreatedAtDesc)

  app.post('/users', createUser)
  app.patch('/users/:userId/update', updateUser)

  app.delete('/users/:userId/delete', deleteUser)
}