const i18n = require("../index");
const AppMock = require('./appMock');
const directory = `${__dirname}/src/locales`;
const directoryEmpty = `${__dirname}/src/locales-empty`;

const mockApp = new AppMock();

describe("translation", () => {
  describe("when getUserLocale is NULL", () => {

    it("use builtin default local 'en-US' when provided", () => {
      i18n.configure({ directory }).use(mockApp);
      const conv = mockApp.newConv();
      expect(conv.__("key")).toBe("value");
    });

    it("trigger exception when builtin default local 'en-US' is not present", () => {
      const file = `${directoryEmpty}/en-us`;
      i18n.configure({ directory: directoryEmpty });
      expect(() => i18n.use(mockApp)).toThrowError(
        `[actions-on-google-i18n] file "${file}" does not exist.`
      );
    });
  });

  describe("when getUserLocale is en-US", () => {

    it("use builtin default local 'en-US' when provided", () => {
      i18n.configure({ directory }).use(mockApp);
      const conv = mockApp.newConv('en-US');
      expect(conv.__("key")).toBe("value");
    });
  });

  describe("when getUserLocale is fr-FR", () => {

    it("use builtin default local 'fr-FR' when provided", () => {
      i18n.configure({ directory, defaultExtension: "json" }).use(mockApp);
      const conv = mockApp.newConv('fr-FR');
      expect(conv.__("key")).toBe("valeur");
    });
  });

});
