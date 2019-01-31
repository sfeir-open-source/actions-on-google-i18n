const i18n = require("../index");
const AppMock = require('./appMock');
const directory = `${__dirname}/src/locales`;

const mockApp = new AppMock();

fdescribe("SSML", () => {
  describe("when getUserLocale is NULL", () => {

    it("support SSML/TEXT entries", () => {
      i18n.configure({ directory, defaultExtension: "json" }).use(mockApp);
      const conv = mockApp.newConv("ssml");
      expect(typeof conv.__("key")).toBe("object");
      expect(typeof conv.__("key").ssml).toBeTruthy();
      expect(typeof conv.__("key").text).toBeTruthy();
    });
  });

});
