import { defaultLang, languages, type Locale, ui } from "./ui";
import type { GetStaticPathsItem } from "astro";

/**
 * Extract current language from the path, if the path variable does not match any configured language,
 * the default language will be returned.
 */
export function extractCurrentLanguage(): Locale {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const langSegment = pathSegments[0];
  return langSegment in languages ? (pathSegments[0] as Locale) : defaultLang;
}

export function getPreferredLanguage(): Locale {
  return (localStorage.getItem(PREFERRED_LANG_KEY) as Locale) || defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return key in ui[lang] ? (ui[lang] as any)[key] : ui[defaultLang][key];
  };
}

// import en from "./en.json";
// import no from "./no.json";
//
const PREFERRED_LANG_KEY = "prefLang";
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
export function initTranslation() {
  const currentSetting = localStorage.getItem(PREFERRED_LANG_KEY) as Locale | null;

  if (!currentSetting || !translationExist(currentSetting)) {
    const browserLanguage = currentSetting || defaultLang;
    localStorage.setItem(PREFERRED_LANG_KEY, browserLanguage);
  }
}
//
/**
 * Change the currently perefered language
 * @param language
 */
export function changePreferredLanguage(language: Locale) {
  localStorage.setItem(PREFERRED_LANG_KEY, language);
  window.location.reload();
}
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
function translationExist(language: string) {
  return language in languages;
}

export function redirectToLanguage(lang: Locale) {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);

  let targetDestination = "";
  if (translationExist(pathSegments[0])) {
    pathSegments[0] = lang;
    targetDestination = pathSegments.join("/");
  } else {
    targetDestination = [lang, ...pathSegments].join("/");
  }

  const nextUrl = `/${targetDestination}${window.location.search}${window.location.hash}`;

  if (`/${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) {
    window.location.replace(nextUrl);
  }
}

export function ensureLanguageInPath() {
  const pathSegment = window.location.pathname.split("/").filter(Boolean);

  if (!translationExist(pathSegment[0])) {
    const prefLang = getPreferredLanguage();
    redirectToLanguage(prefLang);
  }
}

type LocalizedPath<T extends GetStaticPathsItem> = T & { params: T["params"] & { locale: Locale } };


/**
 * Generates static paths for all configured locales, optionally combined with existing path configurations.
 *
 * @param pathItems - Optional array of existing static path configurations to combine with locales
 * @returns a function that applies each locale to the provided path items for multi-language static site generation.
 *
 * @example
 * // Without parameter: only locale paths
 * export const getStaticPaths = getStaticLanguagePaths();
 * // [{ params: { locale: "en" } }, { params: { locale: "no" } }]
 *
 * @example
 * // With parameter: locale paths combined with existing params
 * export const getStaticPaths = getStaticLanguagePaths([
 *   { params: { slug: "about" } },
 *   { params: { slug: "contact" } },
 * ]);
 * // [
 * //   { params: { slug: "about", locale: "en" } },
 * //   { params: { slug: "contact", locale: "en" } },
 * //   { params: { slug: "about", locale: "no" } },
 * //   { params: { slug: "contact", locale: "no" } },
 * // ]
 */

export function getStaticLanguagePaths<T extends GetStaticPathsItem>(
  pathItems: T[]
): () => LocalizedPath<T>[];

/**
 * Implementation without extension.
 * @inheritDoc
 */
export function getStaticLanguagePaths(): () => { params: { locale: Locale } }[];
/**
 * Implementation with extension.
 * @inheritDoc
 */
export function getStaticLanguagePaths<T extends GetStaticPathsItem>(pathItems: T[] = []) {
  const locales = Object.keys(languages) as Locale[];
  return function applyLocaleToPathItems() {
    if (pathItems.length === 0) {
      return locales.map(locale => ({ params: { locale } }));
    }
    return locales.flatMap(locale =>
      pathItems.map(path => ({ ...path, params: { ...path.params, locale } }))
    );
  };
}
