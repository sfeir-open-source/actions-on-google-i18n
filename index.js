class I18n {
    configure(options = {}) {

        if (!options.directory) {
            throw new Error(' "directory" is not valid. Please provide a directory of your locales.');
        }

        this.directory = options.directory;

        return this;
    }
    use(app) {
        const locale = app.getUserLocale();

        app.__ = (key, context = {}) => {
            const locales = require(`${this.directory}/${locale}`);
            let translation = locales[key];

            if (translation) {
                for (let ctxKey in context) {
                    translation = translation.replace('{' + ctxKey + '}', context[ctxKey]);
                }
            }

            return translation;
        }
    }
}

module.exports = new I18n();