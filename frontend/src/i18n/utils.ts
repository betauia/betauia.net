import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return key in ui[lang] ? (ui[lang] as any)[key] : ui[defaultLang][key];
  };
}

// import en from "./en.json";
// import no from "./no.json";
//
// const TRANSLATION_KEY = "translations";
//
// export const DEFAULT_LANGUAGE = "no";
//
// const translations = { en, no } as const;
//
// export type Locale = keyof typeof translations;
//
// type Translation = typeof en;
//
// export const languages = {
//   en: translations["en"].language,
//   no: translations["no"].language,
// };
//
// /**
//  * Provide access to translation files of the specific language.
//  */
// export function useTranslations(lang?: Locale) {
//   const language = lang || DEFAULT_LANGUAGE;
//   const localizedUI: Translation = translations[language];
//
//   /**
//    * Return translated text for the key.
//    */
//   return function t(key: keyof Translation) {
//     return key in localizedUI ? localizedUI[key] : translations[DEFAULT_LANGUAGE][key];
//   };
// }
//
// /**
//  * Init the language service by checking for currently persisted language or initializing the persistence.
//  */
// export function initTranslation() {
//   const currentSetting = localStorage.getItem(TRANSLATION_KEY) as Locale | null;
//
//   if (!currentSetting || !translationExist(currentSetting)) {
//     const browserLanguage = getBrowserLocale() || DEFAULT_LANGUAGE;
//     localStorage.setItem(TRANSLATION_KEY, browserLanguage);
//   }
// }
//
// /**
//  * Change the currently selected language
//  * @param language
//  */
// export function changeLanguage(language: Locale) {
//   localStorage.setItem(TRANSLATION_KEY, language);
//   window.location.reload();
// }
//
// /**
//  * Returns the currently activated language.
//  */
// export function getCurrentLocale(): Locale {
//   const currentSetting = localStorage.getItem(TRANSLATION_KEY) as Locale | null;
//   return currentSetting || DEFAULT_LANGUAGE
// }
//
// /**
//  * Try to determine available translation for the preferred browser language. Returns null if it
//  * is not able to match any of the translations to the browser lanugage.
//  */
// function getBrowserLocale(): Locale | null {
//   const browserLanguage = navigator.language.split("-")[0].toLowerCase();
//
//   return translationExist(browserLanguage) ? (browserLanguage as Locale) : null;
// }
//
// /**
//  * Checks if there is an existing translation for this language.
//  *
//  * @param language
//  */
// function translationExist(language: string) {
//   return language in translations;
// }
//
