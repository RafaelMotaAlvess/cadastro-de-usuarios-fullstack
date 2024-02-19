import request from "supertest";
import { app } from "../../../config";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("Fetch Users by created at Asc (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch in order asc", async () => {
    vi.useFakeTimers();

    const currentTime = new Date().getTime()

    for (let i = 1; i < 3; i++) {
      const timeOffset = i * (24 * 60 * 60 * 1000) // ! day
      vi.setSystemTime(currentTime + timeOffset)
      await request(app.server).post("/users").send({
        name: "Rafael Mota Alves",
        email: `rafaelmotalaves${i}@gmail.com`,
        phone: `10101010100${i}`
      });
    }

    vi.useRealTimers()

    const response = await request(app.server).get("/users/asc")

    expect(response.statusCode).toEqual(200);
    expect(response.body.users).toHaveLength(2);
    expect(response.body.users[0]).toEqual(expect.objectContaining({ email: "rafaelmotalaves1@gmail.com" }))
    expect(response.body.users[1]).toEqual(expect.objectContaining({ email: "rafaelmotalaves2@gmail.com" }))

  });
});