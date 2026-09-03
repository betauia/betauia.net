import en from "./en.json";
import no from "./no.json";

const translations = { en, no } as const;

export type Locale = keyof typeof translations;

export const languages: { [key in Locale]: string } = {
  en: translations["en"].language,
  no: translations["no"].language,
};

export const defaultLang = "no";

export const ui = { en, no } as const;

type TranslationTree = {
  [key: string]: string | TranslationTree;
};

export type TranslationPath<T extends TranslationTree> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends TranslationTree
      ? `${K}.${TranslationPath<T[K]>}`
      : never;
}[keyof T & string];

/**
 * Search the translation value for the given key. Key might contain "." delimiters to go through
 * nested structures. Returns undefined if value was not able to be found.
 *
 * @param translations - Structure to find translation from
 * @param key - Value to find
 */
export function resolveTranslation<T extends TranslationTree, P extends TranslationPath<T>>(
  translations: T,
  key: P
): string | undefined {
  const result = key.split(".").reduce<TranslationTree | string | undefined>((current, segment) => {
    if (current && typeof current === "object" && !Array.isArray(current)) {
      return current[segment];
    }

    return undefined;
  }, translations);

  return typeof result === "string" ? result : undefined;
}