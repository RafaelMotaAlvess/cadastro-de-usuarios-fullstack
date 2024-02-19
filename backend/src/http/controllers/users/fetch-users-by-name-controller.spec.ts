import request from "supertest";
import { app } from "../../../config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Fetch Users by Name (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch by name", async () => {
    await request(app.server).post("/users").send({
      name: "Rafael Mota",
      email: "rafael@example.com",
      phone: "47992322389",
    });

    await request(app.server).post("/users").send({
      name: "Rafaela Alves",
      email: "rafaela@example.com",
      phone: "47992322382",
    });

    const response = await request(app.server).get("/users/name/rafa")

    expect(response.statusCode).toEqual(200);
    expect(response.body.users).toHaveLength(2);

  });
});