const i18n = require("../index");
const mockApp = {
  getUserLocale() {
    return "en-US";
  }
};

describe("defaultFile", () => {

  it("trigger an exception for a missing argument defaultFile", () => {
    expect(() => i18n.configure()).toThrowError(`Either "directory" or "defaultFile" are required`);
  });

  it("trigger an exception for a non-existant file", () => {
    const defaultFile = `${__dirname}/not-exist/en-XX.js`;
    expect(() => i18n.configure({ defaultFile })).toThrow();
  });

  it("trigger a specific exception for a non-existant file", () => {
    const defaultFile = `${__dirname}/not-exist/en-XX.js`;
    const expectedError = `[actions-on-google-i18n] file "${defaultFile}" does not exist.`;
    expect(() => i18n.configure({ defaultFile })).toThrowError(expectedError);
  });
  
  it("load locales from a valid folder", () => {
    const defaultFile = `${__dirname}/locales/en-US.js`;
    i18n.configure({ defaultFile }).use(mockApp);
    const value = mockApp.__("key");
    expect(value).toContain("value");
  });

});
