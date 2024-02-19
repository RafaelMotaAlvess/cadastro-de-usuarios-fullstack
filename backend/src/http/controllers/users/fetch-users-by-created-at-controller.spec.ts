import request from "supertest";
import { app } from "../../../config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Fetch Users by Created At (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch by created at", async () => {
    await request(app.server).post("/users").send({
      name: "Rafael Mota",
      email: "rafael@example.com",
      phone: "47992322389",
    });

    const data = new Date().toISOString().split("T")[0];

    const response = await request(app.server).get(`/users/${data}`)

    expect(response.status).toBe(200);
    expect(response.body.users).toHaveLength(1);

  });
});