const fs = require('fs');
const appRootDir = require('app-root-dir');

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
    if (options.directory && !this._fileExists(options.directory)) {
      throw new Error(
        `[actions-on-google-i18n] directory "${
          options.directory
        }" does not exist.`
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
    this.defaultLocale = options.defaultLocale || 'en-US';
    this.defaultExtension = options.defaultExtension;

    return this;
  }

  use(app) {
    if (!this._options) {
      this.configure();
    }

    const __i18nFactory = conv => {
      let file = `${this.directory}/${this.getLocale(conv)}`;

      if (this.defaultExtension) {
        if (['js', 'json'].includes(this.defaultExtension)) {
          file = `${file}.${this.defaultExtension}`;
        } else {
          throw new Error(
            `[actions-on-google-i18n] extension "${
              this.defaultExtension
            }" is not allowed. Only "js" and "json" files are allowed.`
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

      return (key, context = {}) => {
        let translation = locales[key] || '';

        if (Array.isArray(translation)) {
          translation = translation[Math.floor((Math.random()*translation.length))]
        }

        if (translation) {
          for (let ctxKey in context) {
            translation = translation.replace(
              '{' + ctxKey + '}',
              context[ctxKey]
            );
          }
        }

        return translation;
      };
    };

    // Register a middleware to set i18n function on each conv
    app.middleware(conv => {
      conv.__ = conv.i18n = __i18nFactory(conv);
    });

    app.__ = app.i18n = __i18nFactory();
  }

  getLocale(conv) {
    let locale = conv && conv.user && conv.user.locale;

    if (!locale) {
      locale = this.defaultLocale;
    }

    if (!locale) {
      throw new Error(
        `[actions-on-google-i18n] Locale is not valid. Found "${locale}".`
      );
    }

    return locale.toLowerCase();
  }
}

module.exports = new I18n();
