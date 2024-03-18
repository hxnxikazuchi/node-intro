import { validateInput, shortenPublicHoliday } from "../helpers";

const MOCK_HOLIDAY = {
  date: "2024-03-29",
  localName: "Goede Vrijdag",
  name: "Good Friday",
  countryCode: "NL",
  fixed: false,
  global: true,
  counties: null,
  launchYear: null,
  types: ["Public"],
};

describe("helpers", () => {
  describe("validateInput", () => {
    it("validate should NOT trhow an error", () => {
      expect(
        validateInput({ country: "NL", year: new Date().getFullYear() })
      ).toBeTruthy();
    });

    it("validate should throw an YEAR error", () => {
      expect(() => validateInput({ country: "NL", year: 1999 })).toThrow(
        "Year provided not the current, received: 1999"
      );
    });

    it("validate should throw an CONTRY error", () => {
      expect(() =>
        validateInput({ country: "KZ", year: new Date().getFullYear() })
      ).toThrow("Country provided is not supported, received: KZ");
    });
  });

  describe("shortenPublicHoliday", () => {
    it("should return filtered object", () => {
      const mappedObj = shortenPublicHoliday(MOCK_HOLIDAY);

      expect(mappedObj).toEqual({
        name: "Good Friday",
        localName: "Goede Vrijdag",
        date: "2024-03-29",
      });
    });
  });
});
