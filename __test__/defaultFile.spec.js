const i18n = require("../index");
const AppMock = require('./appMock');
i18n.projectDirectory = "./__test__";

describe("defaultFile", () => {
  it("don't use default 'src/locales/index.json' file if missing argument folder AND locale is en-US", () => {
    const mockApp = new AppMock();
    i18n.configure().use(mockApp);
    const value = mockApp.__("key");
    expect(value).toEqual("value");
  });

  it("don't use default 'src/locales/index.json' file if missing argument folder AND locale is NULL", () => {
    const mockApp = new AppMock();
    mockApp.userLocale = null;
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
    const mockApp = new AppMock();
    const defaultFile = `${__dirname}/src/locales/en-us.js`;
    i18n.configure({ defaultFile }).use(mockApp);
    expect(mockApp.__("key")).toEqual("value");
  });
});
