const i18n = require("../index");
i18n.projectDirectory = "./__test__";
const mockApp = {
  getUserLocale() {
    return "en-US";
  }
};

describe("directory", () => {

  it("use default 'src/locales' directory if missing argument 'directory'", () => {
    i18n.configure().use(mockApp);
    const value = mockApp.__("key");
    expect(value).toEqual("value");
  });
  
  it("load locales from a valid folder", () => {
    const directory = `${__dirname}/src/locales`;
    i18n.configure({ directory }).use(mockApp);
    const value = mockApp.__("key");
    expect(value).toEqual("value");
  });

});
