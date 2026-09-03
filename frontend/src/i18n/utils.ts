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

/**
 * Change the currently perefered language
 * @param language
 */
export function changePreferredLanguage(language: Locale) {
  localStorage.setItem(PREFERRED_LANG_KEY, language);
}

/**
 * Checks if there is an existing translation for this language.
 *
 * @param language
 */
export function translationExist(language: string) {
  return language in languages;
}

export function redirectToLanguage(lang: Locale) {
  const targetDestination = ensureLanguageInPath(lang, window.location.pathname);
  const nextUrl = `${targetDestination}${window.location.search}${window.location.hash}`;

  if (`/${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) {
    window.location.replace(nextUrl);
  }
}

export function ensureLanguageInPath(lang: string | undefined, path: string) {
  if (!lang || !isLocalPath(path)) {
    return path;
  }

  const pathSegments = path.split("/").filter(Boolean);
  if (translationExist(pathSegments[0])) {
    pathSegments[0] = lang;
    return `/${pathSegments.join("/")}`;
  } else {
    return `/${[lang, ...pathSegments].join("/")}`;
  }
}

function isLocalPath(path: string) {
  const isExternalLink = !path.startsWith("/");

  const url = new URL(path, "https://placeholder.invalid");
  const isFile = /\/[^/]+\.[^/]+$/.test(url.pathname);

  return !isExternalLink && !isFile;
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
