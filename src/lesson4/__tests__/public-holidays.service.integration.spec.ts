import axios from "axios";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../services/public-holidays.service";

describe("public-holidays", () => {
  describe("getListOfPublicHolidays", () => {
    it("should return data", async () => {
      const res = await getListOfPublicHolidays(new Date().getFullYear(), "NL");

      expect(res).toEqual(
        expect.arrayContaining([
          {
            date: expect.any(String),
            localName: expect.any(String),
            name: expect.any(String),
          },
        ])
      );
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    it("should return true if today is a holiday", async () => {
      const res = await checkIfTodayIsPublicHoliday("NL");

      expect(res).toBeDefined();
    });
  });

  describe("getNextPublicHolidays", () => {
    it("should return a proper data", async () => {
      const mockRes = await getNextPublicHolidays("NL");

      expect(mockRes).toEqual(
        expect.arrayContaining([
          {
            date: expect.any(String),
            localName: expect.any(String),
            name: expect.any(String),
          },
        ])
      );
    });
  });
});
