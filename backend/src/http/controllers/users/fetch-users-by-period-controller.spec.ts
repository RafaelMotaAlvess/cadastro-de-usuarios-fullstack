import request from "supertest";
import { app } from "../../../config";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("Fetch Users by Period (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch users in a period", async () => {
    await request(app.server).post("/users").send({
      name: "Rafael Mota Alves",
      email: `rafaelmotalaves1@gmail.com`,
      phone: `101010101001`
    });


    const startDate = new Date().toISOString().split("T")[0];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const endDate = currentDate.toISOString().split("T")[0];

    const response = await request(app.server)
      .get("/users/period")
      .query({ startDate, endDate })

    expect(response.status).toBe(200);
    expect(response.body.users).toHaveLength(1);

  });
});