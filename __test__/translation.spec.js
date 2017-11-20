const i18n = require("../index");
const directory = `${__dirname}/src/locales`;
const directoryEmpty = `${__dirname}/src/locales-empty`;

describe("translation", () => {
  describe("when getUserLocale is NULL", () => {
    const mockApp = {
      getUserLocale() {
        return null;
      }
    };

    it("use builtin default local 'en-US' when provided", () => {
      i18n.configure({ directory }).use(mockApp);
      expect(mockApp.__("key")).toBe("value");
    });

    it("trigger exception when builtin default local 'en-US' is not present", () => {
      const file = `${directoryEmpty}/en-us`;
      i18n.configure({ directory: directoryEmpty }).use(mockApp);
      expect(() => mockApp.__("key")).toThrowError(
        `[actions-on-google-i18n] file "${file}" does not exist.`
      );
    });
  });

  describe("when getUserLocale is fr-FR", () => {
    const mockApp = {
      getUserLocale() {
        return "en-US";
      }
    };

    it("use builtin default local 'en-US' when provided", () => {
      i18n.configure({ directory }).use(mockApp);
      expect(mockApp.__("key")).toBe("value");
    });
  });

  describe("when getUserLocale is fr-FR", () => {
    const mockApp = {
      getUserLocale() {
        return "fr-FR";
      }
    };

    it("use builtin default local 'fr-FR' when provided", () => {
      i18n.configure({ directory, defaultExtension: "json" }).use(mockApp);
      expect(mockApp.__("key")).toBe("valeur");
    });
  });

});
