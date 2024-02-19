import fastify from "fastify";
import cors from '@fastify/cors'

import { userRoutes } from "../http/controllers/users/routes";

export const app = fastify()

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
})

app.register(userRoutes)