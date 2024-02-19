import request from "supertest";
import { app } from "../../../config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Fetch Users (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch users", async () => {
    await request(app.server).post("/users").send({
      name: "Rafael Mota",
      email: "rafael@example.com",
      phone: "47992322389",
    });

    await request(app.server).post("/users").send({
      name: "Carlos Alves",
      email: "carlos@example.com",
      phone: "47992322382",
    });

    const response = await request(app.server).get("/users")

    expect(response.statusCode).toEqual(200);
    expect(response.body.users).toHaveLength(2);

  });
});