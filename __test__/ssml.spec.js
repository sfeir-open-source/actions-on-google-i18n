const i18n = require("../index");
const AppMock = require('./appMock');
const directory = `${__dirname}/src/locales`;

const mockApp = new AppMock();

describe("SSML", () => {
  let conv;

  beforeEach( () => {
    i18n.configure({ directory }).use(mockApp);
    conv = mockApp.newConv("ssml");
  });

  describe("support complex entries", () => {

    it("SSML/TEXT entries", () => {
      expect(typeof conv.__("key")).toBe("object");
    });

    it("simple TEXT entry", () => {
      expect(typeof conv.__("key").text).toBe("string");
    });

    it("simple SSML entry", () => {
      expect(typeof conv.__("key").ssml).toBeTruthy();
    });

    it("valid SSML markup", () => {
      expect(conv.__("key").ssml.startsWith("<speak>")).toBeTruthy();
      expect(conv.__("key").ssml.endsWith("</speak>")).toBeTruthy();
    });

    it("invalid entry key", () => {
      expect(() => conv.__("invalid_key")).toThrow("Error: only 'text' and 'ssml' values are allowed.");
    });
  });

  describe("support context substitution", () => {

    it("for TEXT entry", () => {
      expect(conv.__("key_2", {var: 2}).text).toBe("value 2");
    });

    it("for SSML entry", () => {
      expect(conv.__("key_2", {var: "four"}).ssml).toBe("<speak><s>This is sentence two and four.</s></speak>");
    });

  });

});
