import request from "supertest";
import { app } from "../../../config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Delete User (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a user", async () => {
    const user = await request(app.server).post("/users").send({
      name: "Rafael Mota",
      email: "rafael@example.com",
      phone: "47992322389",
    });

    const response = await request(app.server).delete(`/users/${user.body.userId}/delete`)

    expect(response.statusCode).toEqual(204);
  });
});