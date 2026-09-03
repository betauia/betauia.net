import {
  defaultLang,
  languages,
  type Locale,
  resolveTranslation,
  type TranslationPath,
  ui,
} from "./ui";
import type { GetStaticPathsItem } from "astro";

const PREFERRED_LANG_KEY = "prefLang";

/**
 * Extract current language from the path, if the path variable does not match any configured language,
 * the default language will be returned.
 */
export function extractCurrentLanguage(): Locale {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const langSegment = pathSegments[0];
  return langSegment in languages ? (pathSegments[0] as Locale) : defaultLang;
}

/**
 * Retrieve the language that was set during the last site visit. Returns default language if no preference exists
 */
export function getPreferredLanguage(): Locale {
  return (localStorage.getItem(PREFERRED_LANG_KEY) as Locale) || defaultLang;
}

/**
 * Returns a function to access the translations in a specified language
 *
 * @param locale - the language to access the translations for
 */
export function useTranslations(locale?: string) {
  const lang = locale && translationExist(locale) ? (locale as Locale) : defaultLang;

  function t<Key extends TranslationPath<(typeof ui)[typeof defaultLang]>>(key: Key): string;
  function t<Key extends TranslationPath<(typeof ui)[typeof defaultLang]>>(
    key: Key,
    additions: Record<string, unknown>
  ): string | unknown[];

  /**
   * Retrieve a translation for the specified language and key.
   * It's possible to optionally define text replacements (like specially styled words) by providing the {@link replacements}
   * object. The key of the object will search a variable in the text marked like {{varName}}-
   *
   * @example
   * const t = useTranslations(locale);
   * const text = t("key.with.variable", { bold: <b>boldText</br> })
   * // Where value of key.with.variable is "This is a {{bold}} text"
   */
  function t<Key extends TranslationPath<(typeof ui)[typeof defaultLang]>>(
    key: Key,
    replacements?: Record<string, unknown>
  ): string | unknown[] {
    const translation = resolveTranslation(ui[lang], key);

    if (translation) {
      return replacements ? substitutePlaceholders(translation, replacements) : translation;
    }

    throw new Error(`Translation '${key}' does not exist`);
  }

  return t;
}

function substitutePlaceholders(text: string, replacements: Record<string, unknown>) {
  return text.split(/({{\w+}})/g).map(part => {
    if (!part.startsWith("{{") || !part.endsWith("}}")) {
      return part;
    }

    const key = part.slice(2, -2);
    return replacements[key] ?? part;
  });
}

/**
 * Change the pereferred language
 *
 * @param language
 */
export function changePreferredLanguage(language: Locale) {
  localStorage.setItem(PREFERRED_LANG_KEY, language);
}

/**
 * Checks if there is an existing translation for this language.
 *
 * @param lang
 */
export function translationExist(lang: string) {
  return lang in languages;
}

/**
 * Redirect to the same page in another language.
 *
 * @param lang
 */
export function redirectToLanguage(lang: Locale) {
  const targetDestination = ensureLanguageInPath(lang, window.location.pathname);
  const nextUrl = `${targetDestination}${window.location.search}${window.location.hash}`;

  if (`/${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) {
    window.location.replace(nextUrl);
  }
}

/**
 * Ensure the given path contains the langauge
 *
 * @param lang
 * @param path
 */
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
