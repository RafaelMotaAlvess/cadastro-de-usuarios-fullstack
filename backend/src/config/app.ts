import { userRoutes } from "../http/controllers/users/routes";
import fastify from "fastify";

export const app = fastify()

app.register(userRoutes)