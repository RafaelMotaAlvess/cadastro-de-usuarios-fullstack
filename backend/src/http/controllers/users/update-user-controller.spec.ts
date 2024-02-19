import request from "supertest";
import { app } from "../../../config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Update User (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a user", async () => {
    const user = await request(app.server).post("/users").send({
      name: "Rafael Mota",
      email: "rafael@example.com",
      phone: "47992322389",
    });

    const response = await request(app.server).patch(`/users/${user.body.userId}/update`).send({
      name: "Rafael Mota Alves"
    })

    expect(response.statusCode).toEqual(204);
  });
});