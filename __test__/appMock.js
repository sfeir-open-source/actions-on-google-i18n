class AppMock {

  constructor() {
    this.middlewares = [];
  }

  middleware(mdw) {
    this.middlewares.push(mdw);
  }

  newConv(userLocale) {
    const conv = { user: { locale: userLocale } };
    this.middlewares.forEach(m => m(conv));
    return conv;
  }
}

module.exports = AppMock;
