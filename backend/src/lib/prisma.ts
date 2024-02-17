import { PrismaClient } from "@prisma/client";
import { env } from "../config";


export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});