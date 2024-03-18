import axios from "axios";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../services/public-holidays.service";

const MOCK_HOLIDAY = [
  {
    date: "2024-03-29",
    localName: "Goede Vrijdag",
    name: "Good Friday",
    countryCode: "NL",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"],
  },
];

describe("public-holidays.service", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("getListOfPublicHolidays", () => {
    it("should return a proper data", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data: MOCK_HOLIDAY }));
      const mockRes = await getListOfPublicHolidays(
        new Date().getFullYear(),
        "NL"
      );

      expect(mockRes).toEqual([
        {
          name: "Good Friday",
          localName: "Goede Vrijdag",
          date: "2024-03-29",
        },
      ]);
    });

    it("should return an empty array", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.reject({ data: [] }));

      const mockRes = await getListOfPublicHolidays(
        new Date().getFullYear(),
        "NL"
      );

      expect(mockRes).toEqual([]);
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    it("should return true if today is a holiday", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ status: 200 }));
      const mockRes = await checkIfTodayIsPublicHoliday("NL");

      expect(mockRes).toBeTruthy();
    });

    it("should return false if today is NOT a holiday", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ status: 400 }));
      const mockRes = await checkIfTodayIsPublicHoliday("NL");

      expect(mockRes).toBeFalsy();
    });
  });

  describe("getNextPublicHolidays", () => {
    it("should return a proper data", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ data: MOCK_HOLIDAY }));

      const mockRes = await getNextPublicHolidays("NL");

      expect(mockRes).toEqual([
        {
          name: "Good Friday",
          localName: "Goede Vrijdag",
          date: "2024-03-29",
        },
      ]);
    });

    it("should return an empty array", async () => {
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.reject({ data: [] }));
      const mockRes = await getNextPublicHolidays("NL");

      expect(mockRes).toEqual([]);
    });
  });
});
