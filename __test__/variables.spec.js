const i18n = require("../index");
i18n.projectDirectory = "./__test__";
const mockApp = {
  getUserLocale() {
    return "en-US";
  }
};

describe("variables", () => {
  it("show unparsed variable", () => {
    i18n.use(mockApp);
    const value = mockApp.__("key_2");
    expect(value).toEqual("value {variable}");
  });

  it("show parsed variable", () => {
    i18n.use(mockApp);
    const value = mockApp.__("key_2", {variable: 2});
    expect(value).toEqual("value 2");
  });
});
