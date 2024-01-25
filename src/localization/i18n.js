"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeLanguage = void 0;
var Localization = require("expo-localization");
var i18n_js_1 = require("i18n-js");
var en_json_1 = require("./en.json");
var pt_json_1 = require("./pt.json");
var i18n = new i18n_js_1.I18n();
// Normalizating locale returns.
var normalizeTranslate = {
    'pt': 'pt-BR',
    'pt-BR': 'pt-BR',
    'en': 'en-US',
    'en-US': 'en-US',
    'en-IN': 'pt'
};
// Configuring translations.
i18n.enableFallback = true;
i18n.translations = { en: en_json_1.default, pt: pt_json_1.default };
i18n.defaultLocale = 'pt';
i18n.locale = (normalizeTranslate[Localization.locale]) ? normalizeTranslate[Localization.locale] : 'en';
// Exports translations lib.
exports.default = i18n;
function changeLanguage(lang) {
    i18n.locale = lang;
}
exports.changeLanguage = changeLanguage;
