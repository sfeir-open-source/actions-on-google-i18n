const i18n = require("../index");
i18n.projectDirectory = "./__test__";

describe("defaultFile", () => {
  it("don't use default 'src/locales/index.json' file if missing argument folder AND locale is en-US", () => {
    const mockApp = {
      getUserLocale() {
        return "en-US";
      }
    };
    i18n.configure().use(mockApp);
    const value = mockApp.__("key");
    expect(value).toEqual("value");
  });

  it("don't use default 'src/locales/index.json' file if missing argument folder AND locale is NULL", () => {
    const mockApp = {
      getUserLocale() {
        return null;
      }
    };
    i18n.configure().use(mockApp);
    const value = mockApp.__("key");
    expect(value).toEqual("value");
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
    const mockApp = {
      getUserLocale() {
        return "en-US";
      }
    };
    const defaultFile = `${__dirname}/src/locales/en-US.js`;
    i18n.configure({ defaultFile }).use(mockApp);
    const value = mockApp.__("key");
    expect(value).toEqual("value");
  });
});
