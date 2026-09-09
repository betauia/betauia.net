import betaBase from "@assets/logos/beta/base.svg";
import betaBlack from "@assets/logos/beta/black.png";
import betaBlue from "@assets/logos/beta/blue.png";
import betaWhite from "@assets/logos/beta/white.png";
import betaIcon from "@assets/logos/beta/icon.jpg";

import betadevBase from "@assets/logos/betadev/base.svg";
import betadevBlack from "@assets/logos/betadev/black.png";
import betadevBlue from "@assets/logos/betadev/blue.png";
import betadevWhite from "@assets/logos/betadev/white.png";

import betasecBase from "@assets/logos/betasec/base.svg";
import betasecBlack from "@assets/logos/betasec/black.png";
import betasecBlue from "@assets/logos/betasec/blue.png";
import betasecWhite from "@assets/logos/betasec/white.png";

import betalanBase from "@assets/logos/betalan/base.svg";
import betalanBlack from "@assets/logos/betalan/black.png";
import betalanBlue from "@assets/logos/betalan/blue.png";
import betalanWhite from "@assets/logos/betalan/white.png";

import bedkomBase from "@assets/logos/bedkom/base.svg";
import bedkomBlack from "@assets/logos/bedkom/black.png";
import bedkomBlue from "@assets/logos/bedkom/blue.png";
import bedkomWhite from "@assets/logos/bedkom/white.png";

import eventkomBase from "@assets/logos/eventkom/base.svg";
import eventkomBlack from "@assets/logos/eventkom/black.png";
import eventkomBlue from "@assets/logos/eventkom/blue.png";
import eventkomWhite from "@assets/logos/eventkom/white.png";
import { useTranslations } from "@i18n/utils.ts";

export const logos = {
  beta: {
    name: "beta",
    base: betaBase,
    black: betaBlack,
    blue: betaBlue,
    white: betaWhite,
    icon: betaIcon,
  },
  betadev: {
    name: "betadev",
    base: betadevBase,
    black: betadevBlack,
    blue: betadevBlue,
    white: betadevWhite,
  },
  betasec: {
    name: "betasec",
    base: betasecBase,
    black: betasecBlack,
    blue: betasecBlue,
    white: betasecWhite,
  },
  betalan: {
    name: "betalan",
    base: betalanBase,
    black: betalanBlack,
    blue: betalanBlue,
    white: betalanWhite,
  },
  bedkom: {
    name: "bedkom",
    base: bedkomBase,
    black: bedkomBlack,
    blue: bedkomBlue,
    white: bedkomWhite,
  },
  eventkom: {
    name: "eventkom",
    base: eventkomBase,
    black: eventkomBlack,
    blue: eventkomBlue,
    white: eventkomWhite,
  },
} as const;

export function brandingColors(lang?: string) {
  const t = useTranslations(lang);

  return [
    {
      name: "Background",
      description: t("page.om.branding.colors.background"),
      light: "#F2F2F6",
      dark: "#0F151F",
    },
    {
      name: "Raised",
      description: t("page.om.branding.colors.raised"),
      light: "#EAEAEF",
      dark: "#151E2D",
    },
    {
      name: "Foreground",
      description: t("page.om.branding.colors.foreground"),
      light: "#242424",
      dark: "#FDFDFD",
    },
    {
      name: "Muted",
      description: t("page.om.branding.colors.muted"),
      light: "#425269",
      dark: "#B9C5DD",
    },
    {
      name: "Aksent (primær)",
      description: t("page.om.branding.colors.primary"),
      light: "#0085FF",
      dark: "#0085FF",
    },
    {
      name: "Aksent (sekundær)",
      description: t("page.om.branding.colors.secondary"),
      light: "#14B8A6",
      dark: "#14B8A6",
    },
  ];
}
