import request from "supertest";
import { PUBLIC_HOLIDAYS_API_URL } from "../config";

describe("nager-date", () => {
  it("should handle the /api/v3/PublicHolidays EP", async () => {
    const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      "/PublicHolidays/2024/NL"
    );

    expect(status).toEqual(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: expect.any(String),
          fixed: expect.any(Boolean),
          global: expect.any(Boolean),
        }),
      ])
    );
  });

  it("should handle the /api/v3/PublicHolidays EP", async () => {
    const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
      "/NextPublicHolidaysWorldwide"
    );

    expect(status).toEqual(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: expect.any(String),
          fixed: expect.any(Boolean),
          global: expect.any(Boolean),
        }),
      ])
    );
  });
});
