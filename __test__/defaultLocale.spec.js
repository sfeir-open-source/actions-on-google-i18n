const i18n = require("../index");
const mockApp = {
  getUserLocale() {
    return null;
  }
};
const directory = `${__dirname}/src/locales`;

describe("defaultLocale", () => {

  it("trigger a specific exception for an invalid defaultLocale", () => {
    const defaultLocale = `en-xx`;
    const file = `${directory}/${defaultLocale}`;
    const expectedError = `[actions-on-google-i18n] file "${file}" does not exist.`;
    i18n.configure({ directory, defaultLocale }).use(mockApp);
    
    expect(() => mockApp.__("key")).toThrowError(expectedError);
  });
  
  it("load locales from a valid defaultLocale", () => {
    const defaultLocale = `en-US`;
    i18n.configure({ directory, defaultLocale }).use(mockApp);
    const value = mockApp.__("key");
    expect(value).toEqual("value");
  });

});
