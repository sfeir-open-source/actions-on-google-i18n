const i18n = require("../index");
const mockApp = {
  getUserLocale() {
    return "en-US";
  }
};
const directory = `${__dirname}/src/locales`;

describe("defaultExtention", () => {
  it("trigger a specific exception for an invalid defaultExtention", () => {
    const defaultExtension = `xxx`;
    const file = `${directory}/en-us.xxx`; // lowercase locale!!
    const expectedError = `[actions-on-google-i18n] extension "xxx" is not allowed. Only "js" and "json" files are allowed.`;
    i18n.configure({ directory, defaultExtension }).use(mockApp);

    expect(() => mockApp.__("key")).toThrowError(expectedError);
  });

  it("load locales from a valid '.js' defaultExtention", () => {
    const defaultExtension = `js`;
    i18n.configure({ directory, defaultExtension }).use(mockApp);
    const value = mockApp.__("key");
    expect(value).toEqual("value");
  });

  it("load locales from a valid '.json' defaultExtention", () => {
    const defaultExtension = `json`;
    i18n.configure({ directory, defaultExtension }).use(mockApp);
    const value = mockApp.__("key");
    expect(value).toEqual("value");
  });

});
