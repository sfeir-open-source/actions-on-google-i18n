const fs = require("fs");
const appRootDir = require("app-root-dir");

class I18n {
  _fileExists(file) {
    return (
      fs.existsSync(file) ||
      fs.existsSync(`${file}.js`) ||
      fs.existsSync(`${file}.json`)
    );
  }

  constructor() {
    this.projectDirectory = appRootDir.get();    
  }

  configure(options = {}) {
    // if (!options.directory && !options.defaultFile) {
    //   throw new Error('Either "directory" or "defaultFile" are required.');
    // }

    if (options.directory && !this._fileExists(options.directory)) {
      throw new Error(
        `[actions-on-google-i18n] directory "${options.directory}" does not exist.`
      );
    }

    if (options.defaultFile && !this._fileExists(options.defaultFile)) {
      throw new Error(
        `[actions-on-google-i18n] file "${options.defaultFile}" does not exist.`
      );
    }

    this._options = options;
    this.directory =
      options.directory || `${this.projectDirectory}/src/locales`;
    this.defaultFile =
      options.defaultFile || `${this.projectDirectory}/src/locales/index.json`;
    this.defaultLocale = options.defaultLocale || "en-US";
    this.defaultExtension = options.defaultExtension;

    return this;
  }
  use(app) {

    if (!this._options) {
      this.configure();
    }

    let locale = app.getUserLocale();

    if (!locale) {
      locale = this.defaultLocale;
    }

    if (!locale) {
      throw new Error(
        `[actions-on-google-i18n] Locale is not valid. Found "${locale}".`
      );
    }

    locale = locale.toLowerCase();

    const __i18n = (key, context = {}) => {
      let translation = "";
      let file = `${this.directory}/${locale}`;

      if (this.defaultExtension) {
        if (["js", "json"].includes(this.defaultExtension)) {
          file = `${file}.${this.defaultExtension}`;
        }
        else {
          throw new Error(
            `[actions-on-google-i18n] extension "${this.defaultExtension}" is not allowed. Only "js" and "json" files are allowed.`
          );
        }
      }

      if (this._options.defaultFile && this._fileExists(this.defaultFile)) {
        file = this.defaultFile;
      }

      if (!this._fileExists(file)) {
        throw new Error(
          `[actions-on-google-i18n] file "${file}" does not exist.`
        );
      }

      const locales = require(file);
      translation = locales[key] || "";

      if (translation) {
        for (let ctxKey in context) {
          translation = translation.replace(
            "{" + ctxKey + "}",
            context[ctxKey]
          );
        }
      }

      return translation;
    };

    app.__ = app.i18n = __i18n;
  }
}

module.exports = new I18n();
