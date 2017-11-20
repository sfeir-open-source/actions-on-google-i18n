const fs = require("fs");

class I18n {
  _fileExists(file) {
    return fs.existsSync(file)
      || fs.existsSync(`${file}.js`)
      || fs.existsSync(`${file}.json`);
  }

  configure(options = {}) {
    if (!options.directory && !options.defaultFile) {
      throw new Error('Either "directory" or "defaultFile" are required.');
    }

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

    this.directory = options.directory;
    this.defaultFile = options.defaultFile;
    this.defaultLocale = options.defaultLocale || "en-us";
    this.defaultExtension = options.defaultExtension;

    return this;
  }
  use(app) {
    let locale = app.getUserLocale();

    if (!locale) {
      locale = this.defaultLocale;
    }

    if (!locale) {
      throw new Error(`[actions-on-google-i18n] Locale is not valid. Found "${locale}".`)
    }

    locale = locale.toLowerCase();

    const __i18n = (key, context = {}) => {
      let translation = "";
      let file = `${this.directory}/${locale}`;

      if (this.defaultExtension) {
        file = `${file}.${this.defaultExtension}`;
      }

      if (this.defaultFile) {
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
