import en from "./en.json";
import no from "./no.json";

const translations = { en, no } as const;

export type Locale = keyof typeof translations;

type Translation = typeof en;

export const languages: { [key in Locale]: string } = {
  en: translations["en"].language,
  no: translations["no"].language,
};

export const defaultLang = "no";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.hello": "Hello",
    "nav.twitter": "Twitter",
  },
  no: {
    "nav.home": "Start",
    "nav.hello": "Hallo",
  },
} as const;
