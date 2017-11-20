const i18n = require("../index");
const mockApp = {
  getUserLocale() {
    return "en-US";
  }
};

describe("directory", () => {

  it("trigger an exception for a missing argument folder", () => {
    expect(() => i18n.configure()).toThrowError(`Either "directory" or "defaultFile" are required`);
  });

  it("trigger an exception for a non-existant folder", () => {
    const directory = `${__dirname}/not-exist`;
    expect(() => i18n.configure({ directory })).toThrow();
  });

  it("trigger a specific exception for a non-existant folder", () => {
    const directory = `${__dirname}/not-exist`;
    const expectedError = `[actions-on-google-i18n] directory "${directory}" does not exist.`;
    expect(() => i18n.configure({ directory })).toThrowError(expectedError);
  });
  
  it("load locales from a valid folder", () => {
    const directory = `${__dirname}/locales`;
    i18n.configure({ directory }).use(mockApp);
    const value = mockApp.__("key");
    expect(value).toContain("value");
  });

});
