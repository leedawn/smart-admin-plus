class I18nStore {
  data = {
    zh: {},
    en: {},
  };
  locale = "";
  setLocale(locale) {
    this.locale = locale;
  }
  getLocale() {
    return this.locale;
  }
  setData(locale, module, data) {
    this.data[locale][module] = data;
  }
  getData(locale, module) {
    return this.data[locale][module];
  }
}

class I18n {
  options = {};
  constructor(options) {
    this.options = {
      locale: "zh",
      module: "app",
      ...options,
    };
  }

  translate(content) {}
}
