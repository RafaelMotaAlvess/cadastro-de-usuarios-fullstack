import request from "supertest";
import { app } from "../../../config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create User (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a user", async () => {
    const response = await request(app.server).post("/users").send({
      name: "Rafael Mota",
      email: "rafael@example.com",
      phone: "47992322389",
    });

    expect(response.statusCode).toEqual(201);
  });
});